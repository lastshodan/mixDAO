pragma solidity 0.5.16;

/**
 * @title ISavingsManager
 */
interface ISavingsManager {

    /** @dev Admin privs */
    function distributeUnallocatedInterest(address _mIx) external;

    /** @dev Liquidator */
    function depositLiquidation(address _mIx, uint256 _liquidation) external;

    /** @dev Liquidator */
    function collectAndStreamInterest(address _mIx) external;

    /** @dev Public privs */
    function collectAndDistributeInterest(address _mIx) external;
}

interface IRevenueRecipient {

    /** @dev Recipient */
    function notifyRedistributionAmount(address _mIx, uint256 _amount) external;
}