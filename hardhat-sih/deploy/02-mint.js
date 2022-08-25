const { network, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

const metaDataTemplate = {
    name : "",
    description : "",
    image : "",
    attributes : [{
        trait_type : "Cuteness",
        value : 100,
    }]
}


module.exports = async({getNamedAccounts,deployments})=>{
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId;
    const {log} = deployments;

    let tokenUris = [
        'ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4',
        'ipfs://QmcAYTohjhLJqrPjtasn6EbGDiYGPck1MGcFb5iL9ppnpQ',
        'ipfs://QmbvRqKSQxmNEHRY9o8Tzwvf1BoQb433kfkr5SLpKDgyiz'
    ]


    const instituteContract = await ethers.getContract("Institute", deployer);
    console.log(`Institute contract created with address ${instituteContract.address}`)
    const sellerTxt = await instituteContract.createInstitute("Ins", "INS", {gasLimit : "5000000"});
    

    let contractAddress = '';
    const instituteAgreementContractAddress = await instituteContract.getAgreementContract({gasLimit : "5000000"});
    await new Promise((resolve,reject)=>{
        setTimeout(resolve, 600000) // 5 minute timeout time

        instituteContract.once('InstituteCreated', async(e)=>{
            // console.log(instituteAgreementContractAddress);
            contractAddress = e;
         
            console.log(e, 'Contract');
            console.log('Institute Created!');
            resolve();
        })
    })
   
    const instituteAgreementContract = await ethers.getContractAt("AgreementNFT", contractAddress,deployer);


    //buy deployer



    const mintTx = await instituteAgreementContract.mintNftWithRequest(deployer,'123',tokenUris[0]);
    await new Promise((resolve,reject)=>{
        setTimeout(resolve, 600000) // 5 minute timeout time
        instituteAgreementContract.once('NFTMinted', (e)=>{
            console.log(e);
            console.log('NFT Created');
            console.log('NFT CREATED!!');
            resolve();
        })
    })
    if (developmentChains.includes(network.name)) {
    const txReciept = await mintTx.wait(1);
    const tokenId = await txReciept.events[1].args.tokenId;
    console.log(`Token Id For NFT is ${tokenId}`);
    }

}

