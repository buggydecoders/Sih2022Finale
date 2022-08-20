import { serverInstance } from "../../utils/serverInstance"

export const addRequirementAPI = async(data)=>{
    const result = await serverInstance.post('/requirement', data);
    return result;
}

export const deleteRequirementAPI = async(id)=>{
    const result = await serverInstance.delete(`/requirement/${id}`);
    return result;
}

export const updateRequirementAPI = async(id, data)=>{
    const result = await serverInstance.patch(`/requirement/${id}`, data);
    return result;
}

export const fetchRequirementAPI = async(type)=>{
    console.log(type)
    const result = await serverInstance.get(`/requirement?type=${type}`);
    return result;
}