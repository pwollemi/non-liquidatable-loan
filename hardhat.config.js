require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
const dotEnvConfig = require("dotenv").config;

dotEnvConfig();

const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const ROPSTEN_PRIVATE_KEY =
  process.env.ROPSTEN_PRIVATE_KEY ||
  "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"; // well known private key
const { ETHERSCAN_API_KEY } = process.env;

module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hecoTestnet: {
      url: "https://http-testnet.hecochain.com",
      network_id: "256",
      accounts: [process.env.ACCOUNT]
    },
  },
  etherscan: {
    apiKey: ""
  },
  hecoinfo: {
    apiKey: ""
  }
};
