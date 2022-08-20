import React, { useEffect } from 'react'

import FileIcon from '../../assets/icons/file.svg';
import ContractEditor from '../ContractEditor/ContractEditor';
import {useDispatch, useSelector} from 'react-redux';
import { fetchContracts } from '../../store/contracts/actions';

const ContractCard = ({data})=>{
  return (
    <div className='px-5 py-4 rounded-md w-full shadow-sm border-[1px] border-gray-200 flex gap-5 bg-gray-100 items-center'>
      <div><img src={FileIcon} className='w-[40px]'/></div>
      <div className=''>
        <div className='font-[700] underline'>Physical resource terms</div>
        <div className='font-open mt-1 text-sm text-gray-500'>February 6, 2022 · 45 Signs</div>
      </div>
    </div>
  )
}

const AddContract = () => {
  const dispatch = useDispatch();
  const {loading : contractLoading,contracts} = useSelector(state=>state.contracts)
  useEffect(()=>{
    dispatch(fetchContracts(1,10));
  }, [])
  return (
    <div>
        <div className='text-2xl font-semibold'>Add Contract</div>
        <div className='text-sm text-gray-500 mt-2 font-[500] w-[70%]'>Add your terms for the use of the resource fairly. If someone doesnt obey the contract guideliesn report at : ugccomplaint@edu.in</div>
        <div className='grid mt-10 grid-cols-[1fr_2fr] gap-7'>
            <div className='w-full space-y-3'>
                {contractLoading?<div>Loading...</div>:contracts?.length===0?<div>No Contracts were found, Please create one</div>:contracts?.map(c=><ContractCard data={c}/>)}
            </div>
            <div className='w-full h-full'>
              <ContractEditor/>
            </div>
        </div>
        <div className='mt-7 flex justify-end'>
          <div className='flex gap-5 items-center'>
            <button className='px-5 py-2 bg-secondary text-white rounded-md'>Save & Send Contract</button>
            <button className='px-5 py-2 border-secondary border-[1px]  text-secondary font-[600] rounded-md'>Send Contract</button>
          </div>
        </div>
    </div>
  )
}

export default AddContract