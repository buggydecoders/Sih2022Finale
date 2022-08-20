import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchRequierements } from '../../store/requirements/actions';

const FilterItem = ({ title, selected, setSelected, setType, type }) => {
    const isSelected = title === selected;
    return (
        <div onClick={() => {setSelected(title); setType(type)}} className={`${isSelected ? 'bg-secondary   rounded-md text-white' : 'font-semibold text-gray-600'} w-full text-center py-3`}>{title}</div>
    )
}

const FilterBar = () => {
    const dispatch = useDispatch()
    const [type, setType] = useState("");
    useEffect(() => {
        dispatch(fetchRequierements(type))
    }, [type]);

    const [selected, setSelected] = useState('Best Matches');
    return (
        <div className='w-full'>
            <div className='bg-white grid grid-cols-3  items-center shadow-md cursor-pointer'>
                <FilterItem selected={selected} setSelected={setSelected} setType={setType} type="" title='Best Matches' />
                <FilterItem selected={selected} setSelected={setSelected} setType={setType} type="featured" title='Featured' />
                <FilterItem selected={selected} setSelected={setSelected} setType={setType} type="myrequest" title='My Requests'/>
            </div>
        </div>
    )
}

export default FilterBar