import { toast } from 'react-toastify';
import CONSTANTS from './constants';
import { checkExistsAPI, createRequestAPI, fetchAllRequestsAPI, fetchRequestAPI, updateRequestAPI } from './services';

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

export const editRequestInStore = (id,data)=>{
    return {
        type : CONSTANTS.EDIT_REQUEST,
        payload : {id,data}
    }
}

export const addRequest = (data)=>{
    return {
        type : CONSTANTS.ADD_REQUEST,
        payload : data
    }
}

export const setIsExists = (state)=>{
    return {
        type : CONSTANTS.SET_IS_EXISTS,
        payload : state
    }
}

export const setData = (data)=>{
    return {
        type : CONSTANTS.SET_DATA,
        payload : data
    }
}


export const checkRequestExists = (id,existCallback, notExistsCallBack)=>async(dispatch,getState)=>{
    try {
        dispatch(setLoading('CHECK_REQ'));
        const result = await checkExistsAPI(id);
        let fetchedData = result.data;
        dispatch(setIsExists(fetchedData.status));
        if (fetchedData.status) {
        existCallback&&existCallback(fetchedData);
        }else {
            notExistsCallBack&&notExistsCallBack();
        }
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}


export const fetchRequests = (type,page,limit,status,isActive)=>async(dispatch)=>{
    try {
        dispatch(setLoading('FETCH_REQUESTS'));
        const result = await fetchAllRequestsAPI(type,page,limit,status,isActive);
        dispatch(setData(result.data));
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
        dispatch(setData({requests : []}));
    }finally{
        dispatch(setLoading(false));
    }
}


export const fetchSingleRequest = (id,successCallback,errorCallback)=>async(dispatch,getState)=>{
    try {
        dispatch(setLoading('FETCH_SINGLE_REQ'));
        const result = await fetchRequestAPI(id);
        let request = result.data.request;
        dispatch(setRequest(request));
        successCallback&&successCallback(result.data);
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
        errorCallback&&errorCallback(err);
    }finally{
        dispatch(setLoading(false));
    }
}
//id , {status : 'confimred'}
export const editRequest = (id,data,successCallback,errorCallback)=>async(dispatch,getState)=>{
    try{
        dispatch(setLoading('EDIT_REQ'));
        const result = await updateRequestAPI(id,data);
        dispatch(editRequestInStore(id,result.data.updatedRequest));
        successCallback&&successCallback(result.data.updatedRequest);
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
        errorCallback&&errorCallback(err);
    }finally{
        dispatch(setLoading(false));
    }
}

export const sendRequest = (data,successCallback,errorCallback)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await createRequestAPI(data);
        let request = result.data.request;
        dispatch(addRequest(request));
        successCallback&&successCallback(result.data);
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
        errorCallback&&errorCallback()
    }finally{
        dispatch(setLoading(false));
    }
}
