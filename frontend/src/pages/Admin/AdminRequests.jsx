import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/Admin/AdminLayout'
import Loading from '../../components/Loading';
import { fetchAdminRequests } from '../../store/adminPanel/actions';
import moment from 'moment'

const TableEntry = ({ data, idx }) => {
  console.log(data)
  return (
      <tr className="border-b" key={idx}>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                  <div className="text-black font-semibold">{data?.lendingInstitute?.instituteName}</div>
              </div>
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                  <div className="text-black font-semibold">{data?.aspirantInstitute?.instituteName}</div>
              </div>
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4">
              <div className="font-semibold">Tocken ID: {data?.tokenId || "unassigned"}</div>
              <div className="mt-1 text-gray-400 text-sm font-[500]">
                  Token URI: {data?.tokenURI}
              </div>
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {moment(data?.createdAt).format("DD-MM-YYYY")}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <div className="font-semibold">From: {data?.startDate || "unassigned"}</div>
              <div className="font-semibold">To: {data?.endDate || "unassigned"}</div>
          </td>
      </tr>
  );
};

function AdminRequests() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAdminRequests())
  }, []);

  const { requests, loading } = useSelector(state => state.admin)
  const totalPages = requests.totalPages
  const [activePage, setActivePage] = useState(1);

  console.log(requests)

  useEffect(() => {
    fetchAdminRequests(activePage, 10);
  }, [activePage]);

  return (
    <AdminLayout searchFor="requests">
      <div className="flex flex-col gap-4 w-full h-[560px] max-w-[1200px] m-auto overflow-scroll">
        <h1 className='text-2xl font-bold w-full text-center mt-4'>Requests List</h1>
        <table className="">
          <thead className="border-b whitespace-nowrap">
            <tr>
              <th
                scope="col"
                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
              >
                Lending Institute Name
              </th>
              <th
                scope="col"
                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
              >
                Aspirent Institute Name
              </th>
              <th
                scope="col"
                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
              >
                Token Details 
              </th>
              <th
                scope="col"
                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
              >
                Created At
              </th>
              <th
                scope="col"
                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
              >
                Duration
              </th>
            </tr>
          </thead>
          <tbody>
            {
              loading !== "LOADIN_INSTITUTE" ?
                requests.requests?.map((request, idx) => {
                  return <TableEntry data={request} idx={idx} />
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

export default AdminRequests