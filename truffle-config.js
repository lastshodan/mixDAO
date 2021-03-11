require('ts-node/register');
// OPTIONAL: Allows the use of tsconfig path mappings with ts-node
require('tsconfig-paths/register');
require("dotenv").config();

const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!

  migrations_directory: './migrations',
  contracts_build_directory: './build/contracts',
  plugins: ['solidity-coverage', 'truffle-plugin-verify'],
  api_keys: {
    etherscan: ''
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
      gas: 8000000
    },
    fork: {
      host: '127.0.0.1',
      port: 8545,//7545
      network_id: '*', // Match any network id
      gas: 8000000
    },
    coverage: {
      host: "127.0.0.1",
      port: 7546,
      network_id: "*",
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01      // <-- Use this low gas price
    },
    ropsten: {
      provider() {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.ROPSTEN_INFURA, 0, 3)
      },
      network_id: 3,
      gasPrice: 100000000001, // 100 GWei,
      skipDryRun: true,
      gas: 8000000
    },
    rinkeby: {
      provider() {
        return new HDWalletProvider(process.env.RINKEBY_MNEMONIC, process.env.RINKEBY_INFURA, 0, 4)
      },
      network_id: 4,
      gasPrice: 100000000001, // 100 GWei,
      skipDryRun: true,
      gas: 8000000
    },
    kovan: {
      provider() {
        return new HDWalletProvider("", "https://kovan.infura.io/v3/", 0, 3)
      },
      network_id: 42,
      gasPrice: 50000000000, // 20 GWei,
      skipDryRun: true,
      gas: 8000000
    },
    goerli: {
      provider() {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.goerli_infura, 0, 5)
      },
      network_id: 5,
      gasPrice: 60000000000, // 60 GWei,
      skipDryRun: true,
      gas: 8000000
      },
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD'
    }
  },
  compilers: {
    solc: {
      version: '0.5.16',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
}
