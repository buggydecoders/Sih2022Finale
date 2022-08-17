import React from 'react'
import ResourceImg from '../../assets/Resources/3dPrinter.png';
import {BsChevronDown} from 'react-icons/bs';
import { RESOURCE_FALLBACK_IMG } from '../../utils/fallbackImages';
const ResourceCard = () => {
  return (
    <div className='w-full bg-white px-3 py-4 rounded-xl'>
        <div className='w-full flex gap-2 p-2 rounded-xl border-[1px] border-gray-300'>
            <img src={ResourceImg || RESOURCE_FALLBACK_IMG} className='w-[100px] h-fit rounded-xl'/>
            <div className=''>
                <div className='font-bold text-base mt-1'>3D Printer Model Generation with ok</div>
                <div className='text-xs text-primary  font-[600]'>Insitute of Enginering, DAVV</div>

                <div className='mt-3 text-sm grid grid-cols-4'>
                    <div className=''>
                        <div className='text-gray-600'>Feature 1</div>
                        <div className='font-semibold text-black'>Sol</div>
                    </div>
                    <div className=''>
                        <div className='text-gray-600'>Feature 1</div>
                        <div className='font-semibold text-black'>Sol</div>
                    </div>
                    <div className=''>
                        <div className='text-gray-600'>Feature 1</div>
                        <div className='font-semibold text-black'>Sol</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='mt-6 relative'>
            <div className='text-lg font-semibold'>Description</div>
            <div className='text-gray-400 text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil esse reprehenderit culpa, soluta itaque illo, repudiandae odio debitis iure commodi incidunt excepturi ea expedita accusamus aperiam tenetur nostrum, necessitatibus numquam totam! Delectus, perferendis modi laudantium unde obcaecati quibusdam quo mollitia distinctio. Aut atque minus debitis aperiam assumenda? Numquam praesentium, animi fuga modi exercitationem minima. Et nisi tempore voluptatem magni soluta.</div>
            <div className='h-[70px] w-full bottom-0  left-0 bg-[#ffffff85] from-[#ffffff3c] via-[#ffffff3c] bg-gradient-to-t absolute'></div>
        </div>
        <div className='mt-5 flex justify-center text-sm'>
            <div className='w-fit text-center border-primary rounded-md items-center border-[1px] px-3 py-1 text-primary font-[500] cursor-pointer flex gap-3'>Read More<BsChevronDown/></div>
        </div>
    </div>
  )
}

export default ResourceCard