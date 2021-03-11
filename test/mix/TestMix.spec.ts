import { expectEvent, time, expectRevert } from "@openzeppelin/test-helpers";
import { keccak256 } from "web3-utils";

import { MixMachine, StandardAccounts, SystemMachine, MixDetails } from "@utils/machines";
import { simpleToExactAmount, applyRatio } from "@utils/math";
import { assertBNSlightlyGTPercent } from "@utils/assertions";
import { ZERO_ADDRESS, TEN_MINS, MAX_UINT256 } from "@utils/constants";
import { BN } from "@utils/tools";

import envSetup from "@utils/env_setup";
import * as t from "types/generated";
import shouldBehaveLikeModule from "../shared/behaviours/Module.behaviour";

const Nexus = artifacts.require("Nexus");

const { expect } = envSetup.configure();

contract("Mix", async (accounts) => {
    const ctx: { module?: t.ModuleInstance } = {};
    const sa = new StandardAccounts(accounts);
    let systemMachine: SystemMachine;
    let mixMachine: MixMachine;
    let mixDetails: MixDetails;

    const runSetup = async (initBasket = false): Promise<void> => {
        mixDetails = initBasket
            ? await mixMachine.deployMixAndSeedBasket()
            : await mixMachine.deployMix();
        ctx.module = mixDetails.mIx;
    };

    before("Init contract", async () => {
        systemMachine = new SystemMachine(sa.all);
        await systemMachine.initialiseMocks(false, true);
        mixMachine = systemMachine.mixMachine;
        await runSetup();
    });

    describe("initializing mIx", async () => {
        describe("verifying Module initialization", async () => {
            beforeEach("reset contracts", async () => {
                await runSetup();
            });

            shouldBehaveLikeModule(ctx as Required<typeof ctx>, sa);

            it("should properly store valid arguments", async () => {
                // Check for nexus addr
                expect(await mixDetails.mIx.nexus()).eq(systemMachine.nexus.address);
            });
        });
        describe("verifying default storage", async () => {
            before("reset contracts", async () => {
                await runSetup();
            });
            it("should set valid arguments", async () => {
                expect(await mixDetails.mIx.forgeValidator()).eq(
                    mixDetails.forgeValidator.address,
                );
                expect(await mixDetails.mIx.getBasketManager()).eq(
                    mixDetails.basketManager.address,
                );
                expect(await mixDetails.mIx.swapFee()).bignumber.eq(
                    simpleToExactAmount(6, 14),
                );
                expect(await mixDetails.mIx.redemptionFee()).bignumber.eq(
                    simpleToExactAmount(3, 14),
                );
                expect(await mixDetails.mIx.surplus()).bignumber.eq(new BN(0));
                expect(await mixDetails.mIx.cacheSize()).bignumber.eq(
                    simpleToExactAmount(1, 17),
                );
                expect(await mixDetails.mIx.decimals()).bignumber.eq(new BN(18));
                expect(await mixDetails.mIx.balanceOf(sa.dummy1)).bignumber.eq(new BN(0));
                expect(await mixDetails.mIx.name()).eq("mStable Mock");
                expect(await mixDetails.mIx.symbol()).eq("mMOCK");
            });
        });
    });
    describe("using basic setters", async () => {
        it("should allow changing of the cache size", async () => {
            // update by the governor
            const oldSize = await mixDetails.mIx.cacheSize();
            const newSize = simpleToExactAmount(1, 16); // 1%
            expect(oldSize).bignumber.not.eq(newSize);
            await mixDetails.mIx.setCacheSize(newSize, { from: sa.governor });
            expect(await mixDetails.mIx.cacheSize()).bignumber.eq(newSize);
            // rejected if not governor
            await expectRevert(
                mixDetails.mIx.setCacheSize(newSize, { from: sa.default }),
                "Only governance can execute",
            );
            // cannot exceed cap
            const feeExceedingCap = simpleToExactAmount(21, 16); // 21%
            await expectRevert(
                mixDetails.mIx.setCacheSize(feeExceedingCap, { from: sa.governor }),
                "Must be <= 20%",
            );
            // cannot exceed min
            const feeExceedingMin = MAX_UINT256;
            await expectRevert(
                mixDetails.mIx.setCacheSize(feeExceedingMin, { from: sa.governor }),
                "Must be <= 20%",
            );
        });
        it("should allow upgrades of the ForgeValidator by governor with valid params", async () => {
            // update by the governor
            await mixDetails.mIx.upgradeForgeValidator(sa.other, { from: sa.governor });
            expect(sa.governor).eq(await systemMachine.nexus.governor());
            expect(await mixDetails.mIx.forgeValidator()).eq(sa.other);
            // rejected if not governor
            await expectRevert(
                mixDetails.mIx.upgradeForgeValidator(sa.dummy2, { from: sa.default }),
                "Only governor can execute",
            );
            // rejected if invalid params
            await expectRevert(
                mixDetails.mIx.upgradeForgeValidator(ZERO_ADDRESS, { from: sa.governor }),
                "Must be non null address",
            );
        });
        it("should allow locking of the ForgeValidator", async () => {
            // rejected if not governor
            await expectRevert(
                mixDetails.mIx.lockForgeValidator({ from: sa.default }),
                "Only governor can execute",
            );
            // Lock
            await mixDetails.mIx.lockForgeValidator({ from: sa.governor });
            // no setting when locked
            await expectRevert(
                mixDetails.mIx.upgradeForgeValidator(sa.dummy2, { from: sa.governor }),
                "Must be allowed to upgrade",
            );
        });
        it("should allow the fee rate to be changed", async () => {
            // update by the governor
            const oldFee = await mixDetails.mIx.swapFee();
            const newfee = simpleToExactAmount(1, 16); // 1%
            expect(oldFee).bignumber.not.eq(newfee);
            await mixDetails.mIx.setSwapFee(newfee, { from: sa.governor });
            expect(await mixDetails.mIx.swapFee()).bignumber.eq(newfee);
            // rejected if not governor
            await expectRevert(
                mixDetails.mIx.setSwapFee(newfee, { from: sa.default }),
                "Only governor can execute",
            );
            // cannot exceed cap
            const feeExceedingCap = simpleToExactAmount(11, 16); // 11%
            await expectRevert(
                mixDetails.mIx.setSwapFee(feeExceedingCap, { from: sa.governor }),
                "Rate must be within bounds",
            );
            // cannot exceed min
            const feeExceedingMin = MAX_UINT256;
            await expectRevert(
                mixDetails.mIx.setSwapFee(feeExceedingMin, { from: sa.governor }),
                "Rate must be within bounds",
            );
        });
        it("should allow the redemption fee rate to be changed", async () => {
            // update by the governor
            const oldFee = await mixDetails.mIx.redemptionFee();
            const newfee = simpleToExactAmount(1, 16); // 1%
            expect(oldFee).bignumber.not.eq(newfee);
            await mixDetails.mIx.setRedemptionFee(newfee, { from: sa.governor });
            expect(await mixDetails.mIx.redemptionFee()).bignumber.eq(newfee);
            // rejected if not governor
            await expectRevert(
                mixDetails.mIx.setRedemptionFee(newfee, { from: sa.default }),
                "Only governor can execute",
            );
            // cannot exceed cap
            const feeExceedingCap = simpleToExactAmount(11, 16); // 11%
            await expectRevert(
                mixDetails.mIx.setRedemptionFee(feeExceedingCap, { from: sa.governor }),
                "Rate must be within bounds",
            );
            // cannot exceed min
            const feeExceedingMin = MAX_UINT256;
            await expectRevert(
                mixDetails.mIx.setRedemptionFee(feeExceedingMin, { from: sa.governor }),
                "Rate must be within bounds",
            );
        });
    });

    describe("collecting interest", async () => {
        beforeEach("init basset with vaults", async () => {
            await runSetup(true);
        });
        it("should collect interest, update the vaults and send to the manager", async () => {
            // 1.0. Simulate some activity on the lending markets
            // Fast forward a bit
            await time.increase(TEN_MINS);

            // 1.1. Simulate some activity on the lending markets
            // Mint with all bAssets
            const { bAssets } = mixDetails;
            const approvals = await mixMachine.approveMixMulti(
                bAssets,
                mixDetails.mIx,
                1,
                sa.default,
            );
            await mixDetails.mIx.mintMulti(
                bAssets.map((b) => b.address),
                approvals,
                sa.default,
            );

            // 2.0 Get all balances and data before
            const mUSDBalBefore = await mixDetails.mIx.balanceOf(sa.dummy1);
            const bassetsBefore = await mixMachine.getBassetsInMix(mixDetails);
            const sumOfVaultsBefore = bassetsBefore.reduce(
                (p, c) => p.add(applyRatio(c.vaultBalance, c.ratio)),
                new BN(0),
            );
            const totalSupplyBefore = await mixDetails.mIx.totalSupply();

            // 3.0 Collect the interest
            const nexus = await Nexus.at(await mixDetails.mIx.nexus());
            const [savingsManagerInNexus] = await nexus.modules(keccak256("SavingsManager"));
            expect(sa.dummy1).eq(savingsManagerInNexus);

            await mixDetails.mIx.collectInterest({ from: sa.dummy1 });
            const tx = await mixDetails.mIx.collectPlatformInterest({ from: sa.dummy1 });

            // 4.0 Check outputs
            const mUSDBalAfter = await mixDetails.mIx.balanceOf(sa.dummy1);
            const bassetsAfter = await mixMachine.getBassetsInMix(mixDetails);

            bassetsAfter.map((b, i) =>
                expect(b.vaultBalance).bignumber.gt(new BN(bassetsBefore[i].vaultBalance) as any),
            );

            const sumOfVaultsAfter = bassetsAfter.reduce(
                (p, c) => p.add(applyRatio(c.vaultBalance, c.ratio)),
                new BN(0),
            );
            const totalSupplyAfter = await mixDetails.mIx.totalSupply();

            // 4.1 totalSupply should only increase by <= 0.0005%
            assertBNSlightlyGTPercent(
                totalSupplyAfter,
                totalSupplyBefore,
                systemMachine.isGanacheFork ? "0.001" : "0.01",
                true,
            );
            // 4.2 check that increase in vault balance is equivalent to total balance
            const increasedTotalSupply = totalSupplyAfter.sub(totalSupplyBefore);
            expect(sumOfVaultsAfter.sub(sumOfVaultsBefore)).bignumber.eq(increasedTotalSupply);
            // 4.3 Ensure that the SavingsManager received the mIx
            expect(mUSDBalAfter).bignumber.eq(mUSDBalBefore.add(increasedTotalSupply));
            // 4.4 Event emits correct unit
            expectEvent(tx.receipt, "MintedMulti", { mIxQuantity: increasedTotalSupply });
        });
        it("should only allow the SavingsManager to collect interest when BasketManager unpaused", async () => {
            const nexus = await Nexus.at(await mixDetails.mIx.nexus());
            const [savingsManagerInNexus] = await nexus.modules(keccak256("SavingsManager"));
            expect(sa.dummy1).eq(savingsManagerInNexus);

            await expectRevert(
                mixDetails.mIx.collectInterest({ from: sa.governor }),
                "Must be savings manager",
            );
            await expectRevert(
                mixDetails.mIx.collectPlatformInterest({ from: sa.default }),
                "Must be savings manager",
            );

            await mixDetails.basketManager.pause({ from: sa.governor });
            await expectRevert(
                mixDetails.mIx.collectPlatformInterest({ from: sa.dummy1 }),
                "Pausable: paused",
            );
        });
    });
});
