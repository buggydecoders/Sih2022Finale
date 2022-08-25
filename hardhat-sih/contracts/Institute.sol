//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./AgreementNFT.sol";

error Institute_InstituteAlreadyExists();
error Institute_InstituteDoesntExists();

library Library {
  struct data {
    AgreementNFT AgreementContract;
    bool isValue;
  }
}

contract Institute {
  using Library for Library.data;
  mapping(address => Library.data) public institutes;

  event InstituteCreated(address indexed warrantyContractAddress,address indexed sender);
  

  function createInstitute(string memory NFTName, string memory NFTSymbol)
    public
    returns (AgreementNFT)
  {
    // if (sellers[msg.sender].isValue) {
    //     revert Institute_InstituteAlreadyExists();
    // }

    AgreementNFT newContract = new AgreementNFT(msg.sender, NFTName, NFTSymbol);
    institutes[msg.sender].AgreementContract = newContract;
    institutes[msg.sender].isValue = true;
    emit InstituteCreated(address(newContract), address(msg.sender));
    return institutes[msg.sender].AgreementContract;
  }

  function getAgreementContract() public view returns (AgreementNFT) {
    // if (!sellers[address(msg.sender)].isValue) {
    //     revert Institute_InstituteDoesntExists();
    // }
    return institutes[msg.sender].AgreementContract;
  }

  // function mintWarrantyContract(address warrantyContractAddress,address seller, uint256 orderId, string memory tokenURI, string memory expireTokenURI, string memory expiryDate) public returns(uint256) {
  //     require(!sellers[seller].isValue,"Seller was not found!");
  //     console.log(address(sellers[seller].WarrantyContract));
  //     AgreementNFT fetchedWarrantyContract = AgreementNFT(warrantyContractAddress);
  //     uint256 tokenId = fetchedWarrantyContract.mintAgreementNFT(address(msg.sender),orderId,tokenURI,expireTokenURI,expiryDate);
  //     return tokenId;
  // }

  // function placeOrder(address warrantyContractAddress,uint256 orderId) public {
  //     AgreementNFT fetchedWarrantyContract = AgreementNFT(address(warrantyContractAddress));
  //     fetchedWarrantyContract.placeOrder(address(msg.sender),orderId);
  // }
}
