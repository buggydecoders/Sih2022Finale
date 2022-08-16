import { serverInstance } from "../../utils/serverInstance"


export const dashboardResourcesAPI = async(category,state,page,limit)=>{
    const result = await serverInstance.get(`/resource/dashboard`);
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