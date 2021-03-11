/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface MockCurveBildPoolContract
  extends Truffle.Contract<MockCurveBildPoolInstance> {
  "new"(
    _coins: string[],
    _mUSD: string,
    meta?: Truffle.TransactionDetails
  ): Promise<MockCurveBildPoolInstance>;
}

type AllEvents = never;

export interface MockCurveBildPoolInstance extends Truffle.ContractInstance {
  coins(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  exchange_underlying: {
    (
      i: number | BN | string,
      j: number | BN | string,
      dx: number | BN | string,
      min_dy: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      i: number | BN | string,
      j: number | BN | string,
      dx: number | BN | string,
      min_dy: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      i: number | BN | string,
      j: number | BN | string,
      dx: number | BN | string,
      min_dy: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      i: number | BN | string,
      j: number | BN | string,
      dx: number | BN | string,
      min_dy: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  get_dy(
    i: number | BN | string,
    j: number | BN | string,
    dx: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  setRatio: {
    (
      _newRatio: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _newRatio: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _newRatio: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _newRatio: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    coins(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    exchange_underlying: {
      (
        i: number | BN | string,
        j: number | BN | string,
        dx: number | BN | string,
        min_dy: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        i: number | BN | string,
        j: number | BN | string,
        dx: number | BN | string,
        min_dy: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        i: number | BN | string,
        j: number | BN | string,
        dx: number | BN | string,
        min_dy: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        i: number | BN | string,
        j: number | BN | string,
        dx: number | BN | string,
        min_dy: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    get_dy(
      i: number | BN | string,
      j: number | BN | string,
      dx: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    setRatio: {
      (
        _newRatio: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _newRatio: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _newRatio: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _newRatio: number | BN | string,
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