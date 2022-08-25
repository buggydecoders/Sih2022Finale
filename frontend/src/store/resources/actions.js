import { addResourceAPI, addSavedItemAPI, dashboardResourcesAPI, deleteResourceAPI,  deleteSavedItemAPI,  fetchDashboardResourcesAPI,  fetchResourcesAPI, fetchSingleResourceAPI, searchResourceAPI, updateResourceAPI } from "./services";
import CONSTANTS from './constants';
import {toast} from 'react-toastify'
import { fetchSavedResourcesAPI } from "./services";
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

export const setResource = (data)=>{
    return {
        type : CONSTANTS.SET_RESOURCE,
        payload : data
    }
}

export const setSearchReslts = (data)=>{
    return {
        type : CONSTANTS.SEARCH_RESOURCE,
        payload : data
    }
}




export const fetchDashboardResources = (page,limit,budget,university,location,category)=>async(dispatch,getState)=>{
    try {
        dispatch(setLoading("FETCH"));
        const result = await fetchDashboardResourcesAPI(page,limit,budget,university,location,category)
        let fetchedData = result.data;
        console.log(fetchedData,'FETCHED DATA IN REDUX')
        dispatch(setData({
            list : fetchedData.resources,
            page : fetchedData.page,
            limit : fetchedData.limit,
            totalPages : fetchedData.totalPages
        }));
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}

export const fetchSingleResource = (id,successCallback,errorCallback)=>async(dispatch)=>{
    try {
        dispatch(setLoading("FETCH-RESOURCE"));
        const result = await fetchSingleResourceAPI(id);
        let fetchedData = result.data.resource;
        dispatch(setResource(fetchedData));
        successCallback&&successCallback(fetchedData);
    }catch(err) {
        console.log(err);
        errorCallback&&errorCallback(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}

export const setSavedItems = (data)=>{
    return {
        type : CONSTANTS.SET_SAVED_ITEM,
        payload : data
    }
}

export const addSavedItemInStore = (data)=>{
    return {
        type : CONSTANTS.ADD_SAVED_ITEM,
        payload : data
    }
}
export const deleteSavedItemInStore = (data)=>{
    return {
        type : CONSTANTS.DELETE_SAVED_ITEM,
        payload : data
    }
}
export const addSavedItem = (id,callback)=>async(dispatch,getState)=>{
    try {
        dispatch(setLoading(`SAVE-${id}`))
        const result = await addSavedItemAPI(id);
        if (result.data.status) {
        dispatch(addSavedItemInStore(result.data.resource));
        callback&&callback();
        }
    }catch(err){
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong');
    }finally{
        dispatch(setLoading(false));
    }
}

export const deleteSavedItem = (id,callback)=>async(dispatch,getState)=>{
    try {
        dispatch(setLoading(`SAVE-${id}`))
        const result = await deleteSavedItemAPI(id);
        if (result.data.status) {
        dispatch(deleteSavedItemInStore(id));
        callback&&callback();
        }
    }catch(err){
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong');
    }finally{
        dispatch(setLoading(false));
    }
}

export const searchResource = (name,successCallback,errorCallback)=>async(dispatch)=>{
    try {
        dispatch(setLoading("SEARCH-RESOURCE"));
        const result = await searchResourceAPI(name);
        dispatch(setSearchReslts(result.data.resources));
        successCallback&&successCallback();
    }catch(err) {
        console.log(err);
        errorCallback&&errorCallback(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}