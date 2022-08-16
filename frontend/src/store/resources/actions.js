import { addResourceAPI, dashboardResourcesAPI, deleteResourceAPI, deleteSavedResourcesAPI, fetchResourcesAPI, saveForLaterAPI, updateResourceAPI } from "./services";
import CONSTANTS from './constants';
import {toast} from 'react-toastify'
import { fetchSavedResourcesAPI } from "./services";
const setData = (data)=>{
    return {
        type : CONSTANTS.SET_DATA,
        payload : data
    }
}

const deleteSavedItem = (id)=>{
    return {
        type : CONSTANTS.DELETE_SAVED_ITEM,
        payload : id
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


export const saveForLater = (resourceId,successCallback)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await saveForLaterAPI(resourceId);
        console.log(result)
        dispatch(saveResourceInStore(result.data))
        toast(`Resource saved for later!`)
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
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

export const fetchSavedResources = (category,state,page,limit)=>async(dispatch,getState)=>{
    // const {myResources} = getState();
    try {
    dispatch(setLoading(true));
    const result = await fetchSavedResourcesAPI(category,state,page,limit);
    let fetchedData = result.data;
    dispatch(setData({
        savedItems: fetchedData.savedItem.resource
    }));
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    }finally {
        dispatch(setLoading(false));
    }
}

export const deleteSavedResource = (id)=>async(dispatch,getState)=>{
    // const {myResources} = getState();
    try {
    dispatch(setLoading(true));
        await deleteSavedResourcesAPI(id);
        dispatch(deleteSavedItem(id))
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    }finally {
        dispatch(setLoading(false));
    }
}