require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()


/** @type import('hardhat/config').HardhatUserConfig */


const RINKBY_RPC_URL = process.env.RINKBY_RPC_URL || "https://eth-rinkbey"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xKey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Key"
const COINMARKETCAP_API_KEY=process.env.COINMARKETCAP_API_KEY || "Key";
const MUMBAI_RPC_URL=process.env.MUMBAI_RPC_URL || "KEY"



module.exports = {
  solidity: {
    compilers: [
        {
            version: "0.8.8",
        },
        {
            version: "0.6.6",
        },
    ],
},
  defaultNetwork : "hardhat",
  networks : {
    hardhat : {
      chainId : 31337,
      blockConfirmations : 1,
    },
    rinkeby : {
      url : RINKBY_RPC_URL,
      accounts : [PRIVATE_KEY],
      chainId : 4,
      blockConfirmations : 6
    },
    mumbai : {
      url : MUMBAI_RPC_URL,
      accounts : [PRIVATE_KEY],
      chainId : 80001,
      blockConfirmations : 6
    },
    localhost : {
      url : 'HTTP://127.0.0.1:7545',
      //accounts are placed by hardhat
      chainId : 1337
    }
  },
  etherscan : {
    apiKey : ETHERSCAN_API_KEY
  },
  gasReporter : {
    enabled : false,
    outputFile : 'gas-report.txt',
    noColors : true,
    currency : 'INR',
    coinmarketcap : COINMARKETCAP_API_KEY,
    token : "MATIC" //for polygon
  },
  namedAccounts : {
    deployer : {
      default : 0
    },
    customer : {
      default : 1
    }
  },
  mocha:{
    timeout : 200000 //200 seconds max
  }
};
