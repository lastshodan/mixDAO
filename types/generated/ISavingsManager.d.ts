/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface ISavingsManagerContract
  extends Truffle.Contract<ISavingsManagerInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<ISavingsManagerInstance>;
}

type AllEvents = never;

export interface ISavingsManagerInstance extends Truffle.ContractInstance {
  collectAndDistributeInterest: {
    (_mIx: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(_mIx: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      _mIx: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _mIx: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  collectAndStreamInterest: {
    (_mIx: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(_mIx: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      _mIx: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _mIx: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  depositLiquidation: {
    (
      _mIx: string,
      _liquidation: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _mIx: string,
      _liquidation: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _mIx: string,
      _liquidation: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _mIx: string,
      _liquidation: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  distributeUnallocatedInterest: {
    (_mIx: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(_mIx: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      _mIx: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _mIx: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    collectAndDistributeInterest: {
      (_mIx: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(_mIx: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(
        _mIx: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _mIx: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    collectAndStreamInterest: {
      (_mIx: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(_mIx: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(
        _mIx: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _mIx: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    depositLiquidation: {
      (
        _mIx: string,
        _liquidation: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _mIx: string,
        _liquidation: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _mIx: string,
        _liquidation: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _mIx: string,
        _liquidation: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    distributeUnallocatedInterest: {
      (_mIx: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(_mIx: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(
        _mIx: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _mIx: string,
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
