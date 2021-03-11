pragma solidity 0.5.16;

import { ISavingsContractV1 } from "./ISavingsContract.sol";

interface IMStableHelper {

    /**
     * @dev Returns a valid bAsset with which to mint
     * @param _mIx Mix addr
     * @return valid bool
     * @return string message
     * @return address of bAsset to mint
     */
    function suggestMintAsset(
        address _mIx
    )
        external
        view
        returns (
            bool,
            string memory,
            address
        );

    /**
     * @dev Gets the maximum input for a valid swap pair
     * @param _mIx mIx address (e.g. mUSD)
     * @param _input Asset to input only bAssets accepted
     * @param _output Either a bAsset or the mIx
     * @return valid
     * @return validity reason
     * @return max input units (in native decimals)
     * @return how much output this input would produce (in native decimals, after any fee)
     */
    function getMaxSwap(
        address _mIx,
        address _input,
        address _output
    )
        external
        view
        returns (
            bool,
            string memory,
            uint256,
            uint256
        );


    /**
     * @dev Returns a valid bAsset to redeem
     * @param _mIx Mix addr
     * @return valid bool
     * @return string message
     * @return address of bAsset to redeem
     */
    function suggestRedeemIx(
        address _mIx
    )
        external
        view
        returns (
            bool,
            string memory,
            address
        );

    /**
     * @dev Determines if a given Redemption is valid
     * @param _mIx Address of the given mIx (e.g. mUSD)
     * @param _mIxQuantity Amount of mIx to redeem (in mUSD units)
     * @param _outputBasset Desired output bAsset
     * @return valid
     * @return validity reason
     * @return output in bAsset units
     * @return bAssetQuantityArg - required input argument to the 'redeem' call
     */
    function getRedeemValidity(
        address _mIx,
        uint256 _mIxQuantity,
        address _outputBasset
    )
        external
        view
        returns (
            bool,
            string memory,
            uint256 output,
            uint256 bassetQuantityArg
        );

    /**
     * @dev Gets the users savings balance in Mix terms
     * @param _save SAVE contract address
     * @param _user Address of the user
     * @return balance in Mix units
     */
    function getSaveBalance(
        ISavingsContractV1 _save,
        address _user
    )
        external
        view
        returns (
            uint256
        );

    /**
     * @dev Returns the 'credit' units required to withdraw a certain
     * amount of Mix from the SAVE contract
     * @param _save SAVE contract address
     * @param _amount Amount of mIx to redeem from SAVE
     * @return input for the redeem function (ie. credit units to redeem)
     */
    function getSaveRedeemInput(
        ISavingsContractV1 _save,
        uint256 _amount
    )
        external
        view
        returns (
            uint256
        );
}