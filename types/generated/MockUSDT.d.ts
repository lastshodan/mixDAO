/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface MockUSDTContract extends Truffle.Contract<MockUSDTInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<MockUSDTInstance>;
}

type AllEvents = never;

export interface MockUSDTInstance extends Truffle.ContractInstance {
  setParams: {
    (
      newBasisPoints: number | BN | string,
      newMaxFee: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      newBasisPoints: number | BN | string,
      newMaxFee: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newBasisPoints: number | BN | string,
      newMaxFee: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newBasisPoints: number | BN | string,
      newMaxFee: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    setParams: {
      (
        newBasisPoints: number | BN | string,
        newMaxFee: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        newBasisPoints: number | BN | string,
        newMaxFee: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newBasisPoints: number | BN | string,
        newMaxFee: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newBasisPoints: number | BN | string,
        newMaxFee: number | BN | string,
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
