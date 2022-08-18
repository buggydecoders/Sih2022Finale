import { serverInstance } from "../../utils/serverInstance"

export const fetchAllRequestsAPI = async()=>{
    const result = await serverInstance.get('/request');
    return result;
}

export const fetchRequestAPI = async(id)=>{
    const result = await serverInstance.get(`/request/${id}`);
    return result;
}

export const createRequestAPI = async(data)=>{
    const result = await serverInstance.post('/request',data);
    return result;
}

