import { serverInstance } from "../../utils/serverInstance"

export const addRequirementAPI = async(data)=>{
    const result = await serverInstance.post('/requirement', data);
    return result;
}

export const fetchRequirementAPI = async(type)=>{
    const result = await serverInstance.get(`/requirement?type=${type}`);
    return result;
}