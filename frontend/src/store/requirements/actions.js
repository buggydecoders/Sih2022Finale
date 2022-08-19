import { toast } from 'react-toastify';
import CONSTANTS from './constants';
import { addRequirementAPI, fetchRequirementAPI} from './services';

export const setRequirement = (state)=>{
    return {
        type : CONSTANTS.SET_REQUIREMENTS,
        payload : state
    }
}

export const setLoading = (state)=>{
    return {
        type : CONSTANTS.SET_LOADING,
        payload : state
    }
}

export const addRequirement = (data)=>{
    console.log(data)
    return {
        type : CONSTANTS.ADD_REQUIREMENTS,
        payload : data
    }
}

export const sendRequierement = (data,successCallback,errorCallback)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await addRequirementAPI(data);
        let {requirement }= result.data;
        dispatch(addRequirement(requirement));
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
        let {requirement} = result.data;
        dispatch(setRequirement(requirement));
        successCallback&&successCallback(result.data);
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
        errorCallback&&errorCallback()
    }finally{
        dispatch(setLoading(false));
    }
}
