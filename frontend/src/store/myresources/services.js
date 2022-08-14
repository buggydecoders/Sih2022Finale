import { serverInstance } from "../../utils/serverInstance"

export const fetchResourcesAPI = async(category,state,page,limit)=>{
    const result = await serverInstance.get(`/resource?category=${category || ''}&state=${state || ''}&page=${page || 1}&limit=${limit || 10}`);
    return result;
}

export const addResourceAPI = async(resourceData)=>{
    const result = await serverInstance.post('/resource', resourceData);
    return result;
}

export const deleteResourceAPI =async (resourceId)=>{
    const result = await serverInstance.delete(`/resource/${resourceId}`);
    return result;
}

export const updateResourceAPI = async(resourceId,updates)=>{
    const result = await serverInstance.patch(`/resource/${resourceId}`, updates);
    return result;
}