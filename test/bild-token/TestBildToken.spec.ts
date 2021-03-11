import { expectEvent, expectRevert } from "@openzeppelin/test-helpers";

import { StandardAccounts, SystemMachine } from "@utils/machines";
import { simpleToExactAmount } from "@utils/math";
import { BN } from "@utils/tools";

import envSetup from "@utils/env_setup";
import * as t from "types/generated";
import shouldBehaveLikeModule from "../shared/behaviours/Module.behaviour";
import shouldBehaveLikeERC20 from "../shared/behaviours/ERC20.behaviour";
import shouldBehaveLikeERC20Burnable from "../shared/behaviours/ERC20Burnable.behaviour";

const BildToken = artifacts.require("BildToken");

const { expect } = envSetup.configure();

contract("BildToken", async (accounts) => {
    const ctx: {
        module?: t.ModuleInstance;
        token?: t.ERC20Instance;
        burnableToken?: t.ERC20BurnableInstance;
    } = {};
    const sa = new StandardAccounts(accounts);
    let systemMachine: SystemMachine;
    let bild: t.BildTokenInstance;

    const redeployBild = async (
        nexusAddress = systemMachine.nexus.address,
        fundRecipient = sa.fundManager,
    ): Promise<t.BildTokenInstance> => {
        return BildToken.new(nexusAddress, fundRecipient);
    };

    before(async () => {
        systemMachine = new SystemMachine(sa.all);
        await systemMachine.initialiseMocks(false, false);
        bild = await redeployBild();
    });

    describe("verifying Module initialization", async () => {
        before("reset contracts", async () => {
            bild = await redeployBild();
            ctx.module = bild as t.ModuleInstance;
        });

        shouldBehaveLikeModule(ctx as Required<typeof ctx>, sa);

        it("should properly store valid arguments", async () => {
            expect(await bild.nexus()).eq(systemMachine.nexus.address);
        });
    });

    describe("verifying ERC20 properties", async () => {
        beforeEach("reset contracts", async () => {
            bild = await redeployBild();
            ctx.token = bild as t.ERC20Instance;
            ctx.burnableToken = bild as t.ERC20BurnableInstance;
        });

        shouldBehaveLikeERC20(
            ctx as Required<typeof ctx>,
            "ERC20",
            simpleToExactAmount(100000000, 18),
            sa.fundManager,
            sa.dummy1,
            sa.dummy2,
        );

        shouldBehaveLikeERC20Burnable(
            ctx as Required<typeof ctx>,
            sa.fundManager,
            simpleToExactAmount(100000000, 18),
            [sa.dummy1],
        );

        it("should properly store valid arguments", async () => {
            expect(await bild.name()).eq("Bild");
            expect(await bild.symbol()).eq("MTA");
            expect(await bild.decimals()).bignumber.eq(new BN(18));
        });
    });

    describe("custom ERC20Mintable", async () => {
        beforeEach("reset contracts", async () => {
            bild = await redeployBild();
        });
        describe("managing minters", () => {
            it("should not allow minters to add minters", async () => {
                await expectRevert(
                    bild.addMinter(sa.dummy2, { from: sa.dummy1 }),
                    "Only governor can execute",
                );
                await expectRevert(
                    bild.addMinter(sa.dummy2, { from: sa.dummy2 }),
                    "Only governor can execute",
                );
            });
            it("should allow the governor to add a minter", async () => {
                expect(await bild.isMinter(sa.dummy1)).eq(false);
                const tx = await bild.addMinter(sa.dummy1, { from: sa.governor });
                expectEvent(tx.receipt, "MinterAdded", {
                    account: sa.dummy1,
                });
                expect(await bild.isMinter(sa.dummy1)).eq(true);
            });
            it("should not allow minters to remove minters", async () => {
                // Add minter role
                expect(await bild.isMinter(sa.dummy1)).eq(false);
                await bild.addMinter(sa.dummy1, { from: sa.governor });
                expect(await bild.isMinter(sa.dummy1)).eq(true);
                // Minter or other cannot remove role
                await expectRevert(
                    bild.removeMinter(sa.dummy1, { from: sa.dummy1 }),
                    "Only governor can execute",
                );
                await expectRevert(
                    bild.removeMinter(sa.dummy1, { from: sa.dummy2 }),
                    "Only governor can execute",
                );
            });
            it("should allow the governor to remove a minter", async () => {
                // Add minter role
                expect(await bild.isMinter(sa.dummy1)).eq(false);
                await bild.addMinter(sa.dummy1, { from: sa.governor });
                expect(await bild.isMinter(sa.dummy1)).eq(true);
                // Minter or other cannot remove role
                const tx = await bild.removeMinter(sa.dummy1, { from: sa.governor });
                expectEvent(tx.receipt, "MinterRemoved", {
                    account: sa.dummy1,
                });
                expect(await bild.isMinter(sa.dummy1)).eq(false);
            });
            it("should allow a minter to renounce their minting ability", async () => {
                expect(await bild.isMinter(sa.dummy1)).eq(false);
                await bild.addMinter(sa.dummy1, { from: sa.governor });
                expect(await bild.isMinter(sa.dummy1)).eq(true);
                // Minter or other cannot remove role
                await bild.renounceMinter({ from: sa.dummy1 });
                expect(await bild.isMinter(sa.dummy1)).eq(false);
                await expectRevert(
                    bild.renounceMinter({ from: sa.dummy1 }),
                    "Roles: account does not have role",
                );
            });
        });
        describe("minting Bild", () => {
            it("should not allow a EOA to mint", async () => {
                await expectRevert(
                    bild.mint(sa.dummy1, 1, { from: sa.default }),
                    "MinterRole: caller does not have the Minter role",
                );
            });
            it("should not allow the governor to mint directly", async () => {
                await expectRevert(
                    bild.mint(sa.dummy1, 1, { from: sa.governor }),
                    "MinterRole: caller does not have the Minter role",
                );
            });
            it("should allow a minter to mint", async () => {
                // Assign minting privs
                await bild.addMinter(sa.dummy1, { from: sa.governor });
                expect(await bild.isMinter(sa.dummy1)).eq(true);

                // Get balance
                const balBefore = await bild.balanceOf(sa.dummy1);

                // Mint
                await bild.mint(sa.dummy1, 1, { from: sa.dummy1 });

                // Check output bal
                const balAfter = await bild.balanceOf(sa.dummy1);
                expect(balAfter).bignumber.eq(balBefore.add(new BN(1)));
            });
            it("should not allow a removed minter", async () => {
                // Assign minting privs
                await bild.addMinter(sa.dummy1, { from: sa.governor });
                expect(await bild.isMinter(sa.dummy1)).eq(true);

                // Get balance
                const balBefore = await bild.balanceOf(sa.dummy1);

                // Mint
                await bild.mint(sa.dummy1, 1, { from: sa.dummy1 });

                // Check output bal
                const balAfter = await bild.balanceOf(sa.dummy1);
                expect(balAfter).bignumber.eq(balBefore.add(new BN(1)));

                // Remove minter privs
                await bild.removeMinter(sa.dummy1, { from: sa.governor });
                expect(await bild.isMinter(sa.dummy1)).eq(false);

                await expectRevert(
                    bild.mint(sa.dummy1, 1, { from: sa.dummy1 }),
                    "MinterRole: caller does not have the Minter role",
                );
            });
        });
    });
});
