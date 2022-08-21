import { serverInstance } from "../../utils/serverInstance"

export const fetchAllRequestsAPI = async (type, page, limit, status, isActive) => {
    const result = await serverInstance.get(`/request?page=${page || 1}&limit=${limit || 10}&type=${type || 'undefined'}&status=${status || 'undefined'}`);
    return result;
}

export const fetchRequestAPI = async (id) => {
    const result = await serverInstance.get(`/request/${id}`);
    return result;
}

export const createRequestAPI = async (data) => {
    const result = await serverInstance.post('/request', data);
    return result;
}

export const checkExistsAPI = async (id) => {
    const result = await serverInstance.get(`/request/exists/${id}`);
    return result;
}

export const updateRequestAPI = async (id, updates) => {
    const result = await serverInstance.patch(`/request/${id}`, updates);
    return result;
}

export const verifySignatureAPI = async (signature) => {
    const result = await serverInstance.post(`/request/verify-signature`, { signature });
    return result;
}