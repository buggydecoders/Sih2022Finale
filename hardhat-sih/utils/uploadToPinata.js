const pinataSDK = require('@pinata/sdk');
const path = require("path");
const fs = require('fs');
require('dotenv').config();

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataApiSecret =process.env.PINATA_API_SECRET;
const pinata = pinataSDK(pinataApiKey,pinataApiSecret);

async function storeImages(imagesFilePath) {
    const fullImagesPath = path.resolve(imagesFilePath);
    const files = fs.readdirSync(fullImagesPath);
    console.log(files);
    let responses = []
    console.log('Uploading to ipfs...')
    for(let fileIndex in files) {
        console.log(`Working on ${files[fileIndex]}`)
        const readableStreamForFile = fs.createReadStream(`${fullImagesPath}/${files[fileIndex]}`)
        try {
            const response = await pinata.pinFileToIPFS(readableStreamForFile)//pinata stuff
            responses.push(response);
            
        }catch(err){
            console.log(err);
        }
        console.log(`Uploaded ${files[fileIndex]}`)
    }

    return {responses,files}
}

async function storeTokenUriMetaData(metaData) {
    try {
        const response = await pinata.pinJSONToIPFS(metaData);
        return response;
    }catch(err) {
        console.log(err);
    }
    return null;
}

module.exports = {storeImages, storeTokenUriMetaData}