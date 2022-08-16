import { addResourceAPI, addSavedItemAPI, dashboardResourcesAPI, deleteResourceAPI,  deleteSavedItemAPI,  fetchResourcesAPI, updateResourceAPI } from "./services";
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

const saveResourceInStore = (data)=>{
    return {
        type : CONSTANTS.SAVE_RESOURCE_FOR_LATER,
        payload :data
    }
}




export const fetchDashboardResources = (category,state,page,limit)=>async(dispatch,getState)=>{
    // const {myResources} = getState();
    try {
    dispatch(setLoading(true));
    const result = await dashboardResourcesAPI(category,state,page,limit);
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
        dispatch(setLoading('SAVE-ITEM'))
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
        dispatch(setLoading('SAVE-ITEM'))
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