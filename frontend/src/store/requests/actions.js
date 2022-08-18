import { toast } from 'react-toastify';
import CONSTANTS from './constants';
import { createRequestAPI, fetchAllRequestsAPI, fetchRequestAPI } from './services';

export const setLoading = (state)=>{
    return {
        type : CONSTANTS.SET_LOADING,
        payload : state
    }
}

export const setRequests = (data)=>{
    return {
        type : CONSTANTS.SET_REQUESTS,
        payload : data
    }
}

export const setRequest = (data)=>{
    return {
        type  :CONSTANTS.SET_REQUEST,
        payload : data
    }
}

export const addRequest = (data)=>{
    return {
        type : CONSTANTS.ADD_REQUEST,
        payload : data
    }
}


export const fetchRequests = (data)=>async(dispatch,getState)=>{
    try {
        dispatch(setLoading(true));
        const result = await fetchAllRequestsAPI();
        let requests = result.data.requests;
        dispatch(setRequests(requests));
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}


export const fetchSingleRequest = (id)=>async(dispatch,getState)=>{
    try {
        dispatch(setLoading(true));
        const result = await fetchRequestAPI(id);
        let request = result.data.request;
        dispatch(setRequest(request));
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}

export const sendRequest = (data)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await createRequestAPI(data);
        let request = result.data.request;
        dispatch(addRequest(request));
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}