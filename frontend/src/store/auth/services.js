import { serverInstance } from "../../utils/serverInstance"

export const signupUserAPI = async(data)=>{
    const result = await serverInstance.post('/auth/create-user', data);
    return result;
}

export const loginUserAPI = async(data)=>{
    const result = await serverInstance.post('/auth/login', data);
    return result
}

export const editUserAPI = async(data)=>{
    const result = await serverInstance.patch('/auth/update-user', data);
    return result;
}

export const getUserAPI = async()=>{
    const result = await serverInstance.get('/auth/get-user');
    return result;
}

export const logoutUserAPI = async()=>{
    const result = await serverInstance.get('/auth/logout');
    return result;
}