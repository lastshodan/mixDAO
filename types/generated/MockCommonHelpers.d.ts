/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface MockCommonHelpersContract
  extends Truffle.Contract<MockCommonHelpersInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<MockCommonHelpersInstance>;
}

type AllEvents = never;

export interface MockCommonHelpersInstance extends Truffle.ContractInstance {
  getDecimals(
    _token: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  methods: {
    getDecimals(
      _token: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
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
