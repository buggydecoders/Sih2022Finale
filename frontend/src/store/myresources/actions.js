import { addResourceAPI, fetchResourcesAPI } from "./services";
import CONSTANTS from './constants';
import {toast} from 'react-toastify'
const setData = (data)=>{
    return {
        type : CONSTANTS.SET_DATA,
        payload : data
    }
}

const setLoading = (state)=>{
    return {
        type : CONSTANTS.SET_LOADING,
        payload : state
    }
}

const addResourceInStore = (data)=>{
    return {
        type : CONSTANTS.ADD_RESOURCE,
        payload : data
    }
}
const editResourceInStore = (updatedData)=>{
    return {
        type : CONSTANTS.EDIT_RESOURCE,
        payload : updatedData
    }
}

const deleteResourceInStore = (resourceId)=>{
    return {
        type : CONSTANTS.DELETE_RESOURCE,
        payload :resourceId
    }
}

export const fetchAllResources = (category,state,page,limit)=>async(dispatch,getState)=>{
    // const {myResources} = getState();
    try {
    dispatch(setLoading(true));
    const result = await fetchResourcesAPI(category,state,page,limit);
    let fetchedData = result.data;
    dispatch(setData({
        list : fetchedData.resources,
        totalPages : fetchedData.totalPages,
        page : fetchedData.page,
        limit : fetchedData.limit,
        category : fetchedData.category,
        state : fetchedData.state
    }));
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    }finally {
        dispatch(setLoading(false));
    }
    
}

export const AddResource = (data,successCallback)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await addResourceAPI(data);
        const addedResource= result.data.resource;
        toast('Resource added successfully!✅');
        dispatch(addResourceInStore(addedResource));
        successCallback&&successCallback(addedResource);

    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    }finally{
        dispatch(setLoading(false));

    }
}
