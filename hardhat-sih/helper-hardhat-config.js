const { ethers } = require("hardhat");

const networkConfig = {
    4 : {
        name : "rinkeby",
        vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
        mintFee : ethers.utils.parseEther("0.01"),
        gasLane : "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
        subscriptionId : "9025",
        callbackGasLimit : "500000",
        interval : "30",
        ethUsdPriceFeed : "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"
    },
    80001 : {
        name : "mumbai",
        vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
        mintFee : ethers.utils.parseEther("0.01"),
        gasLane : "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
        subscriptionId : "9025",
        callbackGasLimit : "500000",
        interval : "30",
        ethUsdPriceFeed : "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"
    },
  
    31337 : {
        name : "hardhat",
        mintFee : ethers.utils.parseEther("0.01"),
        gasLane : "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc"
        ,callbackGasLimit : "500000",
        interval : "30"
    },
    1337 : {
        name : "localhost",
        mintFee : ethers.utils.parseEther("0.01"),
        gasLane : "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc"
        ,callbackGasLimit : "500000",
        interval : "30"
    },

}

const DECIMALS="18";
const INITIAL_PRICE=ethers.utils.parseUnits("2000", "ether");


const frontEndContractsFile = "../../nextjs-smartcontract-lottery/constants/contractAddresses.json"
const frontEndAbiFile = "../../nextjs-smartcontract-lottery/constants/abi.json"


const developmentChains = ["hardhat", "localhost"];

module.exports  = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_PRICE,
  
}