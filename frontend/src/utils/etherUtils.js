import { ethers } from "ethers"


const getProvider = async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    let address = await signer.getAddress();
    return {provider,signer,address};
}

export default getProvider