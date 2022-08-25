import { serverInstance } from "../../utils/serverInstance"


export const fetchDashboardResourcesAPI = async(page,limit,budget,university,location,category)=>{
    const result = await serverInstance.get(`/resource/dashboard?page=${page || 1}&limit=${limit || 10}&budget=${budget || ""}&university=${university || ""}&location=${location || ""}&category=${category || ""}`);
    return result;
}

export const updateSavedItemsAPI = async(updatedData)=>{
    const result = await serverInstance.post('/resource/update-saved-items');
    return result;
}

export const addSavedItemAPI = async(id)=>{

    const result = await serverInstance.post(`/resource/save/${id}`);
    return result;
}
export const deleteSavedItemAPI = async(id)=>{
    const result = await serverInstance.delete(`/resource/save/${id}`);
    return result;
}

export const fetchSingleResourceAPI = async(id)=>{
    const result = await serverInstance.get(`/resource/${id}`);
    return result;
}

export const searchResourceAPI = async(name)=>{
    const result = await serverInstance.post(`/resource/search`, {name});
    return result;
}