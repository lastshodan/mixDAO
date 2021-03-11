/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface InitializableModuleContract
  extends Truffle.Contract<InitializableModuleInstance> {
  "new"(
    meta?: Truffle.TransactionDetails
  ): Promise<InitializableModuleInstance>;
}

type AllEvents = never;

export interface InitializableModuleInstance extends Truffle.ContractInstance {
  nexus(txDetails?: Truffle.TransactionDetails): Promise<string>;

  methods: {
    nexus(txDetails?: Truffle.TransactionDetails): Promise<string>;
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