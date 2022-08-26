import { serverInstance } from "../../utils/serverInstance"

// stats
// institute
// requirement
// request
// resource

export const fetchAdminStatsAPI = async (page, limit) => {
    const result = await serverInstance.get(`/admin/stats?page=${page || 1}&limit=${limit || 10}`);
    return result;
}

export const fetchAdminInstituteAPI = async (page, limit) => {
    const result = await serverInstance.get(`/admin/institutes?page=${page || 1}&limit=${limit || 10}`);
    return result;
}

export const fetchAdminRequirementAPI = async (page, limit) => {
    const result = await serverInstance.get(`/admin/requirement?page=${page || 1}&limit=${limit || 10}`);
    return result;
}

export const fetchAdminRequestAPI = async (page, limit) => {
    const result = await serverInstance.get(`/admin/request?page=${page || 1}&limit=${limit || 10}`);
    return result;
}

export const fetchAdminResourceAPI = async (page, limit) => {
    const result = await serverInstance.get(`/admin/resource?page=${page || 1}&limit=${limit || 10}`);
    return result;
}

export const addDiscountAPI = async (data) => {
    const result = await serverInstance.post(`/admin/coupon`, data);
    return result;
}