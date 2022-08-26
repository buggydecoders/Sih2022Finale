
import { serverInstance } from "../../utils/serverInstance"

export const fetchDashboardResourcesAPI = async(page,limit,university,location,budget,category)=>{
    const result = await serverInstance.get(`/resource/dashboard?page=${page || 1}&limit=${limit || 10}&university=${university || ''}&location=${location || ''}&budget=${budget || ''}&category=${category || ''}`)
    return result;
}

export const searchDashboardAPI = async(query,page,limit)=>{
    const resources = await serverInstance.get(`/resource/search?key=${query}&page=${page || 1}&limit=${limit || 10}`, {name : query});
    return resources;
}