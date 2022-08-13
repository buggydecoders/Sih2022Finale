import { serverInstance } from "../../utils/serverInstance"

export const signupUserAPI = async(data)=>{
    const result = await serverInstance.post('/auth/createUser', data);
    return result;
}

export const loginUserAPI = async(data)=>{
    const result = await serverInstance.post('/auth/login', data);
    return result
}