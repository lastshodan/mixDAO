/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface StakingRewardsContract
  extends Truffle.Contract<StakingRewardsInstance> {
  "new"(
    _nexus: string,
    _stakingToken: string,
    _rewardsToken: string,
    _rewardsDistributor: string,
    meta?: Truffle.TransactionDetails
  ): Promise<StakingRewardsInstance>;
}

export interface RewardAdded {
  name: "RewardAdded";
  args: {
    reward: BN;
    0: BN;
  };
}

export interface RewardPaid {
  name: "RewardPaid";
  args: {
    user: string;
    reward: BN;
    0: string;
    1: BN;
  };
}

export interface Staked {
  name: "Staked";
  args: {
    user: string;
    amount: BN;
    payer: string;
    0: string;
    1: BN;
    2: string;
  };
}

export interface Withdrawn {
  name: "Withdrawn";
  args: {
    user: string;
    amount: BN;
    0: string;
    1: BN;
  };
}

type AllEvents = RewardAdded | RewardPaid | Staked | Withdrawn;

export interface StakingRewardsInstance extends Truffle.ContractInstance {
  DURATION(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  balanceOf(
    _account: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  claimReward: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  earned(_account: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

  exit: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  getRewardToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

  lastTimeRewardApplicable(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  lastUpdateTime(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  nexus(txDetails?: Truffle.TransactionDetails): Promise<string>;

  notifyRewardAmount: {
    (
      _reward: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _reward: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _reward: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _reward: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  periodFinish(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  rewardPerToken(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  rewardPerTokenStored(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  rewardRate(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  rewards(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

  rewardsDistributor(txDetails?: Truffle.TransactionDetails): Promise<string>;

  rewardsToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

  setRewardsDistribution: {
    (
      _rewardsDistributor: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _rewardsDistributor: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _rewardsDistributor: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _rewardsDistributor: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  stakingToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

  totalSupply(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  userRewardPerTokenPaid(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  withdraw: {
    (
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    DURATION(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    balanceOf(
      _account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    claimReward: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    earned(
      _account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    exit: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    getRewardToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

    lastTimeRewardApplicable(
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    lastUpdateTime(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    nexus(txDetails?: Truffle.TransactionDetails): Promise<string>;

    notifyRewardAmount: {
      (
        _reward: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _reward: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _reward: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _reward: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    periodFinish(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    rewardPerToken(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    rewardPerTokenStored(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    rewardRate(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    rewards(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

    rewardsDistributor(txDetails?: Truffle.TransactionDetails): Promise<string>;

    rewardsToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

    setRewardsDistribution: {
      (
        _rewardsDistributor: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _rewardsDistributor: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _rewardsDistributor: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _rewardsDistributor: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    stakingToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

    totalSupply(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    userRewardPerTokenPaid(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    withdraw: {
      (
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    "stake(uint256)": {
      (
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    "stake(address,uint256)": {
      (
        _beneficiary: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _beneficiary: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _beneficiary: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _beneficiary: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
