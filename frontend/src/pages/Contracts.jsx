import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {MdArrowForwardIos} from 'react-icons/md';
import { Pagination } from "@mui/material";
import Input from "../components/Input";
import {BsPlusCircle} from 'react-icons/bs';
import InputField from "../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { createContract, editContract, fetchContracts } from "../store/contracts/actions";

const ContractCard = ({data,selected,setSelected})=>{
    const isSelected = selected._id===data._id
    return (
        <div onClick={()=>setSelected(data)} className={`${isSelected?'bg-secondary bg-opacity-5':'bg-white'} font-open hover:bg-secondary hover:bg-opacity-5 hover:shadow-md tansition-all flex justify-between items-center  px-5 py-4`}>
            <div>
            <div className="text-sm text-gray-500">{data.createdAt}</div>
            <div className="text-lg mt-1">{data.title}</div>
            </div>
            <div className="text-gray-500"><MdArrowForwardIos size={20}/></div>
        </div>
    )
}


const ContractInput = ({data})=>{
    const {loading} = useSelector(state=>state.contracts);

    const [form,setForm] = useState({
        title : data?.title || '',
        terms : data?.terms
    })
    const dispatch = useDispatch();
    const handleChange = (e)=>setForm(prev=>({...prev,[e.target.name] : e.target.value}));
    const handleSubmit = ()=>{
        if (data) {
            console.log('Adding...');
            dispatch(editContract(data._id,{title : form.title,terms : form.terms}));

        }else {
            console.log('Adding...');
            dispatch(createContract({title : form.title,terms : form.terms}));

        }
    }
    return (
        <div className="space-y-5">
        <InputField name='title' onChange={handleChange} value={form.title} label='Title'/>
        <InputField name='terms' onChange={handleChange} value={form.terms} label='Terms & conditions' area={true} rows={12}/>
        <div className="pt-5 flex justify-end gap-6 items-center font-open">
           {data&&<button className="py-2 px-3 bg-primary border-primary border-[1px]  text-white rounded-md">Delete</button>}
            <button disabled={loading==='SAVE'} className="border-[1px] py-2 px-3 rounded-md text-primary font-semibold border-primary" onClick={handleSubmit}>{loading==='SAVE'?'Loading...':'Submit'}</button>
        </div>
    </div>
    ) 
}

const Contracts = () => {
    const dispatch  = useDispatch();
    const [selected,setSelected] = useState();
    const {loading,contracts} = useSelector(state=>state.contracts);
    useEffect(()=>{
        dispatch(fetchContracts(1,10));
    }, [])
    console.log(contracts,loading);
  return (
    <Layout>
      <div className="py-8 px-12">
        <div className="flex justify-between gap-5">
          <div>
            <div className="text-3xl font-[600]">Manage Contracts</div>
            <div className="text-gray-500 text-sm mt-2 font-open">
              Create, delete & update contracts which will be in the contracts.
            </div>
          </div>
          <div className="px-3 py-2 hover:bg-primary hover:text-white cursor-pointer transition-all text-primary font-[500] h-fit border-primary text-sm border-[2px] rounded-md">
            Add Contract
          </div>
        </div>
        <div className="grid grid-cols-[1fr_3fr] gap-4 mt-7">
            <div className="bg-lightGray rounded-sm w-full p-3 space-y-6">
                <div className="border-[2px] w-full text-center py-5 border-dashed justify-center items-center hover:shadow-md border-gray-400 flex gap-4"><BsPlusCircle/>Add</div>
                {contracts?.length>0?<div className="">Loading..</div>:<>
                {contracts?.map(c=><ContractCard data={c} selected={selected} setSelected={setSelected}/>)}
                </>}
                <div className="flex justify-center w-full items-center">
                <Pagination page={1} count={1}/>
                </div>
            </div>
           <ContractInput data={selected}/>
        </div>
      </div>
    </Layout>
  );
};

export default Contracts;
