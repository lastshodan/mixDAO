/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface MockBasketManagerContract
  extends Truffle.Contract<MockBasketManagerInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<MockBasketManagerInstance>;
}

export interface BasketStatusChanged {
  name: "BasketStatusChanged";
  args: {};
}

export interface BasketWeightsUpdated {
  name: "BasketWeightsUpdated";
  args: {
    bAssets: string[];
    maxWeights: BN[];
    0: string[];
    1: BN[];
  };
}

export interface BassetAdded {
  name: "BassetAdded";
  args: {
    bAsset: string;
    integrator: string;
    0: string;
    1: string;
  };
}

export interface BassetRemoved {
  name: "BassetRemoved";
  args: {
    bAsset: string;
    0: string;
  };
}

export interface BassetStatusChanged {
  name: "BassetStatusChanged";
  args: {
    bAsset: string;
    status: BN;
    0: string;
    1: BN;
  };
}

export interface BassetsMigrated {
  name: "BassetsMigrated";
  args: {
    bAssets: string[];
    newIntegrator: string;
    0: string[];
    1: string;
  };
}

export interface Paused {
  name: "Paused";
  args: {
    account: string;
    0: string;
  };
}

export interface TransferFeeEnabled {
  name: "TransferFeeEnabled";
  args: {
    bAsset: string;
    enabled: boolean;
    0: string;
    1: boolean;
  };
}

export interface Unpaused {
  name: "Unpaused";
  args: {
    account: string;
    0: string;
  };
}

type AllEvents =
  | BasketStatusChanged
  | BasketWeightsUpdated
  | BassetAdded
  | BassetRemoved
  | BassetStatusChanged
  | BassetsMigrated
  | Paused
  | TransferFeeEnabled
  | Unpaused;

