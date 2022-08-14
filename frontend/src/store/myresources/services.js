import { serverInstance } from "../../utils/serverInstance"

export const fetchResourcesAPI = async(category,type,page,limit)=>{
    const result = await serverInstance.get(`/resource?category=${category || ''}&type=${type || ''}&page=${page || 1}&limit=${limit || 10}`);
    return result;
}

export const addResourceAPI = (resourceData)=>{
    const result = await serverInstance.post('/resource', resourceData);
    return result;
}

export const deleteResourceAPI = (resourceId)=>{
    const result = await serverInstance.delete(`/resource/${resourceId}`);
    return result;
}

export const updateResourceAPI = (resourceId,updates)=>{
    const result = await serverInstance.patch(`/resource/${resourceId}`, updates);
    return result;
}