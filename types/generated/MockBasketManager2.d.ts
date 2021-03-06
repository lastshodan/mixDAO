/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface MockBasketManager2Contract
  extends Truffle.Contract<MockBasketManager2Instance> {
  "new"(
    _bAsset: string,
    meta?: Truffle.TransactionDetails
  ): Promise<MockBasketManager2Instance>;
}

type AllEvents = never;

export interface MockBasketManager2Instance extends Truffle.ContractInstance {
  prepareForgeBasset: {
    (
      arg0: string,
      arg1: number | BN | string,
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      arg0: string,
      arg1: number | BN | string,
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<
      [
        boolean,
        {
          bAsset: {
            addr: string;
            status: BN;
            isTransferFeeCharged: boolean;
            ratio: BN;
            maxWeight: BN;
            vaultBalance: BN;
          };
          integrator: string;
          index: BN;
        }
      ]
    >;
    sendTransaction(
      arg0: string,
      arg1: number | BN | string,
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      arg0: string,
      arg1: number | BN | string,
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  prepareForgeBassets: {
    (
      arg0: string[],
      arg1: (number | BN | string)[],
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      arg0: string[],
      arg1: (number | BN | string)[],
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{
      isValid: boolean;
      bAssets: {
        addr: string;
        status: BN;
        isTransferFeeCharged: boolean;
        ratio: BN;
        maxWeight: BN;
        vaultBalance: BN;
      }[];
      integrators: string[];
      indexes: BN[];
    }>;
    sendTransaction(
      arg0: string[],
      arg1: (number | BN | string)[],
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      arg0: string[],
      arg1: (number | BN | string)[],
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    prepareForgeBasset: {
      (
        arg0: string,
        arg1: number | BN | string,
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        arg0: string,
        arg1: number | BN | string,
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<
        [
          boolean,
          {
            bAsset: {
              addr: string;
              status: BN;
              isTransferFeeCharged: boolean;
              ratio: BN;
              maxWeight: BN;
              vaultBalance: BN;
            };
            integrator: string;
            index: BN;
          }
        ]
      >;
      sendTransaction(
        arg0: string,
        arg1: number | BN | string,
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        arg0: string,
        arg1: number | BN | string,
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    prepareForgeBassets: {
      (
        arg0: string[],
        arg1: (number | BN | string)[],
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        arg0: string[],
        arg1: (number | BN | string)[],
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<{
        isValid: boolean;
        bAssets: {
          addr: string;
          status: BN;
          isTransferFeeCharged: boolean;
          ratio: BN;
          maxWeight: BN;
          vaultBalance: BN;
        }[];
        integrators: string[];
        indexes: BN[];
      }>;
      sendTransaction(
        arg0: string[],
        arg1: (number | BN | string)[],
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        arg0: string[],
        arg1: (number | BN | string)[],
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
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
