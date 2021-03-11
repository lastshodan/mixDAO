pragma solidity 0.5.16;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import { MixHelpers } from "../../mix/shared/MixHelpers.sol";

/**
 * @title  PlatformTokenVendor
 * @author Stability Labs Pty. Ltd.
 * @notice Stores platform tokens for distributing to StakingReward participants
 * @dev    Only deploy this during the constructor of a given StakingReward contract
 */
contract PlatformTokenVendor {

    IERC20 public platformToken;
    address public parentStakingContract;

    /** @dev Simple constructor that stores the parent address */
    constructor(IERC20 _platformToken) public {
        parentStakingContract = msg.sender;
        platformToken = _platformToken;
        MixHelpers.safeInfiniteApprove(address(_platformToken), parentStakingContract);
    }

    /**
     * @dev Re-approves the StakingReward contract to spend the platform token.
     * Just incase for some reason approval has been reset.
     */
    function reApproveOwner() external {
        MixHelpers.safeInfiniteApprove(address(platformToken), parentStakingContract);
    }
}
