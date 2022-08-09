import React from 'react'
import ResourceImg from '../../assets/Resources/3dPrinter.png'
const TableEntry = ()=>{
    return (
        <tr class="border-b">
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <div className='flex items-center gap-2'>
                    <img alt="" src={ResourceImg} className='w-[80px] rounded-xl'/>
                    <div className='text-black font-semibold'>Lathe Machine</div>
                  </div>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                 <div className='font-semibold'>Institute of Information Technology</div>
                 <div className='mt-1 text-gray-400 text-sm font-[500]'>Indore,India</div>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                 Accepted
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                 12 March
                </td>
              </tr>
    )
}

const StatusTable = () => {
  return (
    <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="border-b">
              <tr>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Resource
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Institute
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Status
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
            <TableEntry/>
                <TableEntry/>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default StatusTable