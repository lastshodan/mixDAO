/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IOneSplitContract extends Truffle.Contract<IOneSplitInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<IOneSplitInstance>;
}

type AllEvents = never;

export interface IOneSplitInstance extends Truffle.ContractInstance {
  swap: {
    (
      fromToken: string,
      toToken: string,
      amount: number | BN | string,
      minReturn: number | BN | string,
      distribution: (number | BN | string)[],
      flags: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      fromToken: string,
      toToken: string,
      amount: number | BN | string,
      minReturn: number | BN | string,
      distribution: (number | BN | string)[],
      flags: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      fromToken: string,
      toToken: string,
      amount: number | BN | string,
      minReturn: number | BN | string,
      distribution: (number | BN | string)[],
      flags: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      fromToken: string,
      toToken: string,
      amount: number | BN | string,
      minReturn: number | BN | string,
      distribution: (number | BN | string)[],
      flags: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    swap: {
      (
        fromToken: string,
        toToken: string,
        amount: number | BN | string,
        minReturn: number | BN | string,
        distribution: (number | BN | string)[],
        flags: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        fromToken: string,
        toToken: string,
        amount: number | BN | string,
        minReturn: number | BN | string,
        distribution: (number | BN | string)[],
        flags: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        fromToken: string,
        toToken: string,
        amount: number | BN | string,
        minReturn: number | BN | string,
        distribution: (number | BN | string)[],
        flags: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        fromToken: string,
        toToken: string,
        amount: number | BN | string,
        minReturn: number | BN | string,
        distribution: (number | BN | string)[],
        flags: number | BN | string,
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
