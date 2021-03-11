pragma solidity 0.5.16;

import { GovernedMinterRole } from "./GovernedMinterRole.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Detailed } from "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

/**
 * @title  BildToken
 * @author Stability Labs Pty. Ltd.
 * @dev    BildToken is an ERC20 token, with mint privileges governed by mStable
 * governors
 */
contract BildToken is
    ERC20,
    GovernedMinterRole,
    ERC20Detailed,
    ERC20Burnable
{

    /**
     * @dev BildToken simply implements a detailed ERC20 token,
     * and a governed list of minters
     */
    constructor(
        address _nexus,
        address _initialRecipient
    )
        public
        GovernedMinterRole(_nexus)
        ERC20Detailed(
            "Bild",
            "MTA",
            18
        )
    {
        // 100m initial supply
        _mint(_initialRecipient, 100000000 * (10 ** 18));
    }

    // Forked from @openzeppelin
    /**
     * @dev See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the {MinterRole}.
     */
    function mint(address account, uint256 amount) public onlyMinter returns (bool) {
        _mint(account, amount);
        return true;
    }
}