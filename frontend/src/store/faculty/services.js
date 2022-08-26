import { serverInstance } from "../../utils/serverInstance"

export const signupUserAPI = async(data)=>{
    const result = await serverInstance.post('/faculty/signup', data);
    return result;
}

export const loginUserAPI = async(data)=>{
    const result = await serverInstance.post('/faculty/login', data);
    return result;
}