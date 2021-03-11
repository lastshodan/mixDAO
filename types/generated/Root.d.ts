/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface RootContract extends Truffle.Contract<RootInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<RootInstance>;
}

type AllEvents = never;

export interface RootInstance extends Truffle.ContractInstance {
  c_0x0f1a3df4(
    c__0x0f1a3df4: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<void>;

  methods: {
    c_0x0f1a3df4(
      c__0x0f1a3df4: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
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
