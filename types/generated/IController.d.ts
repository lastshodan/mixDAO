/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IControllerContract
  extends Truffle.Contract<IControllerInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<IControllerInstance>;
}

type AllEvents = never;

export interface IControllerInstance extends Truffle.ContractInstance {
  balanceOf(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

  earn: {
    (
      arg0: string,
      arg1: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      arg0: string,
      arg1: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      arg0: string,
      arg1: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      arg0: string,
      arg1: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  rewards(txDetails?: Truffle.TransactionDetails): Promise<string>;

  strategies(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  vaults(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<string>;

  want(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<string>;

  withdraw: {
    (
      arg0: string,
      arg1: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      arg0: string,
      arg1: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      arg0: string,
      arg1: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      arg0: string,
      arg1: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    balanceOf(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    earn: {
      (
        arg0: string,
        arg1: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        arg0: string,
        arg1: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        arg0: string,
        arg1: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        arg0: string,
        arg1: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    rewards(txDetails?: Truffle.TransactionDetails): Promise<string>;

    strategies(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    vaults(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    want(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<string>;

    withdraw: {
      (
        arg0: string,
        arg1: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        arg0: string,
        arg1: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        arg0: string,
        arg1: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        arg0: string,
        arg1: number | BN | string,
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