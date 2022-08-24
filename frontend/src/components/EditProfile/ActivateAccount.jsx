import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getProvider from '../../utils/etherUtils';
import {ethers} from 'ethers';
import { getContractAddresses } from '../../constants/contractAddresses';
import InstituteContractABI from '../../constants/InstituteContractABI.json';
import { serverInstance } from '../../utils/serverInstance';
import { toast } from 'react-toastify';
import { logoutUser } from '../../store/auth/actions';

const ActivateAccount = () => {
    const {user} = useSelector(state=>state.auth);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        const callFunc = async()=>{
        const {provider,signer,address} = await getProvider();
        const {chainId} = await provider.getNetwork();
       const InstituteContract = new ethers.Contract(getContractAddresses[chainId],InstituteContractABI,provider);
       InstituteContract.on("InstituteCreated",async(contractAddress)=>{
        const result = await serverInstance.post('/auth/verify-user', {walletAddress : address,agreementContractAddress : contractAddress});
        console.log(result);
        toast('Account activated successfully!, You will be loggedout in 3s');
        setTimeout(()=>{
            dispatch(logoutUser());
        }, 3000)
       })
    }
    if (!user.isVerified) {
    callFunc();
    }


    }, [])
    const handleVerify = async()=>{
        try {
            setLoading(true);
        const {provider,signer} = await getProvider();
        const {chainId} = await provider.getNetwork();
       const InstituteContract = new ethers.Contract(getContractAddresses[chainId],InstituteContractABI,signer);
       const result = await InstituteContract.createInstitute('INS','INS');
       console.log(result);

        }catch(err) {
            console.log(err);

        }
    }

  return (
    <div className='p-5'>
        <div className='text-2xl'>
            {user?.isVerified?<div className='text-green-500'>Account Verified</div>:<div className='text-red-500'>Account not verified</div>}
            {user?.isVerified?<div>
                <div>Wallet Address : {user?.walletAddress}</div>
                <div>Agreement Address : {user?.agreementContractAddress}</div>
            </div>:<div>
             <button onClick={handleVerify}>Verify</button>
            </div>}
        </div>
    </div>
  )
}

export default ActivateAccount