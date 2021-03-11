pragma solidity 0.5.16;

import { MixStructs } from "../mix/shared/MixStructs.sol";

/**
 * @title IMix
 * @dev   (Internal) Interface for interacting with Mix
 *        VERSION: 1.0
 *        DATE:    2020-05-05
 */
contract IMix is MixStructs {

    /** @dev Calc interest */
    function collectInterest() external returns (uint256 swapFeesGained, uint256 newTotalSupply);
    function collectPlatformInterest() external returns (uint256 interestGained, uint256 newTotalSupply);

    /** @dev Minting */
    function mint(address _basset, uint256 _bassetQuantity)
        external returns (uint256 mixMinted);
    function mintTo(address _basset, uint256 _bassetQuantity, address _recipient)
        external returns (uint256 mixMinted);
    function mintMulti(address[] calldata _bAssets, uint256[] calldata _bassetQuantity, address _recipient)
        external returns (uint256 mixMinted);

    /** @dev Swapping */
    function swap( address _input, address _output, uint256 _quantity, address _recipient)
        external returns (uint256 output);
    function getSwapOutput( address _input, address _output, uint256 _quantity)
        external view returns (bool, string memory, uint256 output);

    /** @dev Redeeming */
    function redeem(address _basset, uint256 _bassetQuantity)
        external returns (uint256 mixRedeemed);
    function redeemTo(address _basset, uint256 _bassetQuantity, address _recipient)
        external returns (uint256 mixRedeemed);
    function redeemMulti(address[] calldata _bAssets, uint256[] calldata _bassetQuantities, address _recipient)
        external returns (uint256 mixRedeemed);
    function redeemMix(uint256 _mIxQuantity, address _recipient) external;

    /** @dev Setters for the Manager or Gov to update module info */
    function upgradeForgeValidator(address _newForgeValidator) external;

    /** @dev Setters for Gov to set system params */
    function setSwapFee(uint256 _swapFee) external;

    /** @dev Getters */
    function getBasketManager() external view returns(address);
    function forgeValidator() external view returns (address);
    function totalSupply() external view returns (uint256);
    function swapFee() external view returns (uint256);
}
