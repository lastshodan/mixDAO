/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IBasicTokenContract
  extends Truffle.Contract<IBasicTokenInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<IBasicTokenInstance>;
}

type AllEvents = never;

export interface IBasicTokenInstance extends Truffle.ContractInstance {
  decimals(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  methods: {
    decimals(txDetails?: Truffle.TransactionDetails): Promise<BN>;
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
