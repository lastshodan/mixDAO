/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface InitializableModuleKeysContract
  extends Truffle.Contract<InitializableModuleKeysInstance> {
  "new"(
    meta?: Truffle.TransactionDetails
  ): Promise<InitializableModuleKeysInstance>;
}

type AllEvents = never;

export interface InitializableModuleKeysInstance
  extends Truffle.ContractInstance {
  c_0x9202734b(
    c__0x9202734b: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<void>;

  methods: {
    c_0x9202734b(
      c__0x9202734b: string,
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
