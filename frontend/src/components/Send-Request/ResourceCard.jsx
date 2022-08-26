import React from 'react'
import ResourceImg from '../../assets/Resources/3dPrinter.png';
import {BsChevronDown} from 'react-icons/bs';
import { RESOURCE_FALLBACK_IMG } from '../../utils/fallbackImages';
const ResourceCard = ({data}) => {
  return (
    <div className='w-full bg-white px-3 py-4 rounded-xl'>
        <div className='w-full flex gap-2 p-2 rounded-xl border-[1px] border-gray-300'>
            <img src={data?.images?.length>0?data?.images[0]?.url:RESOURCE_FALLBACK_IMG} className='w-[100px] h-fit rounded-xl'/>
            <div className=''>
                <div className='font-bold text-base mt-1'>{data?.name}</div>
                <div className='text-xs text-primary  font-[600]'>{data?.instituteId?.instituteName}</div>
                <div className='mt-3 text-sm'>
                    <div className='font-open'>
                        <div className='text-gray-600 text-xs'>Available duration</div>
                        <div className='font-semibold mt-1 text-xs text-black'>{data?.durationFrom} | {data?.durationTo}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='mt-6 relative'>
            <div className='text-lg font-semibold'>Description</div>
            <div className='text-gray-400 text-xs'>{data?.description}</div>
            <div className='h-[70px] w-full bottom-0  left-0 bg-[#ffffff85] from-[#ffffff3c] via-[#ffffff3c] bg-gradient-to-t absolute'></div>
        </div>
        <div className='mt-5 flex justify-center text-sm'>
            <div className='w-fit text-center border-primary rounded-md items-center border-[1px] px-3 py-1 text-primary font-[500] cursor-pointer flex gap-3'>Read More<BsChevronDown/></div>
        </div>
    </div>
  )
}

export default ResourceCard