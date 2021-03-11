pragma solidity 0.5.16;

import { IRevenueRecipient } from "../../interfaces/ISavingsManager.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockRevenueRecipient is IRevenueRecipient {


    function notifyRedistributionAmount(address _mIx, uint256 _amount) external {
        IERC20(_mIx).transferFrom(msg.sender, address(this), _amount);
    }
}