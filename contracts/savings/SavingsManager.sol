pragma solidity 0.5.16;

// External
import { IMix } from "../interfaces/IMix.sol";
import { ISavingsContractV1 } from "../interfaces/ISavingsContract.sol";

// Internal
import { ISavingsManager, IRevenueRecipient } from "../interfaces/ISavingsManager.sol";
import { PausableModule } from "../shared/PausableModule.sol";

// Libs
import { IERC20 }     from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 }  from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { StableMath } from "../shared/StableMath.sol";

/**
 * @title   SavingsManager
 * @author  Stability Labs Pty. Ltd.
 * @notice  Savings Manager collects interest from mIxs and sends them to the
 *          corresponding Savings Contract, performing some validation in the process.
 * @dev     VERSION: 1.3
 *          DATE:    2020-12-09
 */
contract SavingsManager is ISavingsManager, PausableModule {

    using SafeMath for uint256;
    using StableMath for uint256;
    using SafeERC20 for IERC20;


    // Core admin events
    event RevenueRecipientSet(address indexed mIx, address recipient);
    event SavingsContractAdded(address indexed mIx, address savingsContract);
    event SavingsContractUpdated(address indexed mIx, address savingsContract);
    event SavingsRateChanged(uint256 newSavingsRate);
    event StreamsFrozen();
    // Interest collection
    event LiquidatorDeposited(address indexed mIx, uint256 amount);
    event InterestCollected(address indexed mIx, uint256 interest, uint256 newTotalSupply, uint256 apy);
    event InterestDistributed(address indexed mIx, uint256 amountSent);
    event RevenueRedistributed(address indexed mIx, address recipient, uint256 amount);

    // Locations of each mIx savings contract
    mapping(address => ISavingsContractV1) public savingsContracts;
    mapping(address => IRevenueRecipient) public revenueRecipients;
    // Time at which last collection was made
    mapping(address => uint256) public lastPeriodStart;
    mapping(address => uint256) public lastCollection;
    mapping(address => uint256) public periodYield;

    // Amount of collected interest that will be sent to Savings Contract (100%)
    uint256 private savingsRate = 1e18;
    // Utils to help keep interest under check
    uint256 constant private SECONDS_IN_YEAR = 365 days;
    // Theoretical cap on APY to avoid excess inflation
    uint256 constant private MAX_APY = 15e18;
    uint256 constant private TEN_BPS = 1e15;
    // Streaming liquidated tokens
    uint256 private constant DURATION = 7 days;
    uint256 private constant ONE_DAY = 1 days;
    uint256 constant private THIRTY_MINUTES = 30 minutes;
    // Streams
    bool private streamsFrozen = false;
    // Liquidator
    mapping(address => Stream) public liqStream;
    // Platform
    mapping(address => Stream) public yieldStream;
    // Batches are for the platformInterest collection
    mapping(address => uint256) public lastBatchCollected;

    enum StreamType {
        liquidator,
        yield
    }

    struct Stream {
        uint256 end;
        uint256 rate;
    }

    constructor(
        address _nexus,
        address _mUSD,
        address _savingsContract
    )
        public
        PausableModule(_nexus)
    {
        _updateSavingsContract(_mUSD, _savingsContract);
        emit SavingsContractAdded(_mUSD, _savingsContract);
    }

    modifier onlyLiquidator() {
        require(msg.sender == _liquidator(), "Only liquidator can execute");
        _;
    }

    modifier whenStreamsNotFrozen() {
        require(!streamsFrozen, "Streaming is currently frozen");
        _;
    }

    /***************************************
                    STATE
    ****************************************/

    /**
     * @dev Adds a new savings contract
     * @param _mIx           Address of underlying mIx
     * @param _savingsContract  Address of the savings contract
     */
    function addSavingsContract(address _mIx, address _savingsContract)
        external
        onlyGovernor
    {
        require(address(savingsContracts[_mIx]) == address(0), "Savings contract already exists");
        _updateSavingsContract(_mIx, _savingsContract);
        emit SavingsContractAdded(_mIx, _savingsContract);
    }

    /**
     * @dev Updates an existing savings contract
     * @param _mIx           Address of underlying mIx
     * @param _savingsContract  Address of the savings contract
     */
    function updateSavingsContract(address _mIx, address _savingsContract)
        external
        onlyGovernor
    {
        require(address(savingsContracts[_mIx]) != address(0), "Savings contract does not exist");
        _updateSavingsContract(_mIx, _savingsContract);
        emit SavingsContractUpdated(_mIx, _savingsContract);
    }

    function _updateSavingsContract(address _mIx, address _savingsContract)
        internal
    {
        require(_mIx != address(0) && _savingsContract != address(0), "Must be valid address");
        savingsContracts[_mIx] = ISavingsContractV1(_savingsContract);

        IERC20(_mIx).safeApprove(address(_savingsContract), 0);
        IERC20(_mIx).safeApprove(address(_savingsContract), uint256(-1));
    }

    /**
     * @dev Freezes streaming of mIxs
     */
    function freezeStreams()
        external
        onlyGovernor
        whenStreamsNotFrozen
    {
        streamsFrozen = true;

        emit StreamsFrozen();
    }

    /**
     * @dev Sets the revenue recipient address
     * @param _mIx           Address of underlying mIx
     * @param _recipient        Address of the recipient
     */
    function setRevenueRecipient(address _mIx, address _recipient)
        external
        onlyGovernor
    {
        revenueRecipients[_mIx] = IRevenueRecipient(_recipient);

        emit RevenueRecipientSet(_mIx, _recipient);
    }


    /**
     * @dev Sets a new savings rate for interest distribution
     * @param _savingsRate   Rate of savings sent to SavingsContract (100% = 1e18)
     */
    function setSavingsRate(uint256 _savingsRate)
        external
        onlyGovernor
    {
        // Greater than 60% upto 100%
        require(_savingsRate >= 6e17 && _savingsRate <= 1e18, "Must be a valid rate");
        savingsRate = _savingsRate;
        emit SavingsRateChanged(_savingsRate);
    }

    /**
     * @dev Allows the liquidator to deposit proceeds from iquidated gov tokens.
     * Transfers proceeds on a second by second basis to the Savings Contract over 1 week.
     * @param _mIx The mIx to transfer and distribute
     * @param _liquidated Units of mIx to distribute
     */
    function depositLiquidation(address _mIx, uint256 _liquidated)
        external
        whenNotPaused
        onlyLiquidator
        whenStreamsNotFrozen
    {
        // Collect existing interest to ensure everything is up to date
        _collectAndDistributeInterest(_mIx);

        // transfer liquidated mUSD to here
        IERC20(_mIx).safeTransferFrom(_liquidator(), address(this), _liquidated);

        uint256 leftover = _unstreamedRewards(_mIx, StreamType.liquidator);
        _initialiseStream(_mIx, StreamType.liquidator, _liquidated.add(leftover), DURATION);

        emit LiquidatorDeposited(_mIx, _liquidated);
    }

    /**
     * @dev Collects the platform interest from a given mIx and then adds capital to the
     * stream. If there is > 24h left in current stream, just top it up, otherwise reset.
     * @param _mIx The mIx to fetch interest
     */
    function collectAndStreamInterest(address _mIx)
        external
        whenNotPaused
        whenStreamsNotFrozen
    {
        // Collect existing interest to ensure everything is up to date
        _collectAndDistributeInterest(_mIx);

        uint256 currentTime = now;
        uint256 previousBatch = lastBatchCollected[_mIx];
        uint256 timeSincePreviousBatch = currentTime.sub(previousBatch);
        require(timeSincePreviousBatch > 6 hours, "Cannot deposit twice in 6 hours");
        lastBatchCollected[_mIx] = currentTime;

        // Batch collect
        (uint256 interestCollected, uint256 totalSupply) =  IMix(_mIx).collectPlatformInterest();

        if(interestCollected > 0){
            // Validate APY
            uint256 apy = _validateCollection(totalSupply, interestCollected, timeSincePreviousBatch);

            // Get remaining rewards
            uint256 leftover = _unstreamedRewards(_mIx, StreamType.yield);
            _initialiseStream(_mIx, StreamType.yield, interestCollected.add(leftover), ONE_DAY);

            emit InterestCollected(_mIx, interestCollected, totalSupply, apy);
        }

        emit InterestCollected(_mIx, interestCollected, totalSupply, 0);
    }

    /**
     * @dev Calculates how many rewards from the stream are still to be distributed, from the
     * last collection time to the end of the stream.
     * @param _mIx The mIx in question
     * @return leftover The total amount of mIx that is yet to be collected from a stream
     */
    function _unstreamedRewards(address _mIx, StreamType _stream) internal view returns (uint256 leftover) {
        uint256 lastUpdate = lastCollection[_mIx];

        Stream memory stream = _stream == StreamType.liquidator ? liqStream[_mIx] : yieldStream[_mIx];
        uint256 unclaimedSeconds = 0;
        if(lastUpdate < stream.end){
            unclaimedSeconds = stream.end.sub(lastUpdate);
        }
        return unclaimedSeconds.mul(stream.rate);
    }

    /**
     * @dev Simply sets up the stream
     * @param _mIx The mIx in question
     * @param _amount Amount of units to stream
     * @param _duration Duration of the stream, from now
     */
    function _initialiseStream(address _mIx, StreamType _stream, uint256 _amount, uint256 _duration) internal {
        uint256 currentTime = now;
        // Distribute reward per second over X seconds
        uint256 rate = _amount.div(_duration);
        uint256 end = currentTime.add(_duration);
        if(_stream == StreamType.liquidator){
            liqStream[_mIx] = Stream(end, rate);
        } else {
            yieldStream[_mIx] = Stream(end, rate);
        }

        // Reset pool data to enable lastCollection usage twice
        require(lastCollection[_mIx] == currentTime, "Stream data must be up to date");
    }

    /***************************************
                COLLECTION
    ****************************************/

    /**
     * @dev Collects interest from a target mIx and distributes to the SavingsContract.
     *      Applies constraints such that the max APY since the last fee collection cannot
     *      exceed the "MAX_APY" variable.
     * @param _mIx       mIx for which the interest should be collected
     */
    function collectAndDistributeInterest(address _mIx)
        external
        whenNotPaused
    {
        _collectAndDistributeInterest(_mIx);
    }

    function _collectAndDistributeInterest(address _mIx)
        internal
    {
        ISavingsContractV1 savingsContract = savingsContracts[_mIx];
        require(address(savingsContract) != address(0), "Must have a valid savings contract");

        // Get collection details
        uint256 recentPeriodStart = lastPeriodStart[_mIx];
        uint256 previousCollection = lastCollection[_mIx];
        lastCollection[_mIx] = now;

        // 1. Collect the new interest from the mIx
        IMix mIx = IMix(_mIx);
        (uint256 interestCollected, uint256 totalSupply) = mIx.collectInterest();

        // 2. Update all the time stamps
        //    Avoid division by 0 by adding a minimum elapsed time of 1 second
        uint256 timeSincePeriodStart = StableMath.max(1, now.sub(recentPeriodStart));
        uint256 timeSinceLastCollection = StableMath.max(1, now.sub(previousCollection));

        uint256 inflationOperand = interestCollected;
        //    If it has been 30 mins since last collection, reset period data
        if(timeSinceLastCollection > THIRTY_MINUTES) {
            lastPeriodStart[_mIx] = now;
            periodYield[_mIx] = 0;
        }
        //    Else if period has elapsed, start a new period from the lastCollection time
        else if(timeSincePeriodStart > THIRTY_MINUTES) {
            lastPeriodStart[_mIx] = previousCollection;
            periodYield[_mIx] = interestCollected;
        }
        //    Else add yield to period yield
        else {
            inflationOperand = periodYield[_mIx].add(interestCollected);
            periodYield[_mIx] = inflationOperand;
        }

        //    Add on liquidated
        uint256 newReward = _unclaimedRewards(_mIx, previousCollection);
        // 3. Validate that interest is collected correctly and does not exceed max APY
        if(interestCollected > 0 || newReward > 0) {
            require(
                IERC20(_mIx).balanceOf(address(this)) >= interestCollected.add(newReward),
                "Must receive mUSD"
            );

            uint256 extrapolatedAPY = _validateCollection(totalSupply, inflationOperand, timeSinceLastCollection);

            emit InterestCollected(_mIx, interestCollected, totalSupply, extrapolatedAPY);

            // 4. Distribute the interest
            //    Calculate the share for savers (95e16 or 95%)
            uint256 saversShare = interestCollected.add(newReward).mulTruncate(savingsRate);

            //    Call depositInterest on contract
            savingsContract.depositInterest(saversShare);

            emit InterestDistributed(_mIx, saversShare);
        } else {
            emit InterestCollected(_mIx, 0, totalSupply, 0);
        }
    }

    /**
     * @dev Calculates unclaimed rewards from the liquidation stream
     * @param _mIx mIx key
     * @param _previousCollection Time of previous collection
     * @return Units of mIx that have been unlocked for distribution
     */
    function _unclaimedRewards(address _mIx, uint256 _previousCollection) internal view returns (uint256) {
        Stream memory liq = liqStream[_mIx];
        uint256 unclaimedSeconds_liq = _unclaimedSeconds(_previousCollection, liq.end);
        uint256 subtotal_liq = unclaimedSeconds_liq.mul(liq.rate);

        Stream memory yield = yieldStream[_mIx];
        uint256 unclaimedSeconds_yield = _unclaimedSeconds(_previousCollection, yield.end);
        uint256 subtotal_yield = unclaimedSeconds_yield.mul(yield.rate);

        return subtotal_liq.add(subtotal_yield);
    }

    /**
     * @dev Calculates the seconds of unclaimed rewards, based on period length
     * @param _lastUpdate Time of last update
     * @param _end End time of period
     * @return Seconds of stream that should be compensated
     */
    function _unclaimedSeconds(uint256 _lastUpdate, uint256 _end) internal view returns (uint256) {
        uint256 currentTime = block.timestamp;
        uint256 unclaimedSeconds = 0;

        if(currentTime <= _end){
            unclaimedSeconds = currentTime.sub(_lastUpdate);
        } else if(_lastUpdate < _end) {
            unclaimedSeconds = _end.sub(_lastUpdate);
        }
        return unclaimedSeconds;
    }

    /**
     * @dev Validates that an interest collection does not exceed a maximum APY. If last collection
     * was under 30 mins ago, simply check it does not exceed 10bps
     * @param _newSupply               New total supply of the mIx
     * @param _interest                Increase in total supply since last collection
     * @param _timeSinceLastCollection Seconds since last collection
     */
    function _validateCollection(uint256 _newSupply, uint256 _interest, uint256 _timeSinceLastCollection)
        internal
        pure
        returns (uint256 extrapolatedAPY)
    {
        // Percentage increase in total supply
        // e.g. (1e20 * 1e18) / 1e24 = 1e14 (or a 0.01% increase)
        // e.g. (5e18 * 1e18) / 1.2e24 = 4.1667e12
        // e.g. (1e19 * 1e18) / 1e21 = 1e16
        uint256 oldSupply = _newSupply.sub(_interest);
        uint256 percentageIncrease = _interest.divPrecisely(oldSupply);

        //      If over 30 mins, extrapolate APY
        // e.g. day: (86400 * 1e18) / 3.154e7 = 2.74..e15
        // e.g. 30 mins: (1800 * 1e18) / 3.154e7 = 5.7..e13
        // e.g. epoch: (1593596907 * 1e18) / 3.154e7 = 50.4..e18
        uint256 yearsSinceLastCollection =
            _timeSinceLastCollection.divPrecisely(SECONDS_IN_YEAR);

        // e.g. 0.01% (1e14 * 1e18) / 2.74..e15 = 3.65e16 or 3.65% apr
        // e.g. (4.1667e12 * 1e18) / 5.7..e13 = 7.1e16 or 7.1% apr
        // e.g. (1e16 * 1e18) / 50e18 = 2e14
        extrapolatedAPY = percentageIncrease.divPrecisely(yearsSinceLastCollection);

        if(_timeSinceLastCollection > THIRTY_MINUTES) {
            require(extrapolatedAPY < MAX_APY, "Interest protected from inflating past maxAPY");
        } else {
            require(percentageIncrease < TEN_BPS, "Interest protected from inflating past 10 Bps");
        }
    }


    /***************************************
            Revenue Redistribution
    ****************************************/

    /**
     * @dev Redistributes the unallocated interest to the saved recipient, allowing
     * the siphoned assets to be used elsewhere in the system
     * @param _mIx  mIx to collect
     */
    function distributeUnallocatedInterest(address _mIx)
        external
        onlyGovernance
    {
        IRevenueRecipient recipient = revenueRecipients[_mIx];
        require(address(recipient) != address(0), "Must have valid recipient");

        IERC20 mIx = IERC20(_mIx);
        uint256 balance = mIx.balanceOf(address(this));
        uint256 leftover_liq = _unstreamedRewards(_mIx, StreamType.liquidator);
        uint256 leftover_yield = _unstreamedRewards(_mIx, StreamType.yield);

        uint256 unallocated = balance.sub(leftover_liq).sub(leftover_yield);

        mIx.approve(address(recipient), unallocated);
        recipient.notifyRedistributionAmount(_mIx, unallocated);

        emit RevenueRedistributed(_mIx, address(recipient), unallocated);
    }
}
