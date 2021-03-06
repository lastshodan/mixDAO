/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IAaveATokenV2Contract
  extends Truffle.Contract<IAaveATokenV2Instance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<IAaveATokenV2Instance>;
}

type AllEvents = never;

export interface IAaveATokenV2Instance extends Truffle.ContractInstance {
  balanceOf(_user: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

  methods: {
    balanceOf(
      _user: string,
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
