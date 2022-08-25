const {network} = require('hardhat');
const { developmentChains } = require('../helper-hardhat-config');
const { verify } = require('../utils/verify');

module.exports = async function({getNamedAccounts,deployments}) {
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId;
    const args = [];
    console.log('deploying...');
    console.log(`Deployed by : ${deployer}`);
    const sellerContract = await deploy("Institute",{
        from : deployer,
        args,
        log : true,
        waitConfirmations : network.config.blockConfirmations || 1,
    });

    log("-----------------------------");
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log('Verifying....');
        await verify(sellerContract.address,args);  
    }
    log("----------------------");

}

