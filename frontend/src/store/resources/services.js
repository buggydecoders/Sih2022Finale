import { serverInstance } from "../../utils/serverInstance"

export const saveForLaterAPI = async({id})=>{
    const result = await serverInstance.post(`/resource/save-resource/${id}`);
    return result;
}

export const dashboardResourcesAPI = async(category,state,page,limit)=>{
    const result = await serverInstance.get(`/resource/dashboard`);
    return result;
}

export const fetchSavedResourcesAPI = async(category,state,page,limit)=>{
    const result = await serverInstance.get(`/resource/save-resource`);
    return result;
}

export const deleteSavedResourcesAPI = async(id)=>{
    const result = await serverInstance.delete(`/resource/save-resource/${id}`);
    return result;
}