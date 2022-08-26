import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/Admin/AdminLayout'
import Loading from '../../components/Loading';
import { Pagination } from "@mui/material";
import { fetchAdminInstitutes, removeUser } from '../../store/adminPanel/actions';

const TableEntry = ({ data, idx }) => {
    const poc = data?.contactPerson
    const dispatch = useDispatch()

    const handleClick = ()=>{
        dispatch(removeUser(data?._id))
    }

    return (
        <tr className="border-b" key={idx}>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <div className="text-black font-semibold">{data?.instituteName}</div>
                </div>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <div className="font-semibold">{poc?.name || "unassigned"}</div>
                <div className="mt-1 text-gray-400 text-sm font-[500]">
                    {poc?.email}
                </div>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <a href={`mailto:${data?.email}`}>{data?.email}</a>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {
                    data?.website ?
                        <a href={data?.website} target="_blank">{data?.website || "unassigned"}</a>
                        : "unassigned"
                }
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <button  className='bg-primary text-white py-2 px-6 rounded-lg' onClick={handleClick}>Deactivate</button>
            </td>
        </tr>
    );
};

function Institutes() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAdminInstitutes())
    }, []);

    const { institutes, loading } = useSelector(state => state.admin)
    const totalPages = institutes.totalPages
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        dispatch(fetchAdminInstitutes(activePage, 10))
    }, [activePage]);

    return (
        <AdminLayout searchFor="institutes">
            <div className="flex flex-col gap-4 w-full h-[560px]  max-w-[1200px] m-auto overflow-scroll">
                <h1 className='text-2xl font-bold w-full text-center mt-4'>Institutes List</h1>
                <table className="">
                    <thead className="border-b">
                        <tr>
                            <th
                                scope="col"
                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                            >
                                Institute Name
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                            >
                                POC Details
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                            >
                                Institute Email
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                            >
                                Institute Website
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                            >
                                Institute Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading !== "LOADING_INSTITUTES" ?
                                institutes.institutes?.map((institute, idx) => {
                                    return <TableEntry data={institute} idx={idx} />
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

export default Institutes