export interface MockBasketManagerInstance extends Truffle.ContractInstance {
  addBasset: {
    (
      _bAsset: string,
      _integration: string,
      _isTransferFeeCharged: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _bAsset: string,
      _integration: string,
      _isTransferFeeCharged: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      _bAsset: string,
      _integration: string,
      _isTransferFeeCharged: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _bAsset: string,
      _integration: string,
      _isTransferFeeCharged: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  basket(
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BN, boolean, boolean, BN]>;

  collectInterest: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<[BN, BN[]]>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  decreaseVaultBalance: {
    (
      _bAssetIndex: number | BN | string,
      arg1: string,
      _decreaseAmount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _bAssetIndex: number | BN | string,
      arg1: string,
      _decreaseAmount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _bAssetIndex: number | BN | string,
      arg1: string,
      _decreaseAmount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _bAssetIndex: number | BN | string,
      arg1: string,
      _decreaseAmount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  decreaseVaultBalances: {
    (
      _bAssetIndices: (number | BN | string)[],
      arg1: string[],
      _decreaseAmount: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _bAssetIndices: (number | BN | string)[],
      arg1: string[],
      _decreaseAmount: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _bAssetIndices: (number | BN | string)[],
      arg1: string[],
      _decreaseAmount: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _bAssetIndices: (number | BN | string)[],
      arg1: string[],
      _decreaseAmount: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  failBasset: {
    (_bAsset: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _bAsset: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _bAsset: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _bAsset: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getBasket(
    txDetails?: Truffle.TransactionDetails
  ): Promise<{
    bassets: {
      addr: string;
      status: BN;
      isTransferFeeCharged: boolean;
      ratio: BN;
      maxWeight: BN;
      vaultBalance: BN;
    }[];
    maxBassets: BN;
    undergoingRecol: boolean;
    failed: boolean;
    collateralisationRatio: BN;
  }>;

  getBasset(
    _bAsset: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{
    addr: string;
    status: BN;
    isTransferFeeCharged: boolean;
    ratio: BN;
    maxWeight: BN;
    vaultBalance: BN;
  }>;

  getBassetIntegrator(
    _bAsset: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  getBassets(
    txDetails?: Truffle.TransactionDetails
  ): Promise<
    [
      {
        addr: string;
        status: BN;
        isTransferFeeCharged: boolean;
        ratio: BN;
        maxWeight: BN;
        vaultBalance: BN;
      }[],
      BN
    ]
  >;

  handlePegLoss: {
    (
      _bAsset: string,
      _belowPeg: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _bAsset: string,
      _belowPeg: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _bAsset: string,
      _belowPeg: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _bAsset: string,
      _belowPeg: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  increaseVaultBalance: {
    (
      _bAssetIndex: number | BN | string,
      arg1: string,
      _increaseAmount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _bAssetIndex: number | BN | string,
      arg1: string,
      _increaseAmount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _bAssetIndex: number | BN | string,
      arg1: string,
      _increaseAmount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _bAssetIndex: number | BN | string,
      arg1: string,
      _increaseAmount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  increaseVaultBalances: {
    (
      _bAssetIndices: (number | BN | string)[],
      arg1: string[],
      _increaseAmount: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _bAssetIndices: (number | BN | string)[],
      arg1: string[],
      _increaseAmount: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _bAssetIndices: (number | BN | string)[],
      arg1: string[],
      _increaseAmount: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _bAssetIndices: (number | BN | string)[],
      arg1: string[],
      _increaseAmount: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  initialize: {
    (
      _nexus: string,
      _mIx: string,
      _bAssets: string[],
      _integrators: string[],
      _weights: (number | BN | string)[],
      _hasTransferFees: boolean[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _nexus: string,
      _mIx: string,
      _bAssets: string[],
      _integrators: string[],
      _weights: (number | BN | string)[],
      _hasTransferFees: boolean[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _nexus: string,
      _mIx: string,
      _bAssets: string[],
      _integrators: string[],
      _weights: (number | BN | string)[],
      _hasTransferFees: boolean[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _nexus: string,
      _mIx: string,
      _bAssets: string[],
      _integrators: string[],
      _weights: (number | BN | string)[],
      _hasTransferFees: boolean[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  integrations(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  mIx(txDetails?: Truffle.TransactionDetails): Promise<string>;

  migrateBassets: {
    (
      _bAssets: string[],
      _newIntegration: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _bAssets: string[],
      _newIntegration: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _bAssets: string[],
      _newIntegration: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _bAssets: string[],
      _newIntegration: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  negateIsolation: {
    (_bAsset: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _bAsset: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _bAsset: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _bAsset: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  nexus(txDetails?: Truffle.TransactionDetails): Promise<string>;

  pause: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  paused(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

  prepareForgeBasset: {
    (
      _bAsset: string,
      arg1: number | BN | string,
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _bAsset: string,
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
      _bAsset: string,
      arg1: number | BN | string,
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _bAsset: string,
      arg1: number | BN | string,
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  prepareForgeBassets: {
    (
      _bAssets: string[],
      arg1: (number | BN | string)[],
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _bAssets: string[],
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
      _bAssets: string[],
      arg1: (number | BN | string)[],
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _bAssets: string[],
      arg1: (number | BN | string)[],
      arg2: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  prepareRedeemBassets(
    _bAssets: string[],
    txDetails?: Truffle.TransactionDetails
  ): Promise<{
    isValid: boolean;
    allBassets: {
      addr: string;
      status: BN;
      isTransferFeeCharged: boolean;
      ratio: BN;
      maxWeight: BN;
      vaultBalance: BN;
    }[];
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

  prepareRedeemMulti(
    txDetails?: Truffle.TransactionDetails
  ): Promise<{
    colRatio: BN;
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

  prepareSwapBassets(
    _input: string,
    _output: string,
    _isMint: boolean,
    txDetails?: Truffle.TransactionDetails
  ): Promise<
    [
      boolean,
      string,
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
      },
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

  removeBasset: {
    (_assetToRemove: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _assetToRemove: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _assetToRemove: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _assetToRemove: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setBasket: {
    (
      failed: boolean,
      colRatio: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      failed: boolean,
      colRatio: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      failed: boolean,
      colRatio: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      failed: boolean,
      colRatio: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setBasketWeights: {
    (
      _bAssets: string[],
      _weights: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _bAssets: string[],
      _weights: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _bAssets: string[],
      _weights: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _bAssets: string[],
      _weights: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setBassetRatio: {
    (
      bAsset: string,
      _newRatio: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      bAsset: string,
      _newRatio: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      bAsset: string,
      _newRatio: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      bAsset: string,
      _newRatio: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setBassetStatus: {
    (
      bAsset: string,
      newStatus: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      bAsset: string,
      newStatus: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      bAsset: string,
      newStatus: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      bAsset: string,
      newStatus: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setRecol: {
    (undergoingRecol: boolean, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      undergoingRecol: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      undergoingRecol: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      undergoingRecol: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setTransferFeesFlag: {
    (
      _bAsset: string,
      _flag: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _bAsset: string,
      _flag: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _bAsset: string,
      _flag: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _bAsset: string,
      _flag: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  unpause: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  methods: {
    addBasset: {
      (
        _bAsset: string,
        _integration: string,
        _isTransferFeeCharged: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _bAsset: string,
        _integration: string,
        _isTransferFeeCharged: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        _bAsset: string,
        _integration: string,
        _isTransferFeeCharged: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _bAsset: string,
        _integration: string,
        _isTransferFeeCharged: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    basket(
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, boolean, boolean, BN]>;

    collectInterest: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<[BN, BN[]]>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    decreaseVaultBalance: {
      (
        _bAssetIndex: number | BN | string,
        arg1: string,
        _decreaseAmount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _bAssetIndex: number | BN | string,
        arg1: string,
        _decreaseAmount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _bAssetIndex: number | BN | string,
        arg1: string,
        _decreaseAmount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _bAssetIndex: number | BN | string,
        arg1: string,
        _decreaseAmount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    decreaseVaultBalances: {
      (
        _bAssetIndices: (number | BN | string)[],
        arg1: string[],
        _decreaseAmount: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _bAssetIndices: (number | BN | string)[],
        arg1: string[],
        _decreaseAmount: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _bAssetIndices: (number | BN | string)[],
        arg1: string[],
        _decreaseAmount: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _bAssetIndices: (number | BN | string)[],
        arg1: string[],
        _decreaseAmount: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    failBasset: {
      (_bAsset: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _bAsset: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _bAsset: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _bAsset: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getBasket(
      txDetails?: Truffle.TransactionDetails
    ): Promise<{
      bassets: {
        addr: string;
        status: BN;
        isTransferFeeCharged: boolean;
        ratio: BN;
        maxWeight: BN;
        vaultBalance: BN;
      }[];
      maxBassets: BN;
      undergoingRecol: boolean;
      failed: boolean;
      collateralisationRatio: BN;
    }>;

    getBasset(
      _bAsset: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{
      addr: string;
      status: BN;
      isTransferFeeCharged: boolean;
      ratio: BN;
      maxWeight: BN;
      vaultBalance: BN;
    }>;

    getBassetIntegrator(
      _bAsset: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getBassets(
      txDetails?: Truffle.TransactionDetails
    ): Promise<
      [
        {
          addr: string;
          status: BN;
          isTransferFeeCharged: boolean;
          ratio: BN;
          maxWeight: BN;
          vaultBalance: BN;
        }[],
        BN
      ]
    >;

    handlePegLoss: {
      (
        _bAsset: string,
        _belowPeg: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _bAsset: string,
        _belowPeg: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<boolean>;
      sendTransaction(
        _bAsset: string,
        _belowPeg: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _bAsset: string,
        _belowPeg: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    increaseVaultBalance: {
      (
        _bAssetIndex: number | BN | string,
        arg1: string,
        _increaseAmount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _bAssetIndex: number | BN | string,
        arg1: string,
        _increaseAmount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _bAssetIndex: number | BN | string,
        arg1: string,
        _increaseAmount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _bAssetIndex: number | BN | string,
        arg1: string,
        _increaseAmount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    increaseVaultBalances: {
      (
        _bAssetIndices: (number | BN | string)[],
        arg1: string[],
        _increaseAmount: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _bAssetIndices: (number | BN | string)[],
        arg1: string[],
        _increaseAmount: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _bAssetIndices: (number | BN | string)[],
        arg1: string[],
        _increaseAmount: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _bAssetIndices: (number | BN | string)[],
        arg1: string[],
        _increaseAmount: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    initialize: {
      (
        _nexus: string,
        _mIx: string,
        _bAssets: string[],
        _integrators: string[],
        _weights: (number | BN | string)[],
        _hasTransferFees: boolean[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _nexus: string,
        _mIx: string,
        _bAssets: string[],
        _integrators: string[],
        _weights: (number | BN | string)[],
        _hasTransferFees: boolean[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _nexus: string,
        _mIx: string,
        _bAssets: string[],
        _integrators: string[],
        _weights: (number | BN | string)[],
        _hasTransferFees: boolean[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _nexus: string,
        _mIx: string,
        _bAssets: string[],
        _integrators: string[],
        _weights: (number | BN | string)[],
        _hasTransferFees: boolean[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    integrations(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    mIx(txDetails?: Truffle.TransactionDetails): Promise<string>;

    migrateBassets: {
      (
        _bAssets: string[],
        _newIntegration: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _bAssets: string[],
        _newIntegration: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _bAssets: string[],
        _newIntegration: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _bAssets: string[],
        _newIntegration: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    negateIsolation: {
      (_bAsset: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _bAsset: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _bAsset: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _bAsset: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    nexus(txDetails?: Truffle.TransactionDetails): Promise<string>;

    pause: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    paused(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

    prepareForgeBasset: {
      (
        _bAsset: string,
        arg1: number | BN | string,
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _bAsset: string,
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
        _bAsset: string,
        arg1: number | BN | string,
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _bAsset: string,
        arg1: number | BN | string,
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    prepareForgeBassets: {
      (
        _bAssets: string[],
        arg1: (number | BN | string)[],
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _bAssets: string[],
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
        _bAssets: string[],
        arg1: (number | BN | string)[],
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _bAssets: string[],
        arg1: (number | BN | string)[],
        arg2: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    prepareRedeemBassets(
      _bAssets: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<{
      isValid: boolean;
      allBassets: {
        addr: string;
        status: BN;
        isTransferFeeCharged: boolean;
        ratio: BN;
        maxWeight: BN;
        vaultBalance: BN;
      }[];
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

    prepareRedeemMulti(
      txDetails?: Truffle.TransactionDetails
    ): Promise<{
      colRatio: BN;
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

    prepareSwapBassets(
      _input: string,
      _output: string,
      _isMint: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<
      [
        boolean,
        string,
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
        },
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

    removeBasset: {
      (_assetToRemove: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _assetToRemove: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _assetToRemove: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _assetToRemove: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setBasket: {
      (
        failed: boolean,
        colRatio: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        failed: boolean,
        colRatio: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        failed: boolean,
        colRatio: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        failed: boolean,
        colRatio: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setBasketWeights: {
      (
        _bAssets: string[],
        _weights: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _bAssets: string[],
        _weights: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _bAssets: string[],
        _weights: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _bAssets: string[],
        _weights: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setBassetRatio: {
      (
        bAsset: string,
        _newRatio: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        bAsset: string,
        _newRatio: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        bAsset: string,
        _newRatio: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        bAsset: string,
        _newRatio: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setBassetStatus: {
      (
        bAsset: string,
        newStatus: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        bAsset: string,
        newStatus: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        bAsset: string,
        newStatus: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        bAsset: string,
        newStatus: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setRecol: {
      (
        undergoingRecol: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        undergoingRecol: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        undergoingRecol: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        undergoingRecol: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setTransferFeesFlag: {
      (
        _bAsset: string,
        _flag: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _bAsset: string,
        _flag: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _bAsset: string,
        _flag: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _bAsset: string,
        _flag: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    unpause: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
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
