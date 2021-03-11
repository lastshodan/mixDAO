/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface ILendingPoolAddressesProviderV1Contract
  extends Truffle.Contract<ILendingPoolAddressesProviderV1Instance> {
  "new"(
    meta?: Truffle.TransactionDetails
  ): Promise<ILendingPoolAddressesProviderV1Instance>;
}

type AllEvents = never;

export interface ILendingPoolAddressesProviderV1Instance
  extends Truffle.ContractInstance {
  getLendingPool(txDetails?: Truffle.TransactionDetails): Promise<string>;

  getLendingPoolCore(txDetails?: Truffle.TransactionDetails): Promise<string>;

  methods: {
    getLendingPool(txDetails?: Truffle.TransactionDetails): Promise<string>;

    getLendingPoolCore(txDetails?: Truffle.TransactionDetails): Promise<string>;
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
