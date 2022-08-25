import { toast } from "react-toastify"
import { SET_DATA, SET_LOADING } from "./constants"
import { fetchDashboardResourcesAPI, searchDashboardAPI } from "./services"

export const setLoading = (state)=>{
    return {
        type : SET_LOADING,
        payload : state
    }
}

export const setData = (data)=>{
    return {
        type : SET_DATA,
        payload : data
    }
}

export const fetchDashboardResources = (page,limit,university,location,budget,category)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await fetchDashboardResourcesAPI(page,limit,university,location,budget,category);
        dispatch(setData({resources : result.data.resources,totalPages : result.data.totalPages,page : result.data.page,limit : result.data.limit}));
    }catch(err){
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}

export const SearchDashboardResources = (query,page,limit)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await searchDashboardAPI(query,page,limit);
        setData({resources : result.data.resouces,page : result.data.page,totalPages : result.data.totalPages,limit : result.data.limit})
    }catch(err){
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}