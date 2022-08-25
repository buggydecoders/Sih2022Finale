import React, { useEffect, useState } from 'react'
import Header from '../../components/Admin/Header';
import Sidebar from '../../components/Admin/Sidebar';
import { MdArrowForwardIos } from 'react-icons/md';
import { FaBuilding, FaBox, FaMoneyBillWave, FaBookmark } from 'react-icons/fa';
import LogoImg from '../../assets/DAVV_LOGO.png';
import { MdOutlineTipsAndUpdates, MdTipsAndUpdates } from 'react-icons/md';
import { GoGraph } from 'react-icons/go';
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminInstitutes, fetchAdminRequests, fetchAdminRequirements, fetchAdminStats } from '../../store/adminPanel/actions';
import Loading from '../../components/Loading';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const StatComponent = ({ count, title, icon, navigateTo, activeStatus, setActiveStatus, id }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigateTo && navigate(navigateTo)
    setActiveStatus(id)
  }
  return (
    <div className={activeStatus ? `p-4 w-full flex justify-between rounded-xl items-center cursor-pointer bg-primary text-white` : `p-4 bg-white w-full flex justify-between rounded-xl items-center cursor-pointer`} onClick={handleClick}>
      <div className='flex gap-3 items-center'>
        <div className='h-[50px] w-[50px] bg-primary flex items-center justify-center text-center bg-opacity-30 rounded-xl text-primary'>
          {icon}
        </div>
        <div>
          <div className='font-[600]'>{count}</div>
          <div className='text-sm text-gray-400 font-[500]'>{title}</div>
        </div>
      </div>
      <><MdArrowForwardIos className='text-primary' /></>
    </div>
  )
}

const UpdateCard = () => {
  return (
    <div className='flex font-open w-full items-center gap-2 bg-lightGray py-3 px-2 rounded-md'>
      <div className='w-[40px] shrink-0 h-[40px] bg-primary rounded-md bg-opacity-10'></div>
      <div className='text-sm'>
        <div className=''>Insitute just finished the contract</div>
        <div className='text-xs text-gray-400'>SRM University</div>
      </div>
    </div>
  )
}


const UpdatesComponent = () => {
  return (
    <div className='p-3 bg-white rounded-md w-full'>
      <div className='flex py-2 pb-3 items-center gap-4 border-b-[1px] border-gray-300'>
        <MdOutlineTipsAndUpdates className='text-xl' />
        <div className='text-lg font-[500] hover:text-primary'>Updates</div>
      </div>
      <div className='mt-5 space-y-3 h-[250px] overflow-y-auto'>
        <UpdateCard />
        <UpdateCard />
        <UpdateCard />
        <UpdateCard />
      </div>
    </div>
  )
}

const PortalComponent = () => {
  return (
    <div className='p-3 bg-white rounded-md w-full'>
      <div className='flex py-2 pb-3 items-center gap-4 border-b-[1px] border-gray-300'>
        <GoGraph className='text-xl' />
        <div className='text-lg font-[500] hover:text-primary'>Portal Updates</div>
      </div>
      <div className='mt-5 space-y-3 h-[130px] overflow-y-auto'>
      </div>
    </div>
  )
}

const InsituteCard = ({ institute, key }) => {
  return (
    <div className='flex items-center font-open bg-lightGray p-2 py-3 rounded-md justify-between' key={key}>
      <div className='flex gap-2 items-center'>
        <img src={LogoImg} className='w-[30px] h-[30px] rounded-full'></img>
        <div className='text-sm'>{institute.instituteName}</div>
      </div>
      <div className='grid text-sm grid-cols-3 w-[50%]'>
        <div className=''>{institute.sharedCount}</div>
        <div className=''>{institute.resourceCount}</div>
        <div className=''>{moment(institute.createdAt).format("DD-MM-YYYY")}</div>
      </div>
    </div>
  )
}

const AdminPanel = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAdminStats())
    dispatch(fetchAdminInstitutes())
    dispatch(fetchAdminRequests())
  }, []);

  const { stats, institutes, requests, loading, resources } = useSelector(state => state.admin)
  const [activeStatus, setActiveStatus] = useState(0);

  return (
    <div className='grid grid-cols-[1fr_4fr] min-h-[100vh]'>
      <Sidebar />
      <div className='bg-lightGray'>
        <Header searchFor="dashboard"/>
        <div className='p-8 grid gap-6 grid-cols-[2.1fr_1fr]'>
          <div>
            {
              loading !== "LOADING_STATS" ?
                <div className='grid grid-cols-2 gap-6'>
                  <StatComponent id={0} icon={<FaBuilding size={24} />} activeStatus={activeStatus} setActiveStatus={setActiveStatus} navigateTo="/admin/institutes" title='institutes' count={stats?.institutesCount} />
                  <StatComponent id={1} icon={<FaBox size={22} />} activeStatus={activeStatus} setActiveStatus={setActiveStatus} navigateTo="/admin/resources" title='Resources' count={stats?.resourcesCount} />
                  <StatComponent id={2} icon={<FaBookmark size={22} />} activeStatus={activeStatus} setActiveStatus={setActiveStatus} navigateTo="/admin/requirements" title='Requirements' count={stats?.requirementCount} />
                  <StatComponent id={3} icon={<FaMoneyBillWave size={22} />} activeStatus={activeStatus} setActiveStatus={setActiveStatus} navigateTo="/admin/requests" title='Requests' count={stats?.requestCount} />
                </div>
                : <Loading />
            }
            <div className='mt-6 p-5 pb-2 bg-white rounded-md'>
              <div className='justify-between items-center flex'>
                <div className='text-gray-300 text-sm'>Statistics</div>
                <select className='text-primary font-open'>
                  <option value="">This Month</option>
                  <option value="">This Week</option>
                </select>
              </div>
              <div className='font-[600] text-2xl'>Insitutes' Report</div>
              <div className='w-full mt-5'>
                <input placeholder='Search Insitute' className='py-2 px-5 text-sm w-full bg-lightGray rounded-md' />
              </div>
              <div className='mt-5 flex justify-between items-center'>
                <div className='text-sm font-[600] text-gray-300'>Institute</div>
                <div className='grid text-sm grid-cols-3 w-[50%]'>
                  <div className='text-sm font-[600] text-gray-300'>Shared</div>
                  <div className='text-sm font-[600] text-gray-300'>Uploaded</div>
                  <div className='text-sm font-[600] text-gray-300'>Reg. date</div>
                </div>
              </div>
              <div className='mt-4 space-y-4 h-96 overflow-y-auto' id='institutes'>
                {
                  loading !== "LOADING_INSTITUTES" ?
                    institutes.institutes?.map((institute, idx) => {
                      return <InsituteCard institute={institute} key={idx} />
                    })
                    : <Loading />
                }
              </div>
            </div>
          </div>
          <div className='space-y-6'>
            <UpdatesComponent />
            <PortalComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel