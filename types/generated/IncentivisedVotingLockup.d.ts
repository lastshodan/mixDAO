/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IncentivisedVotingLockupContract
  extends Truffle.Contract<IncentivisedVotingLockupInstance> {
  "new"(
    _stakingToken: string,
    _name: string,
    _symbol: string,
    _nexus: string,
    _rewardsDistributor: string,
    meta?: Truffle.TransactionDetails
  ): Promise<IncentivisedVotingLockupInstance>;
}

export interface Deposit {
  name: "Deposit";
  args: {
    provider: string;
    value: BN;
    locktime: BN;
    action: BN;
    ts: BN;
    0: string;
    1: BN;
    2: BN;
    3: BN;
    4: BN;
  };
}

export interface Ejected {
  name: "Ejected";
  args: {
    ejected: string;
    ejector: string;
    ts: BN;
    0: string;
    1: string;
    2: BN;
  };
}

export interface Expired {
  name: "Expired";
  args: {};
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

export interface Withdraw {
  name: "Withdraw";
  args: {
    provider: string;
    value: BN;
    ts: BN;
    0: string;
    1: BN;
    2: BN;
  };
}

type AllEvents =
  | Deposit
  | Ejected
  | Expired
  | RewardAdded
  | RewardPaid
  | Withdraw;

export interface IncentivisedVotingLockupInstance
  extends Truffle.ContractInstance {
  END(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  MAXTIME(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  balanceOf(
    _owner: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  balanceOfAt(
    _owner: string,
    _blockNumber: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  checkpoint: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  claimReward: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  createLock: {
    (
      _value: number | BN | string,
      _unlockTime: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _value: number | BN | string,
      _unlockTime: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _value: number | BN | string,
      _unlockTime: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _value: number | BN | string,
      _unlockTime: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  decimals(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  earned(_addr: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

  eject: {
    (_addr: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(_addr: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      _addr: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _addr: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  exit: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  expireContract: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  expired(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

  getDuration(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  getLastUserPoint(
    _addr: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BN, BN, BN]>;

  getRewardToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

  globalEpoch(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  increaseLockAmount: {
    (
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  increaseLockLength: {
    (
      _unlockTime: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _unlockTime: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _unlockTime: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _unlockTime: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  lastTimeRewardApplicable(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  lastUpdateTime(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  locked(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BN, BN]>;

  name(txDetails?: Truffle.TransactionDetails): Promise<string>;

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

  pointHistory(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BN, BN, BN, BN]>;

  rewardPerToken(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  rewardPerTokenStored(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  rewardRate(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  rewards(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

  rewardsDistributor(txDetails?: Truffle.TransactionDetails): Promise<string>;

  rewardsPaid(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

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

  slopeChanges(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  stakingToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

  staticBalanceOf(
    _addr: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  symbol(txDetails?: Truffle.TransactionDetails): Promise<string>;

  totalStaticWeight(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  totalSupply(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  totalSupplyAt(
    _blockNumber: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  userPointEpoch(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  userPointHistory(
    arg0: string,
    arg1: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BN, BN, BN, BN]>;

  userRewardPerTokenPaid(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  withdraw: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  methods: {
    END(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    MAXTIME(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    balanceOf(
      _owner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    balanceOfAt(
      _owner: string,
      _blockNumber: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    checkpoint: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    claimReward: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    createLock: {
      (
        _value: number | BN | string,
        _unlockTime: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _value: number | BN | string,
        _unlockTime: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _value: number | BN | string,
        _unlockTime: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _value: number | BN | string,
        _unlockTime: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    decimals(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    earned(_addr: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

    eject: {
      (_addr: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _addr: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _addr: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _addr: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    exit: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    expireContract: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    expired(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

    getDuration(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    getLastUserPoint(
      _addr: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN, BN]>;

    getRewardToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

    globalEpoch(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    increaseLockAmount: {
      (
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    increaseLockLength: {
      (
        _unlockTime: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _unlockTime: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _unlockTime: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _unlockTime: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    lastTimeRewardApplicable(
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    lastUpdateTime(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    locked(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN]>;

    name(txDetails?: Truffle.TransactionDetails): Promise<string>;

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

    pointHistory(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN, BN, BN]>;

    rewardPerToken(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    rewardPerTokenStored(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    rewardRate(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    rewards(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

    rewardsDistributor(txDetails?: Truffle.TransactionDetails): Promise<string>;

    rewardsPaid(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

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

    slopeChanges(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    stakingToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

    staticBalanceOf(
      _addr: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    symbol(txDetails?: Truffle.TransactionDetails): Promise<string>;

    totalStaticWeight(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    totalSupply(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    totalSupplyAt(
      _blockNumber: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    userPointEpoch(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    userPointHistory(
      arg0: string,
      arg1: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN, BN, BN]>;

    userRewardPerTokenPaid(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    withdraw: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
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
