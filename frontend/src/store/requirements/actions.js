import { toast } from 'react-toastify';
import CONSTANTS from './constants';
import { addRequirementAPI, fetchRequirementAPI} from './services';

export const setRequierement = (state)=>{
    return {
        type : CONSTANTS.SET_REQUIEREMENTS,
        payload : state
    }
}

export const setLoading = (state)=>{
    return {
        type : CONSTANTS.SET_LOADING,
        payload : state
    }
}

export const addRequierement = (data)=>{
    return {
        type : CONSTANTS.ADD_REQUIEREMENTS,
        payload : data
    }
}

export const sendRequierement = (data,successCallback,errorCallback)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await addRequirementAPI(data);
        let requierement = result.data.request;
        dispatch(addRequierement(requierement));
        successCallback&&successCallback(result.data);
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
        errorCallback&&errorCallback()
    }finally{
        dispatch(setLoading(false));
    }
}

export const fetchRequierements = (type,successCallback,errorCallback)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await fetchRequirementAPI(type);
        console.log(result)
        // let {requierement} = result.data;
        // dispatch(setRequierement(requierement));
        // successCallback&&successCallback(result.data);
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
        errorCallback&&errorCallback()
    }finally{
        dispatch(setLoading(false));
    }
}
