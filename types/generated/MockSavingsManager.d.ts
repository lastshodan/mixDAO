/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface MockSavingsManagerContract
  extends Truffle.Contract<MockSavingsManagerInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<MockSavingsManagerInstance>;
}

type AllEvents = never;

export interface MockSavingsManagerInstance extends Truffle.ContractInstance {
  collectAndDistributeInterest: {
    (arg0: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    collectAndDistributeInterest: {
      (arg0: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(
        arg0: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        arg0: string,
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
