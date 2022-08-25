import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminRequirements } from '../../store/adminPanel/actions';
import Loading from '../Loading';
import AdminLayout from './AdminLayout';
import RequirementCard from './RequirementCard';
import RequirementDetails from './RequirementDetails';

function Requirements() {
    const { requirements, loading } = useSelector(state => state.admin)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAdminRequirements())
    }, []);

    const [selected, setSelected] = useState(0);
    const reqs = requirements?.requirements

    return (
        <AdminLayout>
            {
                loading !== "LOADING_REQUIREMENTS" ?
                    <div className='mt-2 p-3 max-h-[600px] overflow-y-scroll'>
                        <div className='bg-white rounded-md p-6 pb-3'>
                            <div className='text-xl font-semibold'>Requirements</div>
                            <div className='w-full mt-4 text-sm'><input placeholder='Search Requirement' className='text-sm outline-none py-2 border-b-[1px] w-full' /></div>
                            <div className="flex gap-8 overflow-x-auto overflow-y-hidden">
                                {

                                    reqs?.map((req, idx) => {
                                        return <RequirementCard data={req} id={idx} selected={selected} setSelected={setSelected} />
                                    })
                                }
                            </div>
                            {reqs && <RequirementDetails data={reqs[selected]} />}
                        </div>
                    </div>
                    : <Loading />
            }
        </AdminLayout>
    )
}

export default Requirements