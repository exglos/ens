require("@nomicfoundation/hardhat-toolbox")

const dotenv = require('dotenv')
dotenv.config() // make all environment secrets available

const PRIVATE_KEY1 = process.env.PRIVATE_KEY
const PRIVATE_KEY2 = process.env.PRIVATE_KEY2

console.log(PRIVATE_KEY1)

const config = {
  // defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    sepolia: {
      url: 'https://sepolia.infura.io/v3/04c3f6b3201b41ef8a15e7e08a7c730e',
      accounts: [PRIVATE_KEY1]
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/04c3f6b3201b41ef8a15e7e08a7c730e',
      accounts: [PRIVATE_KEY2]
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.4",
      },
    ],
  },

  paths: {
    root: ".",
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
}

module.exports = config