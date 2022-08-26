import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/Admin/AdminLayout'
import Loading from '../../components/Loading';
import { Pagination } from "@mui/material";
import { fetchAdminResources } from '../../store/adminPanel/actions';
import { TbDiscount2 } from 'react-icons/tb'
import DiscountModal from '../../components/Admin/DiscountModal';

const TableEntry = ({ data, idx }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    return (
        <>
            <tr className="border-b" key={idx}>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        <div className="text-black font-semibold">{data?.name}</div>
                    </div>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold">{data?.durationFrom}</div>
                    <div className="font-semibold">{data?.durationTo}</div>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold">{data?.instituteId.instituteName || "unassigned"}</div>
                    <div className="mt-1 text-gray-400 text-sm font-[500]">
                        {data?.instituteId.email || "email"}
                    </div>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ₹{data?.price}
                </td>
                <td className="text-sm font-medium text-green-500 px-6 py-4 whitespace-nowrap">
                    {data?.state}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button className='bg-primary space-x-2 flex items-center justify-center text-white py-2 px-6 rounded-lg' type='button' onClick={handleOpen}><span>Add Discount</span> <TbDiscount2 /></button>
                </td>
            </tr>
            <DiscountModal open={open} setOpen={setOpen} data={data}/>
        </>
    );
};

function AdminResources() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAdminResources())
    }, []);

    const { resources, loading } = useSelector(state => state.admin)
    const [activePage, setActivePage] = useState(1);
    const totalPages = resources.totalPages

    useEffect(() => {
        fetchAdminResources(activePage, 10);
    }, [activePage]);

    return (
        <AdminLayout searchFor="resources">
            <div className="flex flex-col gap-4 w-full h-[560px]  max-w-[1200px] m-auto overflow-scroll">
                <h1 className='text-2xl font-bold w-full text-center mt-4'>Resources List</h1>
                <table className="">
                    <thead className="border-b">
                        <tr>
                            <th
                                scope="col"
                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                            >
                                Resource Name
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                            >
                                Duration
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                            >
                                Institute Details
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                            >
                                Price
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                            >
                                Discounts
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading !== "LOADIN_INSTITUTE" ?
                                resources.resources?.map((resource, idx) => {
                                    return <TableEntry data={resource} idx={idx} />
                                })
                                : <Loading />
                        }
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center w-full">
                <Pagination
                    page={activePage}
                    count={totalPages}
                    onChange={(e, value) => setActivePage(value)}
                />
            </div>
        </AdminLayout>
    )
}

export default AdminResources