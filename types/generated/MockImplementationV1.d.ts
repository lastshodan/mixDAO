/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface MockImplementationV1Contract
  extends Truffle.Contract<MockImplementationV1Instance> {
  "new"(
    meta?: Truffle.TransactionDetails
  ): Promise<MockImplementationV1Instance>;
}

type AllEvents = never;

export interface MockImplementationV1Instance extends Truffle.ContractInstance {
  initialize: {
    (_proxyAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _proxyAdmin: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _proxyAdmin: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _proxyAdmin: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  uintVal(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  version(txDetails?: Truffle.TransactionDetails): Promise<string>;

  methods: {
    initialize: {
      (_proxyAdmin: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _proxyAdmin: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _proxyAdmin: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _proxyAdmin: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    uintVal(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    version(txDetails?: Truffle.TransactionDetails): Promise<string>;
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