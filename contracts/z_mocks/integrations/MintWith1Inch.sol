pragma solidity 0.5.16;

// External
import { AbstractBuyAndMint } from "./AbstractBuyAndMint.sol";
import { IMix } from "../../interfaces/IMix.sol";

// Libs
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @dev OneSplit Exchange interface
 */
contract IOneSplit {
    function swap(
        IERC20 fromToken,
        IERC20 toToken,
        uint256 amount,
        uint256 minReturn,
        uint256[] memory distribution,
        uint256 flags
    ) public payable;
}

/**
 * @title   MintWith1Inch
 * @author  Stability Labs Pty. Ltd.
 * @notice  Contract integrates with 1inch (a.k.a OneSplit) contract and allows anyone to buy
 *          bAsset tokens using ETH from the 1inch and mint mIxs.
 */
contract MintWith1Inch is AbstractBuyAndMint {

    using SafeMath for uint256;

    // 1inch Exchange 1Split contract address
    IOneSplit public oneSplit;

    IERC20 private constant ETH_ADDRESS = IERC20(0x0000000000000000000000000000000000000000);

    /**
     * @param _oneSplit OneSplit contract address
     * @param _mIxs Array of mIxs addresses
     */
    constructor(address _oneSplit, address[] memory _mIxs)
        public
        AbstractBuyAndMint(_mIxs)
    {
        require(_oneSplit != address(0), "1inch address is zero");

        oneSplit = IOneSplit(_oneSplit);
    }

    // @override
    function _externalDexAddress() internal view returns(address) {
        return address(oneSplit);
    }

    // NOTICE: Make the following function call off-chain to get the `distribution` and
    // pass to this function. This is to reduce gas consumption.

    // ============================================================================
    // Offchain: To calculate the distribution to mint max mIxs with ETH amount
    // ============================================================================
    /*
    // Parts = 20 (Suggested by 1inch to provide best rates)
    uint256 parts = 20;
    // Not disable any exchange
    uint256 disableFlags = 0;
    (,uint256[] memory distribution) =
        oneSplit.getExpectedReturn(
            ETH_ADDRESS,        //fromToken
            IERC20(_srcBasset), //toToken
            msg.value,          //fromAmount
            parts,              //parts
            disableFlags        //disableFlags
        );
    */

    // @override
    function buyAndMint(
        IERC20 _srcBasset,
        address _destMix,
        uint256 _minBassetUnits,
        uint256[] calldata _distribution
    )
        external
        payable
        returns (uint256 mIxQtyMinted)
    {
        require(msg.value > 0, "ETH not sent");
        require(_mixExists(_destMix), "Not a valid mIx");

        // 1. Buy bAsset of worth `msg.value` ETH from OneSplit
        oneSplit.swap.value(msg.value)(
            ETH_ADDRESS,
            _srcBasset,
            msg.value,
            _minBassetUnits,
            _distribution,
            0
        );

        uint256 balance = _srcBasset.balanceOf(address(this));
        // 2. Mint mIx with all bAsset
        mIxQtyMinted = IMix(_destMix).mintTo(address(_srcBasset), balance, _msgSender());
    }
}