import React, { useEffect, useState } from "react";
import { BsPatchCheck } from "react-icons/bs";
import { editRequest, setLoading, setRequest } from "../../store/requests/actions";
import { verifySignatureAPI } from "../../store/requests/services";
import { getFileLink } from "../../utils/generateImageLink";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Payment from "./Payment";
import { ethers } from "ethers";
import getProvider from "../../utils/etherUtils";
import AgreementContractABI from "../../constants/AgreementABI.json";
import { serverInstance } from "../../utils/serverInstance";

const SignContract = ({ data }) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [signature, setSignature] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [isSigned, setIsSigned] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const dispatch = useDispatch();
  const { loading: EditReqLoading } = useSelector((state) => state.requests);
  const [requestLoading,setRequestLoading] = useState(false);
  const [isProcessed,setIsProcessed] = useState(false);
  const handleFileChange = async (e) => {
    if (e.target.files.length > 0) {
      setUploadLoading(true);
      let link = await getFileLink(e.target.files[0]);
      setUploadLoading(false);
      setSignature(link);
    } else {
      setSignature(null);
    }
  };

  const [signError,setSignError] = useState('');

  // const handleMintNFT = (requestId)=>{
  //   const {provider,signer,address} = await getProvider();
  //   const AgreementContract =
  // }
  console.log(data.lendingInstitute.agreementContractAddress);

  const handleSubmit = async () => {
    setRequestLoading(true);
    setSignError(false);
    try {
        const res = await verifySignatureAPI(signature);
    const confirmation = res.data.isVerified;
    console.log(confirmation);
    if (!confirmation) {
      setSignError('Invalid Sign')
      return toast('Upload a valid signature');
    }
  
    if (confirmation) {
      setIsSigned(true);
      handleMintNFT(data._id);

    } else {
      toast(`Enter a valid signature to proceed.`);
      setRequestLoading(false);
    }
  }catch(err) {
    console.log(err);
    toast(err?.message || 'Something went wrong!');
  }
  };

  useEffect(() => {
    const callFunc = async () => {
      const { provider, address, signer } = await getProvider();
      const AgreementContract = new ethers.Contract(
        data.lendingInstitute.agreementContractAddress,
        AgreementContractABI,
        provider
      );
      AgreementContract.on("NFTMinted", async (tokenId, requestId, sender) => {
        try {
          console.log("MINTED NFT WITH", tokenId, requestId, sender);
          if (sender === address) {
            const tokenURI = await AgreementContract.tokenURI(tokenId);
            console.log(tokenURI, "TOKEN");
            dispatch(
              editRequest(
                data._id,
                {
                  isMinted: true,
                  tokenId: tokenId.toString(),
                  tokenURI: tokenURI,
                  status: "approved",
                },
                () => {toast("Token minted successfully!"); setRequestLoading(false);},
                ()=>{setRequestLoading(false)}
              )
            );
          }
        } catch (err) {
        } finally {
          
        }
      });
    };

    if (!data.isMinted && isRequested && !isProcessed) {
      callFunc();
    }
  }, [data, isRequested,isProcessed]);

  const handleMintNFT = async () => {
    try {
      console.log("fetching nft");
      const { provider, signer, address } = await getProvider();
      const AgreementContract = new ethers.Contract(
        data.lendingInstitute.agreementContractAddress,
        AgreementContractABI,
        signer
      );
      const mintedNFT = await AgreementContract.mintNftWithRequest(
        address,
        data._id,
        data.ipfsURI
      );
      console.log(mintedNFT);
      setIsRequested(true);
    } catch (err) {
      console.log(err);
      toast(err?.response?.data?.message);
    }
  };

  return (
    <>
      <div>
        <div className="border-[1px] bg-green-500 bg-opacity-10 border-green-200 rounded-md flex gap-5  px-5 py-3 items-center">
          <div className="w-[60px] flex items-center justify-center h-[60px] rounded-full bg-green-400">
            <BsPatchCheck size={30} className="text-white" />
          </div>
          <div>
            <div className="text-xl font-[600]">Request Confirmed!</div>
            <div className="text-sm text-gray-600">
              Wohoo! Your resource has been accepted, wait for the signup the
              contract!
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="text-xl font-[600]">Sign Contract</div>
          <div className="text-sm text-gray-500">
            Please read before confirming & upload a digital signature.
          </div>
          <div className="h-[50vh] border-[1px] p-3 text-sm mt-6 overflow-y-auto border-gray-200 rounded-md w-full">
            <p className="font-[600] mb-3">{data?.contract?.title}</p>
            {data?.contract?.terms}
          </div>
          <div className="mt-5 flex justify-between items-center">
            <div className="flex items-center gap-3 relative">
              <input
                onChange={handleFileChange}
                type="file"
                className="absolute top-0 left-0 opacity-0"
              />
              <div className="border-primary border-[1px] rounded-md text-primary px-3 py-1 text-sm font-[600] cursor-pointer">
                Choose File
              </div>
              {signature ? (
                <img
                  src={signature}
                  alt="uploadedSignature"
                  className="h-20 object-cover"
                />
              ) : (
                <div className="text-sm font-[500] text-gray-500">
                  {uploadLoading
                    ? "Uploading..."
                    : "Select a clear signature picture."}
                </div>
              )}
            </div>

            <button
              disabled={requestLoading}
              className="bg-primary disabled:opacity-30 px-5 py-2 rounded-md text-white text-sm font-[500] cursor-pointer"
              onClick={handleSubmit}
            >
              {requestLoading ? "Loading.." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignContract;