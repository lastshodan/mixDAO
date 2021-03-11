/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IDetailedContract extends Truffle.Contract<IDetailedInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<IDetailedInstance>;
}

type AllEvents = never;

export interface IDetailedInstance extends Truffle.ContractInstance {
  decimals(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  name(txDetails?: Truffle.TransactionDetails): Promise<string>;

  symbol(txDetails?: Truffle.TransactionDetails): Promise<string>;

  methods: {
    decimals(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    name(txDetails?: Truffle.TransactionDetails): Promise<string>;

    symbol(txDetails?: Truffle.TransactionDetails): Promise<string>;
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
