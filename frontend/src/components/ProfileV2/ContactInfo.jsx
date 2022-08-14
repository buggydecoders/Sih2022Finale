import React from 'react'
import POC from '../../assets/POC/VJ.png';
const ContactInfo = () => {
  return (
    <div className='p-5 font-open'>
        <div className=' flex justify-between'>
            <div className='text-gray-600 text-2xl font-[600]'>Contact Information</div>
            <button className='border-b-primary border-b-[2px] text-primary'>Send Message</button>
        </div>
        <div className='mt-5 font-open space-y-5'>
            <div className='py-2 flex items-center gap-5 border-b-[1px] border-b-gray-300'>
                <span className='font-semibold text-gray-400'>Phone : </span>
                <div>+91 7039900010</div>
            </div>
            <div className='py-2 flex items-center gap-5 border-b-[1px] border-b-gray-300'>
                <span className='font-semibold text-gray-400'>Email : </span>
                <div>ietdaavv@edu.in</div>
            </div>
            <div className='py-2 flex items-center gap-5 border-b-[1px] border-b-gray-300'>
                <span className='font-semibold text-gray-400'>Website : </span>
                <div>www.ietdavv.edu.in</div>
            </div>
        </div>
        <div className='mt-8'>
            <div className='text-lg font-semibold text-gray-600'>Person of Contact</div>
            <div className='flex items-center justify-between mt-5 gap-5'>
                <div className='flex items-center gap-5'>
                <div className=''><img src={POC} className='w-[130px] rounded-full' alt="" /></div>
                <div>
                    <div className='font-[500] text-xl trakcin text-gray-600'>Vaibhav Jain</div>
                    <div className='text-sm text-gray-400'>Faculty of DBMS</div>
                </div>
                </div>
                <div className='flex gap-6 items-start'>
                    <div className=' text-gray-500 border-b-primary border-b-[1px]'>vjain@gmail.com</div>
                    <div className=' text-gray-500 border-b-primary border-b-[1px]'>+91 7049930190</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactInfo