pragma solidity 0.5.16;

// Internal
import { MixHelpers } from "../../mix/shared/MixHelpers.sol";

// Library
import { Ownable } from "@openzeppelin/contracts/ownership/Ownable.sol";

/**
 * @title   AbstractBuyAndMint
 * @author  Stability Labs Pty. Ltd.
 * @notice  Abstract contract to allow buy bAsset tokens with ETH and mint mIxs tokens
 *          from mStable.
 */
contract AbstractBuyAndMint is Ownable {

    using MixHelpers for address;

    event MixAdded(address indexed mIx);

    // mIx address => exists
    mapping(address => bool) public mIxs;

    /**
     * @dev Abstarct constructor
     * @param _mIxs Array of valid mIx addresses allowed to mint.
     */
    constructor(address[] memory _mIxs) internal {
        require(_mIxs.length > 0, "No mIxs provided");
        for(uint256 i = 0; i < _mIxs.length; i++) {
            _addMix(_mIxs[i]);
        }
    }

    /**
     * @dev Anyone can call and perform infinite approval for bAssets
     * @param _bAssets An array containing bAssets addresses
     */
    function infiniteApprove(address _mIx, address[] calldata _bAssets) external {
        for(uint256 i = 0; i < _bAssets.length; i++) {
            _bAssets[i].safeInfiniteApprove(_mIx);
        }
    }

    /**
     * @dev The Owner of the contract allowed to add a new supported mIx.
     * @param _mIx Address of the mIx
     */
    function addMix(address _mIx) external onlyOwner {
        _addMix(_mIx);
    }

    /**
     * @dev Add a new mIx to the supported mIxs list
     * @param _mIx Address of the mIx
     */
    function _addMix(address _mIx) internal {
        require(_mIx != address(0), "mIx address is zero");
        require(!_mixExists(_mIx), "mIx already exists");
        mIxs[_mIx] = true;
        emit MixAdded(_mIx);
    }

    /**
     * @dev     Validate that the given mIx supported by this contract.
     * @notice  Only validate mIx address. As bAsset gets validated during minting process.
     * @param _mIx mIx address to validate
     */
    function _mixExists(address _mIx) internal view returns (bool) {
        return mIxs[_mIx];
    }

    /**
     * @dev Abstract function to get the external DEX contract address
     */
    function _externalDexAddress() internal view returns(address);
}