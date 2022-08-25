const PinataSDK = require('@pinata/sdk');

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataApiSecret =process.env.PINATA_API_SECRET;
const pinata = PinataSDK(pinataApiKey,pinataApiSecret);


async function storeTokenUriMetaData(metaData) {
    try {
        const response = await pinata.pinJSONToIPFS(metaData);
        return response;
    }catch(err) {
        console.log(err);
    }
    return null;
}

module.exports = {storeTokenUriMetaData}