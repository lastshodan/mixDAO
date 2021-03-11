/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-await-in-loop */

import { expectEvent, expectRevert } from "@openzeppelin/test-helpers";
import { assertBasketIsHealthy, assertBNSlightlyGTPercent } from "@utils/assertions";
import { simpleToExactAmount, applyRatio, applyRatioCeil } from "@utils/math";
import { MixDetails, MixMachine, StandardAccounts, SystemMachine } from "@utils/machines";
import { BN } from "@utils/tools";
import { BassetStatus } from "@utils/mstable-objects";
import { ZERO_ADDRESS, fullScale, ratioScale, ZERO } from "@utils/constants";
import envSetup from "@utils/env_setup";
import * as t from "types/generated";

const { expect } = envSetup.configure();

const MockERC20 = artifacts.require("MockERC20");
const MockAToken = artifacts.require("MockATokenV2");
const MockAave = artifacts.require("MockAaveV2");

contract("Mix - RedeemMix", async (accounts) => {
    const sa = new StandardAccounts(accounts);
    let systemMachine: SystemMachine;
    let mixMachine: MixMachine;
    let mixDetails: MixDetails;

    /**
     * @dev (Re)Sets the local variables for this test file
     * @param seedBasket Should we add base layer liquidity to the vault?
     * @param enableUSDTFee Enable the bAssets with transfer fees?
     */
    const runSetup = async (seedBasket = true, enableUSDTFee = false): Promise<void> => {
        mixDetails = seedBasket
            ? await mixMachine.deployMixAndSeedBasket(enableUSDTFee)
            : await mixMachine.deployMix(enableUSDTFee);
        await assertBasketIsHealthy(mixMachine, mixDetails);
    };

    /**
     * @dev Seeds the mIx basket with custom weightings
     * @param md Mix details object containing all deployed contracts
     * @param weights Whole numbers of mIx to mint for each given bAsset
     */
    const seedWithWeightings = async (
        md: MixDetails,
        weights: Array<BN | string | number>,
    ): Promise<void> => {
        const { mIx, bAssets } = md;
        const approvals = await Promise.all(
            bAssets.map((b, i) => mixMachine.approveMix(b, mIx, weights[i], sa.default)),
        );
        await mIx.mintMulti(
            bAssets.map((b) => b.address),
            approvals,
            sa.default,
            { from: sa.default },
        );
    };

    const assertFailedRedemption = async (
        mIx: t.MixInstance,
        amount: BN,
        reason: string,
        recipient = sa.default,
    ): Promise<void> => {
        const exactAmount = simpleToExactAmount(amount, 18);
        await expectRevert(mIx.redeemMix(exactAmount, recipient), reason);
    };

    // Helper to assert basic redemption conditions, e.g. balance before and after
    const assertRedemption = async (
        md: MixDetails,
        exactAmount: BN,
        recipient: string = sa.default,
        sender: string = sa.default,
        ignoreHealthAssertions = false,
        expectFee = true,
    ): Promise<void> => {
        const { mIx, basketManager, bAssets } = md;

        // 1. Assert all state is currently valid and prepare objects
        //    Assert that the basket is in a healthy state
        if (!ignoreHealthAssertions) await assertBasketIsHealthy(mixMachine, md);

        const basketComp = await mixMachine.getBasketComposition(md);
        //    Get balances before
        const senderMixBalBefore = await mIx.balanceOf(sender);
        const mUSDSupplyBefore = await mIx.totalSupply();
        //    Get arrays of bAsset balances and bAssets
        const recipientBassetBalsBefore = await Promise.all(
            bAssets.map((b) => b.balanceOf(recipient)),
        );

        // 2. Execute the redemption
        const tx = await mIx.redeemMix(exactAmount, recipient, { from: sender });

        // 3. Calculate expected results
        //    Exact bAssets that should be received based on previous collateral levels
        const expectedBassets = await Promise.all(
            basketComp.bAssets.map((b) => {
                const percentageOfBasket = b.mIxUnits
                    .mul(fullScale)
                    .div(basketComp.sumOfBassets);
                return percentageOfBasket
                    .mul(new BN(exactAmount).mul(new BN(basketComp.colRatio)).div(fullScale))
                    .div(fullScale);
            }),
        );
        const expectedBassetsExact = expectedBassets.map((b, i) =>
            b.mul(ratioScale).div(new BN(basketComp.bAssets[i].ratio)),
        );

        let fees = bAssets.map(() => new BN(0));
        let feeRate = new BN(0);

        //    If there is a fee expected, then deduct it from output
        if (expectFee) {
            feeRate = await mIx.redemptionFee();
            expect(feeRate).bignumber.gt(new BN(0) as any);
            expect(feeRate).bignumber.lt(fullScale.div(new BN(50)) as any);
            fees = expectedBassetsExact.map((b) => b.mul(feeRate).div(fullScale));
            fees.map((f, i) =>
                expectedBassetsExact[i].gt(new BN(0) as any)
                    ? expect(f).bignumber.gt(new BN(0) as any)
                    : null,
            );
        }

        // 4. Validate any basic events that should occur
        //    Listen for the events
        await expectEvent(tx.receipt, "RedeemedMix", {
            redeemer: sender,
            recipient,
            mIxQuantity: exactAmount,
        });
        if (expectFee) {
            bAssets.map((b, i) =>
                fees[i].gt(new BN(0))
                    ? expectEvent(tx.receipt, "PaidFee", {
                          payer: sender,
                          asset: b.address,
                          feeQuantity: fees[i],
                      })
                    : null,
            );
        }

        // 5. Validate output state
        //    Sender should have less mIx
        const senderMixBalAfter = await mIx.balanceOf(sender);
        expect(senderMixBalAfter).bignumber.eq(senderMixBalBefore.sub(new BN(exactAmount)));
        //    Total mUSD supply should be less
        const mUSDSupplyAfter = await mIx.totalSupply();
        expect(mUSDSupplyAfter).bignumber.eq(
            mUSDSupplyBefore.sub(new BN(exactAmount)),
            "Total mUSD supply should be less",
        );
        //    Recipient should have more bAsset
        const recipientBassetBalsAfter = await Promise.all(
            bAssets.map((b) => b.balanceOf(recipient)),
        );
        recipientBassetBalsAfter.map((b, i) => {
            return expect(b).bignumber.eq(
                // Subtract the fee from the returned amount
                recipientBassetBalsBefore[i].add(expectedBassetsExact[i]).sub(fees[i]),
                `Recipient should have more bAsset[${i}]`,
            );
        });
        //    Basset payout should always be lte exactAmount in Mix terms
        const sumOfRedemption = expectedBassets.reduce((p, c) => p.add(c), new BN(0));
        assertBNSlightlyGTPercent(
            new BN(exactAmount).mul(new BN(basketComp.colRatio)).div(fullScale),
            sumOfRedemption,
            "0.0001",
            false,
        );

        //    VaultBalance should update for all bAssets
        const bAssetsAfter = await Promise.all(
            bAssets.map((b) => basketManager.getBasset(b.address)),
        );
        bAssetsAfter.map((b, i) =>
            expect(new BN(b.vaultBalance)).bignumber.eq(
                // Full amount including fee should be taken from vaultBalance
                new BN(basketComp.bAssets[i].vaultBalance)
                    .sub(expectedBassetsExact[i])
                    .add(fees[i]),
                `Vault balance should reduce for bAsset[${i}]`,
            ),
        );

        // Complete basket should remain in healthy state
        if (!ignoreHealthAssertions) await assertBasketIsHealthy(mixMachine, md);
    };

    /**
     * @dev (Re)Sets the local variables for this test file
     * @param seedBasket Should we add base layer liquidity to the vault?
     * @param enableUSDTFee Enable the bAssets with transfer fees?
     */
    before("Init contract", async () => {
        systemMachine = new SystemMachine(sa.all);
        mixMachine = new MixMachine(systemMachine);

        await runSetup();
    });

    context("redeeming some mIxs", () => {
        context("when the weights are within the ForgeValidator limit", () => {
            context("and sending to a specific recipient", async () => {
                before(async () => {
                    await runSetup();
                });
                it("should fail if recipient is 0x0", async () => {
                    const { mIx } = mixDetails;
                    await assertFailedRedemption(
                        mIx,
                        simpleToExactAmount(1, 18),
                        "Must be a valid recipient",
                        ZERO_ADDRESS,
                    );
                });
                it("should redeem mUSD when recipient is a contract", async () => {
                    const { basketManager } = mixDetails;
                    const recipient = basketManager.address;
                    await assertRedemption(mixDetails, simpleToExactAmount(1, 18), recipient);
                });
                it("should redeem mUSD when the recipient is an EOA", async () => {
                    const recipient = sa.dummy1;
                    await assertRedemption(mixDetails, simpleToExactAmount(1, 18), recipient);
                });
            });
            context("and specifying one mIx base unit", async () => {
                before(async () => {
                    await runSetup();
                });
                it("should redeem no bAssets due to rounding down", async () => {
                    const { bAssets, mIx } = mixDetails;
                    const recipient = sa.dummy2;
                    const recipientBassetBalsBefore = await Promise.all(
                        bAssets.map((b) => b.balanceOf(recipient)),
                    );
                    await mIx.redeemMix(new BN(1), recipient);
                    const recipientBassetBalsAfter = await Promise.all(
                        bAssets.map((b) => b.balanceOf(recipient)),
                    );
                    recipientBassetBalsAfter.map((b, i) =>
                        expect(b).bignumber.eq(recipientBassetBalsBefore[i]),
                    );
                });
            });
            context("and there is a non zero redemption fee", async () => {
                beforeEach(async () => {
                    await runSetup(false, false);
                    // Just mint 100 of everything
                    await seedWithWeightings(mixDetails, [
                        new BN(100),
                        new BN(100),
                        new BN(100),
                        new BN(100),
                    ]);
                });
                it("should take the fee from the redeemed bAssets", async () => {
                    const { mIx, bAssets } = mixDetails;
                    const recipient = sa.dummy1;
                    const basketComp = await mixMachine.getBasketComposition(mixDetails);

                    // Set redemption fee to 1%
                    await mIx.setRedemptionFee(simpleToExactAmount(1, 16), {
                        from: sa.governor,
                    });
                    const recipientBassetBalsBefore = await Promise.all(
                        bAssets.map((b) => b.balanceOf(recipient)),
                    );
                    const expectedBassetsExact = await Promise.all(
                        basketComp.bAssets.map((b) =>
                            simpleToExactAmount(10, 18).mul(ratioScale).div(new BN(b.ratio)),
                        ),
                    );
                    const bAssetFees = expectedBassetsExact.map((b, i) =>
                        b.mul(simpleToExactAmount(1, 16)).div(fullScale),
                    );
                    expect(bAssetFees.reduce((p, c) => p.add(c), new BN(0))).bignumber.gt(
                        new BN(0) as any,
                    );

                    await assertRedemption(
                        mixDetails,
                        simpleToExactAmount(40, 18),
                        recipient,
                        undefined,
                        undefined,
                        true,
                    );

                    const recipientBassetBalsAfter = await Promise.all(
                        bAssets.map((b) => b.balanceOf(recipient)),
                    );
                    expectedBassetsExact.map((e, i) =>
                        expect(recipientBassetBalsAfter[i]).bignumber.eq(
                            recipientBassetBalsBefore[i]
                                .add(expectedBassetsExact[i])
                                .sub(bAssetFees[i]),
                        ),
                    );

                    const basketCompAfter = await mixMachine.getBasketComposition(mixDetails);
                    basketCompAfter.bAssets.map((b, i) =>
                        expect(b.vaultBalance).bignumber.eq(
                            new BN(basketComp.bAssets[i].vaultBalance)
                                .sub(expectedBassetsExact[i])
                                .add(bAssetFees[i]),
                        ),
                    );
                });
            });
            context("using bAssets with transfer fees", async () => {
                beforeEach(async () => {
                    await runSetup(true, true);
                });
                it("should handle tokens with transfer fees", async () => {
                    // It should burn the full amount of mIx, but the fees deducted mean the redeemer receives less
                    const { mIx, basketManager } = mixDetails;
                    await assertBasketIsHealthy(mixMachine, mixDetails);
                    const exactMixQuantity = simpleToExactAmount(1, 18);
                    const recipient = sa.dummy3;
                    // 1.0 Assert bAsset has fee
                    const basketComp = await mixMachine.getBasketComposition(mixDetails);
                    const bAsset = basketComp.bAssets[3];
                    const expectedBasset = bAsset.mIxUnits
                        .mul(fullScale)
                        .div(basketComp.sumOfBassets)
                        .mul(new BN(exactMixQuantity))
                        .div(fullScale);

                    expect(bAsset.isTransferFeeCharged).to.eq(true);
                    // 2.0 Get balances
                    const totalSupplyBefore = await mIx.totalSupply();
                    const recipientBassetBalBefore = await bAsset.contract.balanceOf(recipient);
                    expect(recipientBassetBalBefore).bignumber.eq(new BN(0));
                    // 3.0 Do the redemption
                    await mIx.redeemMix(exactMixQuantity, recipient);
                    // 4.0 Total supply goes down, and recipient bAsset goes up slightly
                    const recipientBassetBalAfter = await bAsset.contract.balanceOf(recipient);
                    // Assert that we redeemed gt 99% of the bAsset
                    assertBNSlightlyGTPercent(
                        recipientBassetBalBefore.add(expectedBasset),
                        recipientBassetBalAfter,
                        "0.3",
                        true,
                    );
                    // Total supply goes down full amount
                    const totalSupplyAfter = await mIx.totalSupply();
                    expect(totalSupplyAfter).bignumber.eq(
                        totalSupplyBefore.sub(exactMixQuantity),
                    );
                    // VaultBalance should update for this bAsset
                    const bAssetAfter = await basketManager.getBasset(bAsset.address);

                    const feeRate = await mIx.redemptionFee();
                    const fee = expectedBasset.mul(feeRate).div(fullScale);
                    expect(new BN(bAssetAfter.vaultBalance)).bignumber.eq(
                        new BN(bAsset.vaultBalance).sub(expectedBasset).add(fee),
                    );
                    // Complete basket should remain in healthy state
                    await assertBasketIsHealthy(mixMachine, mixDetails);
                });
            });
            context("passing invalid arguments", async () => {
                before(async () => {
                    await runSetup();
                });
                it("should revert when 0 quantity", async () => {
                    await expectRevert(
                        mixDetails.mIx.redeemMix(new BN(0), sa.default),
                        "Invalid redemption quantity",
                    );
                });
                it("should fail if sender doesn't have mIx balance", async () => {
                    const { mIx } = mixDetails;
                    const sender = sa.dummy1;
                    expect(await mIx.balanceOf(sender)).bignumber.eq(new BN(0));
                    await expectRevert(
                        mixDetails.mIx.redeemMix(new BN(10), sa.default, { from: sender }),
                        "ERC20: burn amount exceeds balance",
                    );
                });
            });
            context("performing multiple actions in a row", async () => {
                before("reset", async () => {
                    await runSetup();
                });
                it("should change output proportions with mints/redeems in between", async () => {
                    const { bAssets, mIx } = mixDetails;
                    const recipient = sa.dummy1;
                    await assertRedemption(mixDetails, simpleToExactAmount(1, 18), recipient);

                    const approval0: BN = await mixMachine.approveMix(
                        bAssets[0],
                        mIx,
                        new BN(15),
                    );
                    await mIx.mint(bAssets[0].address, approval0, { from: sa.default });
                    await mIx.redeem(bAssets[3].address, new BN(3), { from: sa.default });

                    await assertRedemption(mixDetails, simpleToExactAmount(4, 18), recipient);
                });
            });
        });
        context("when there are affected bAssets in the basket", async () => {
            before(async () => {
                await runSetup();
            });
            describe("when there are blacklisted", async () => {
                it("should fail", async () => {
                    const { bAssets, mIx, basketManager } = mixDetails;
                    const bAsset = bAssets[0];
                    await basketManager.setBassetStatus(bAsset.address, BassetStatus.Blacklisted, {
                        from: sa.governor,
                    });
                    const newBasset = await basketManager.getBasset(bAsset.address);
                    expect(newBasset.status).to.eq(BassetStatus.Blacklisted.toString());
                    await assertFailedRedemption(
                        mIx,
                        new BN(1),
                        "Basket contains blacklisted bAsset",
                        sa.default,
                    );
                });
            });
            describe("when there are broken pegs", async () => {
                it("should pass if anything but liquidating", async () => {
                    const { bAssets, basketManager } = mixDetails;
                    const bAsset = bAssets[0];
                    const bAsset2 = bAssets[2];
                    await basketManager.handlePegLoss(bAsset.address, false, {
                        from: sa.governor,
                    });
                    await basketManager.handlePegLoss(bAsset2.address, true, {
                        from: sa.governor,
                    });
                    const newBasset = await basketManager.getBasset(bAsset.address);
                    const newBasset2 = await basketManager.getBasset(bAsset2.address);
                    expect(newBasset.status).to.eq(BassetStatus.BrokenAbovePeg.toString());
                    expect(newBasset2.status).to.eq(BassetStatus.BrokenBelowPeg.toString());
                    await assertRedemption(
                        mixDetails,
                        simpleToExactAmount(1, 18),
                        sa.default,
                        sa.default,
                        true,
                    );
                });
            });
            describe("when one is liquidating", async () => {
                it("should fail", async () => {
                    const { bAssets, mIx, basketManager } = mixDetails;
                    const bAsset = bAssets[0];
                    await basketManager.setBassetStatus(bAsset.address, BassetStatus.Liquidating, {
                        from: sa.governor,
                    });
                    const newBasset = await basketManager.getBasset(bAsset.address);
                    expect(newBasset.status).to.eq(BassetStatus.Liquidating.toString());
                    await assertFailedRedemption(
                        mIx,
                        new BN(1),
                        "Basket contains liquidating bAsset",
                    );
                });
            });
        });
        context("when the basket weights are out of sync", async () => {
            context("when some are above", async () => {
                beforeEach(async () => {
                    await runSetup(false);
                });
                it("should succeed like normal", async () => {
                    const { bAssets, basketManager } = mixDetails;
                    let composition = await mixMachine.getBasketComposition(mixDetails);
                    // Expect 4 bAssets with 100 weightings
                    composition.bAssets.forEach((b) => {
                        expect(b.vaultBalance).bignumber.eq(new BN(0));
                        expect(b.maxWeight).bignumber.eq(simpleToExactAmount(100, 16));
                    });
                    // Mint 25 of each bAsset, taking total to 100%
                    await seedWithWeightings(mixDetails, [
                        new BN(40),
                        new BN(20),
                        new BN(20),
                        new BN(20),
                    ]);
                    // Set updated weightings
                    await basketManager.setBasketWeights(
                        bAssets.map((b) => b.address),
                        bAssets.map(() => simpleToExactAmount(30, 16)),
                        {
                            from: sa.governor,
                        },
                    );
                    composition = await mixMachine.getBasketComposition(mixDetails);
                    expect(composition.bAssets[0].overweight).to.eq(true);
                    // Should succeed if we redeem this
                    await assertRedemption(
                        mixDetails,
                        simpleToExactAmount(1, 18),
                        sa.default,
                        sa.default,
                        true,
                    );
                });
            });
            context("when there is one breached", async () => {
                beforeEach(async () => {
                    await runSetup(false);
                });
                it("should succeed regardless", async () => {
                    const { bAssets, basketManager } = mixDetails;
                    const composition = await mixMachine.getBasketComposition(mixDetails);
                    // Expect 4 bAssets with 100 weightings
                    composition.bAssets.forEach((b) => {
                        expect(b.vaultBalance).bignumber.eq(new BN(0));
                        expect(b.maxWeight).bignumber.eq(simpleToExactAmount(100, 16));
                    });
                    // Mint 25 of each bAsset, taking total to 100%
                    await seedWithWeightings(mixDetails, [
                        "29.5", // breached given that it's within 1%
                        new BN(28),
                        new BN(23),
                        "19.5",
                    ]);
                    // Set updated weightings
                    await basketManager.setBasketWeights(
                        bAssets.map((b) => b.address),
                        bAssets.map(() => simpleToExactAmount(30, 16)),
                        {
                            from: sa.governor,
                        },
                    );
                    // Should succeed if we redeem this
                    await assertRedemption(
                        mixDetails,
                        simpleToExactAmount(1, 18),
                        sa.default,
                        sa.default,
                        true,
                    );
                });
            });
            context("when some are 0", async () => {
                beforeEach(async () => {
                    await runSetup(false);
                });
                it("should not care about maxweights", async () => {
                    const { bAssets, basketManager } = mixDetails;
                    const composition = await mixMachine.getBasketComposition(mixDetails);
                    // Expect 4 bAssets with 100 weightings
                    composition.bAssets.forEach((b) => {
                        expect(b.vaultBalance).bignumber.eq(new BN(0));
                        expect(b.maxWeight).bignumber.eq(simpleToExactAmount(100, 16));
                    });
                    // Mint 25 of each bAsset, taking total to 100%
                    await seedWithWeightings(mixDetails, [
                        new BN(40),
                        new BN(20),
                        new BN(20),
                        new BN(20),
                    ]);
                    // Set updated weightings
                    await basketManager.setBasketWeights(
                        bAssets.map((b) => b.address),
                        [
                            simpleToExactAmount(40, 16),
                            simpleToExactAmount(40, 16),
                            simpleToExactAmount(40, 16),
                            new BN(0),
                        ],
                        {
                            from: sa.governor,
                        },
                    );
                    const bAssetAfter = await basketManager.getBasset(bAssets[3].address);
                    expect(bAssetAfter.maxWeight).bignumber.eq(new BN(0));

                    // Basset bal before
                    const recipient = sa.dummy1;
                    const recipientBassetBalBefore = await bAssets[3].balanceOf(recipient);

                    // Should succeed if we redeem this
                    await assertRedemption(
                        mixDetails,
                        simpleToExactAmount(1, 18),
                        recipient,
                        sa.default,
                        true,
                    );

                    // Total supply goes down, and recipient bAsset goes up slightly
                    const recipientBassetBalAfter = await bAssets[3].balanceOf(recipient);
                    // Assert that we redeemed some of this bAsset
                    expect(recipientBassetBalAfter).bignumber.gt(recipientBassetBalBefore as any);
                });
                it("should withdraw 0 if there is 0 collateral", async () => {
                    const { mIx } = mixDetails;
                    await assertFailedRedemption(
                        mIx,
                        new BN(10),
                        "Nothing in the basket to redeem",
                    );
                });
            });
        });
        context("when there are a large number of bAssets in the basket", async () => {
            // Create a basket filled with 16 bAssets, all hooked into the Mock intergation platform
            before(async () => {
                await runSetup(false, false);
                const { basketManager, aaveIntegration } = mixDetails;
                const aaveAddress = await aaveIntegration.platformAddress();
                const mockAave = await MockAave.at(aaveAddress);
                // Create 6 new bAssets
                for (let i = 0; i < 6; i += 1) {
                    const mockBasset = await MockERC20.new(
                        `MKI${i}`,
                        `MI${i}`,
                        18,
                        sa.default,
                        100000000,
                    );
                    const mockAToken = await MockAToken.new(aaveAddress, mockBasset.address);
                    // Add to the mock aave platform
                    await mockAave.addAToken(mockAToken.address, mockBasset.address);
                    // Add the pToken to our integration
                    await aaveIntegration.setPTokenAddress(mockBasset.address, mockAToken.address, {
                        from: sa.governor,
                    });
                    // Add the bAsset to the basket
                    await basketManager.addBasset(
                        mockBasset.address,
                        aaveIntegration.address,
                        false,
                        { from: sa.governor },
                    );
                }
            });
            it("should still perform with 10 bAssets in the basket", async () => {
                // Assert that we have indeed 10 bAssets
                const { basketManager, mIx } = mixDetails;
                const onChainBassets = await mixMachine.getBassetsInMix(mixDetails);
                mixDetails.bAssets = onChainBassets.map((b) => b.contract);
                expect(onChainBassets.length).to.eq(10);
                // Set equal basket weightings
                await basketManager.setBasketWeights(
                    onChainBassets.map((b) => b.addr),
                    onChainBassets.map(() => simpleToExactAmount(10, 16)),
                    { from: sa.governor },
                );
                // Mint 6.25 of each bAsset, taking total to 100%
                const approvals = await Promise.all(
                    onChainBassets.map((b, i) =>
                        mixMachine.approveMix(b.contract, mIx, new BN(10), sa.default),
                    ),
                );
                await mIx.mintMulti(
                    onChainBassets.map((b) => b.addr),
                    approvals,
                    sa.default,
                    { from: sa.default },
                );
                // Do the redemption
                await assertRedemption(mixDetails, simpleToExactAmount(20, 18));
            });
        });
        context("when the mIx has failed", () => {
            beforeEach(async () => {
                await runSetup(true);
                const { basketManager } = mixDetails;
                // Set the colRatio to 80%, which means that the mIx is undercollateralised
                // by 20%. TO compensate, redemption burns higher amount of mIx, and totalSupply
                // passed to the forgevalidator is affected to maintain accurate weightings
                await basketManager.setBasket(true, simpleToExactAmount(8, 17));
            });
            it("should still allow redemption, apply the colRatio effectively", async () => {
                const { basketManager } = mixDetails;
                // should return less than a whole mIx
                const basket = await basketManager.getBasket();
                expect(basket.failed).eq(true);
                await assertRedemption(
                    mixDetails,
                    simpleToExactAmount(1, 18),
                    sa.default,
                    sa.default,
                    true,
                );
                const comp = await mixMachine.getBasketComposition(mixDetails);
                expect(comp.sumOfBassets).bignumber.gte(comp.totalSupply as any);
            });
        });
        context("when the mIx is undergoing recol", () => {
            beforeEach(async () => {
                await runSetup(true);
            });
            it("should block redemption", async () => {
                const { mIx, basketManager } = mixDetails;
                await assertBasketIsHealthy(mixMachine, mixDetails);
                await basketManager.setRecol(true);
                await assertFailedRedemption(
                    mIx,
                    new BN(1),
                    "No bAssets can be undergoing recol",
                );
            });
        });
        context("when the BasketManager is paused", () => {
            beforeEach(async () => {
                await runSetup(true);
            });
            it("should block redemption", async () => {
                const { mIx, basketManager } = mixDetails;
                await assertBasketIsHealthy(mixMachine, mixDetails);
                await basketManager.pause({ from: sa.governor });
                await assertFailedRedemption(mIx, new BN(1), "Pausable: paused");
            });
        });
    });
});
