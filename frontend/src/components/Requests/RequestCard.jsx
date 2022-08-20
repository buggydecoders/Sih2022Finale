import React, {useState} from 'react'
import { BiBadgeCheck } from 'react-icons/bi';
import moment from 'moment'
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteRequirement } from '../../store/requirements/actions';
import AddRequestDrawer from './AddRequestDrawer';

const Tag = ({ title }) => {
    return (
        <div className='py-1 px-2 bg-gray-200 text-gray-600 text-sm rounded-md'>{title}</div>
    )
}

const RequestCard = ({ data, id, selected, setSelected }) => {
    const dispatch = useDispatch()
    const isSelected = id === selected;
    const handleDelete = (id) => {
        dispatch(deleteRequirement(id));
    };
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div onClick={() => {setSelected(id); setIsOpen(true)}} className={`${isSelected ? 'shadow-xl scale-[1.03] -translate-x-[10px]' : 'hover:shadow-xl hover:scale-[1.03] hover:-translate-x-[10px]'} bg-white rounded-md w-full py-5 shadow-sm  transition-all cursor-pointer px-4`}>
            <div className='flex items-center gap-2'>
                <MdDelete
                    className="absolute z-10 top-2 right-2 text-2xl cursor-pointer bg-white rounded-full p-1"
                    onClick={() => handleDelete(data._id)}
                />
                <div>
                    <div className={`${isSelected ? 'text-primary' : 'text-black'} font-semibold`}>{data.name}</div>
                    <div className={`${isSelected ? 'text-primary' : 'text-gray-500'} text-sm`}>{data.description}</div>
                </div>
            </div>
            <div className='mt-3 flex gap-2 items-center'>
                {/* <Tag title='Machine'/> */}
                <Tag title={`From: ${data.durationFrom} - To: ${data.durationTo}`} />
            </div>
            <div className='mt-5 flex items-center font-[500] justify-between'>
                <div className='text-gray-500 text-sm'><span className='text-black'>Posted : </span>{moment(data?.updatedAt).fromNow()}</div>
                <div className='flex items-center'>
                    <span className='text-blue-600'><BiBadgeCheck /></span>
                    <div className='text-gray-600 text-sm'>Verified University (4.5)</div>
                </div>
            </div>
            <AddRequestDrawer isEdit={true} data={data} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    )
}

export default RequestCard