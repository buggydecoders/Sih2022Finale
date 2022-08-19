import { toast } from 'react-toastify';
import CONSTANTS from './constants';
import { createContractAPI, deleteContractAPI, editContractAPI, getContractsAPI, getSingleContractAPI } from './services';


export const setContracts = (data)=>{
    return {
        type : CONSTANTS.SET_CONTRACTS,
        payload : data
    }
}

export const addContract = (data)=>{
    return {
        type : CONSTANTS.ADD_CONTRACT,
        payload : data
    }
}

export const editContractInStore = (updatedData)=>{
    return {
        type : CONSTANTS.EDIT_CONTRACT,
        payload : updatedData
    }
}

export const deleteContractInStore = (id)=>{
    return {
        type : CONSTANTS.DELETE_CONTRACT,
        payload : id
    }
}

export const setLoading = (state)=>{
    return {
        type : CONSTANTS.SET_LOADING,
        payload : state
    }
}

export const setData = (data)=>{
    return {
        type : CONSTANTS.SET_DATA,
        payload : data
    }
}

export const fetchContracts = (page,limit)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await getContractsAPI(page,limit);
        
        dispatch(setData({contracts : result.data.contracts,totalPages : result.data.totalPages,page : result.data.page,limit : result.data.limit}));
    }catch(err){
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));

    }
}

export const getSingleContract = (id)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await getSingleContractAPI(id);
        const {contract} = result.data;
        dispatch(setData({contract}));
    }catch(err){
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));

    }
}

export const createContract = (data)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await createContractAPI(data);
        const {contract} = result.data;
        dispatch(addContract(contract));
    }catch(err){
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));

    }
}

export const editContract = (id,data)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await editContractAPI(id,data);
        const {contract} = result.data;
        dispatch(editContractInStore(contract));
    }catch(err){
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));

    }
}


export const deleteContract = (id)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await deleteContractAPI(id);
        dispatch(deleteContractInStore(id));
    }catch(err){
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));

    }
}