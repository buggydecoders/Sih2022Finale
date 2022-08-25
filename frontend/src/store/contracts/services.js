import { serverInstance } from "../../utils/serverInstance"

export const createContractAPI = async(data)=>{
    const result = await serverInstance.post('/contract', data);
    return result;
}

export const getContractsAPI = async(page,limit)=>{
    const result = await serverInstance.get(`/contract?page=${page || 1}&limit=${limit || 10}`);
    return result;
  
}

export const getSingleContractAPI = async(id)=>{
    const result = await serverInstance.get(`/contracts/${id}`);
    return result;
}

export const editContractAPI = async(id,data)=>{
    const result = await serverInstance.patch(`/contract/${id}`, data);
    return result;
}

export const deleteContractAPI = async(id)=>{
    const result = await serverInstance.delete(`/contract/${id}`);
    return result;
}