import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "tsconfig-paths"

import * as dotenv from "dotenv"

dotenv.config() // make all environment secrets available 
const PRIVATE_KEY1 = process.env.PRIVATE_KEY
console.log(PRIVATE_KEY1)


export const config: HardhatUserConfig = {
  // defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
    }
    // rinkeby: {
    //   url: 'https://rinkeby.infura.io/v3/45d19d0de4b5421da4fec7e90dff071d',
    //   accounts: [PRIVATE_KEY1]
    // }
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    root: '.',
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}