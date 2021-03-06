

This repo contains all contracts and tests relevant to the core mixDao protocol. mixDao is a protocol built to make stablecoins easy, robust and profitable.

mixDao's Assets ([mIxs](./contracts/mix/Mix.sol)) are tokens that allow minting and redemption at a 1:1 ratio for underlying Basket Assets (`bAssets`) of the same peg (i.e. USD, BTC, Gold), with composition managed by the [BasketManager](./contracts/mix/BasketManager.sol). `bAssets` are integrated with lending protocols (initially Aave, Compound) to generate interest which is accrued in `mIx` terms. mIxs can be deposited to earn native interest through their respective Savings Contract, just like you would with a savings account. `bAssets` within an `mIx` can also be swapped 1:1 (provided they remain within their [forge validator](./contracts/mix/forge-validator) limits), with a small `swapFee` credited additionally to Savers.

Core mIx contracts utilise OpenZeppelin's [InitializableAdminUpgradeabilityProxy](https://github.com/OpenZeppelin/openzeppelin-sdk/blob/master/packages/lib/contracts/upgradeability/InitializableAdminUpgradeabilityProxy.sol) to facilitate future upgrades, fixes or feature additions. The upgrades are proposed by the mixDao Governors (with current governor address stored in the [Nexus](./contracts/nexus/Nexus.sol) - the system kernel) and executed via the [DelayedProxyAdmin](./contracts/upgradability/DelayedProxyAdmin.sol). Both changes to the `governor`, and contract upgrades have a one week delay built in to execution. This allows mixDao users a one week opt out window if they do not agree with the given change.

mixDao rewards those who contribute to its utility and growth - for more information see [BILD rewards](https://docs.mixDao.org/bild-rewards-1/).


<br />

🏠 https://mixdao.money --coming soon 
<br />

📀 https://app.mixdao.money ---coming soon
<br />

📄 https://docs.mixdao.money ---coming soon



<br />

---

<br />

## Branches

- `master` contains complete, tested and audited contract code, generally on `mainnet`
- `beta` is for the pre-release code, generally on `ropsten`

<br />

## Artifacts

We publish the contract artifacts to an npm package called [@mixDao/protocol](https://www.npmjs.com/package/@mixDao/protocol). You can browse them via [unpkg.com](https://unpkg.com/browse/@mixDao/protocol@latest/).

<br />

## Dev notes

### Prerequisites

* Node.js v10.22.0 (you may wish to use [nvm][1])
* [ganache-cli][2]

### Installing dependencies

```
$ yarn
```

### Running migrations

Deployment scripts are located in `migrations/src`. To run, start `ganache` or `ganache-cli` and run the migration script.

*NB: You should locally use the latest version of `ganache-cli`, as contracts rely on recent opcodes.*
*In case you are using `ganache` GUI you should go to the settings/gear icon -> chain -> update the gas limit property to 8000000*

```
$ ganache-cli -p 7545 -l 8000000
$ yarn compile
$ yarn migrate
```

### Testing

Tests are written in Typescript, using [Typechain](https://github.com/ethereum-ts/TypeChain) to generate typings for all contracts. Tests are executed using `truffle` and `ganache-cli`.

```
$ ganache-cli -p 7545 -l 50000000 --allowUnlimitedContractSize
$ yarn test
```

#### Ganache-fork

mixDao-contracts test suite is built to support execution on a [mainnet fork](https://medium.com/ethereum-grid/forking-ethereum-mainnet-mint-your-own-dai-d8b62a82b3f7) of ganache. This allows tests to be ran using all mainnet dependencies (bAssets, lending protocols). To do this, certain mainnet accounts need to be unlocked to allows tx to be sent from that origin. 

*NB: The following commands assume you have a full Ethereum node running and exposed on local port 1234*

```
$ ganache-cli -f http://localhost:1234 -p 7545 -l 100000000 --allowUnlimitedContractSize --unlock "0x6cC5F688a315f3dC28A7781717a9A798a59fDA7b" --unlock "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE" --unlock "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3"
$ yarn compile
$ truffle test ./test/xxx.spec.tx --network fork
```

#### Suite

Key folders:

- `/contracts/z_mocks`: All mocks used throughout the test suite
- `/security`: Scripts used to run static analysis tools like Slither and Securify
- `/test`: Unit tests in folders corresponding to contracts/xx
- `/test-utils`: Core util files used throughout the test framework
  - `/machines`: Mock contract machines for creating configurable instances of the contracts
- `/types`: TS Types used throughout the suite
  - `/generated`: Output from Typechain; strongly-typed, Truffle-flavoured contract interfaces


#### Coverage

[Solidity-coverage](https://github.com/sc-forks/solidity-coverage) is used to run coverage analysis on test suite.

This produces reports that are visible in the `/coverage` folder, and navigatable/uploadable. Ultimately they are used as a reference that there is some sort of adequate cover, although they will not be a source of truth for a robust test framework. Reports publically available on [coveralls](https://coveralls.io/github/mixDao/mixDao-contracts).

*NB: solidity-coverage runs with solc `optimizer=false` (see [discussion](https://github.com/sc-forks/solidity-coverage/issues/417))*


### Scripts

`script [scriptName] [args]` > Runs custom Truffle scripts

Example usage:

* Mint 100 MIX: `yarn script mint 100`
* Redeem 100 of the MIX basset at index 0 (USDT): `yarn redeem-basset 0 100`
* Deposit 100 mIX into savings: `yarn deposit-savings 100`
* Withdraw 100 mIX from savings: `yarn withdraw-savings 100`
* Travel through time (forwards only, sorry): `yarn script time-travel 1 year`

### CI

Codebase rules are enforced through a passing [CI](https://circleci.com) (visible in `.circleci/config.yml`). These rules are:

- Linting of both the contracts (through Solium) and TS files (ESLint)
- Passing test suite
- Maintaining high unit testing coverage

### Code formatting

- Solidity imports deconstructed as `import { xxx } from "../xxx.sol"`
- Solidity commented as per [NatSpec format](https://solidity.readthedocs.io/en/v0.5.0/layout-of-source-files.html#comments)
- Internal function ordering from high > low order

<br />

[1]: https://github.com/nvm-sh/nvm
[2]: https://github.com/trufflesuite/ganache-cli
