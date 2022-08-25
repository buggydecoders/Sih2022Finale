//SPDX-License-Identifier: MIT



pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
error Agreement__alreadyExists();
error Agreement__orderNotFound();
error Agreement__AlreadyIssuedNFT();
error Agreement__UpkeepNotNeeded();

contract AgreementNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    struct NftTokenData {
        uint256 tokenId;
        string tokenURI;
        uint256 timeStamp;
    }

    event NFTMinted(uint256 indexed tokenId, uint256 indexed orderId,address indexed sender);

    //every institute is has a unique minter;
    address private immutable i_instituteId;

    constructor(
        address instituteId,
        string memory NFTName,
        string memory NFTSymbol
    ) ERC721(NFTName, NFTSymbol) {
        i_instituteId = instituteId;
    }

    function isExistsInArray(uint256[] memory array, uint256 key)
        internal
        pure
        returns (bool)
    {
        for (uint256 i = 0; i < array.length; ++i) {
            if (array[i] == key) {
                return true;
            }
        }
        return false;
    }

    //mapping of request to customer request array;
    mapping(address => uint256[]) private aspirantsToAgreements;

    //mapping for NFT Data;
    mapping(uint256 => NftTokenData) public NftTokenToData;

    //aspirantAddressToNFTTokens;
    mapping(address=>uint256[]) aspirantsToTokens;

    //see if some order already has issed warranty NFT;
    mapping(uint256 => uint256) private issuedNFT;

    function mintNftWithRequest(address aspirantInstitute,uint256 requestId, string memory activeTokenURI) public {
        bool isOrderExists = isExistsInArray(
            aspirantsToAgreements[aspirantInstitute],
            requestId
        );
        if (isOrderExists) {
            revert Agreement__alreadyExists();
        }
        aspirantsToAgreements[aspirantInstitute].push(requestId);
        if (issuedNFT[requestId] != 0) {
            revert Agreement__AlreadyIssuedNFT();
        }
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(aspirantInstitute, newItemId);
        NftTokenToData[newItemId] = NftTokenData({
            tokenId: newItemId,
            tokenURI: activeTokenURI,
            timeStamp: block.timestamp
          
        });
        issuedNFT[requestId] = newItemId;
        aspirantsToTokens[aspirantInstitute].push(newItemId);
        emit NFTMinted(newItemId, requestId,address(msg.sender));
    }

    function getAspirantAgreements() public view returns(uint256[] memory){
        return aspirantsToAgreements[msg.sender];
    }
    
 

   function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        NftTokenData memory currentData = NftTokenToData[tokenId];
        return currentData.tokenURI;
   }



 

    function getAspirantTokens() public view returns(string[] memory){
        uint256[] memory customerNFTTokens = aspirantsToTokens[msg.sender];
        string[] memory tokenURIs = new string[](customerNFTTokens.length);
        for(uint256 i=0; i<customerNFTTokens.length; ++i) {
            tokenURIs[i] = tokenURI(customerNFTTokens[i]);
        }
        return tokenURIs;
    }

    function getTokenDetailsFromRequestId(uint256 requestId) public view returns(uint256) {
        if (issuedNFT[requestId] == 0) {
            revert Agreement__orderNotFound();
        }
        uint256 tokenId = issuedNFT[requestId];
        return tokenId;
    }

   

    modifier onlyAspirant() {
        require(
            aspirantsToAgreements[msg.sender].length > 0,
            "Not Allowed, You are not customer"
        );
        _;
    }
}
