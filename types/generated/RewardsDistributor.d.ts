/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface RewardsDistributorContract
  extends Truffle.Contract<RewardsDistributorInstance> {
  "new"(
    _nexus: string,
    _fundManagers: string[],
    meta?: Truffle.TransactionDetails
  ): Promise<RewardsDistributorInstance>;
}

export interface DistributedReward {
  name: "DistributedReward";
  args: {
    funder: string;
    recipient: string;
    rewardToken: string;
    amount: BN;
    0: string;
    1: string;
    2: string;
    3: BN;
  };
}

export interface RemovedFundManager {
  name: "RemovedFundManager";
  args: {
    _address: string;
    0: string;
  };
}

export interface Whitelisted {
  name: "Whitelisted";
  args: {
    _address: string;
    0: string;
  };
}

type AllEvents = DistributedReward | RemovedFundManager | Whitelisted;

export interface RewardsDistributorInstance extends Truffle.ContractInstance {
  addFundManager: {
    (_address: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _address: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _address: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _address: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  distributeRewards: {
    (
      _recipients: string[],
      _amounts: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _recipients: string[],
      _amounts: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _recipients: string[],
      _amounts: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _recipients: string[],
      _amounts: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  nexus(txDetails?: Truffle.TransactionDetails): Promise<string>;

  removeFundManager: {
    (_address: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _address: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _address: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _address: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  whitelist(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  methods: {
    addFundManager: {
      (_address: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _address: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _address: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _address: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    distributeRewards: {
      (
        _recipients: string[],
        _amounts: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _recipients: string[],
        _amounts: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _recipients: string[],
        _amounts: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _recipients: string[],
        _amounts: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    nexus(txDetails?: Truffle.TransactionDetails): Promise<string>;

    removeFundManager: {
      (_address: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _address: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _address: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _address: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    whitelist(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
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
