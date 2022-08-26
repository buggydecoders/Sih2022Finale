import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UNI_LOGO from '../../assets/DAVV_LOGO.png';
import { useNavigate } from 'react-router-dom'
import { data } from 'autoprefixer';
import { AiFillEdit } from 'react-icons/ai';
import { BANNER_FALLBACK_IMG } from '../../utils/fallbackImages';
import { getFileLink } from '../../utils/generateImageLink';
import { updateUser } from '../../store/auth/actions';

const BannerAndProfile = () => {
  const { user } = useSelector(state => state.auth)

  const [uploadLoading, setUploadLoading] = useState(false);
  const [banner, setBanner] = useState(user?.banner || BANNER_FALLBACK_IMG)
  const dispatch = useDispatch();

  const handleChangeBanner = async (e) => {
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      setUploadLoading(true);
      const link = await getFileLink(file);
      const successFallBack = () => {
        setBanner(link);
        setUploadLoading(false);
      }
      const errorFallBack = () => { setUploadLoading(false) }
      dispatch(updateUser({ banner: link }, successFallBack, errorFallBack));

    }

  }

  const navigate = useNavigate();
  return (
    <div className=''>
      <div className='w-full h-[30vh] bg-gray-200 rounded-md relative ' style={{ background: `url(${banner}) center center/cover` }}>
        <div className='flex relative flex-row-reverse gap-3 p-3 text-gray-500 cursor-pointer items-center text-lg font-open'>
          <input
            type="file"
            className='absolute opacity-0 '
            onChange={handleChangeBanner}
            disabled={uploadLoading}
          />
          <button className='flex text-black'>
            <AiFillEdit className='text-black' />
          </button>
          <div className='text-sm'>{uploadLoading ? 'Loading..' : "Recommeded Size : 1400x1600"}</div>
        </div>
        <div onClick={() => navigate('/edit-profile')} className='border-[1px] border-primary text-primary w-fit -bottom-2 translate-y-[100%] px-5 rounded-xl hover:bg-primary hover:text-white duration-300 transition-all ease-in-out cursor-pointer right-0 absolute'>Edit Profile</div>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5 items-center relative -top-[40px] px-3'>
          <img src={user?.logo} className='w-[170px] h-[170px] object-cover border-[5px] border-white rounded-full' />
          <div className='mt-5'>
            <div className='font-[700] text-xl max-w-[620px] break-words'>{user?.instituteName}</div>
            <div className='text-sm text-gray-400'>{user?.address?.city} , {user?.address?.state}</div>
            <div className='text-xs mt-2 text-gray-400'> Joined on : 12 March 2022</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BannerAndProfile