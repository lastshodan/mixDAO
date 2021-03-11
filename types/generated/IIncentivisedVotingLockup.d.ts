/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IIncentivisedVotingLockupContract
  extends Truffle.Contract<IIncentivisedVotingLockupInstance> {
  "new"(
    meta?: Truffle.TransactionDetails
  ): Promise<IIncentivisedVotingLockupInstance>;
}

type AllEvents = never;

export interface IIncentivisedVotingLockupInstance
  extends Truffle.ContractInstance {
  balanceOf(
    _owner: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  balanceOfAt(
    _owner: string,
    _blockNumber: number | BN | string,
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

  earned(_account: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

  eject: {
    (_user: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(_user: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      _user: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _user: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  expireContract: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  getLastUserPoint(
    _addr: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BN, BN, BN]>;

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

  totalSupply(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  totalSupplyAt(
    _blockNumber: number | BN | string,
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
    balanceOf(
      _owner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    balanceOfAt(
      _owner: string,
      _blockNumber: number | BN | string,
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

    earned(
      _account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    eject: {
      (_user: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _user: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _user: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _user: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    expireContract: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    getLastUserPoint(
      _addr: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN, BN]>;

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

    totalSupply(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    totalSupplyAt(
      _blockNumber: number | BN | string,
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
