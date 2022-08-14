import CONSTANTS from "./constants"
import { editUserAPI, getUserAPI, loginUserAPI, signupUserAPI } from "./services"


export const setAuthLoading = (state)=>{
    return {
        type : CONSTANTS.SET_LOADING,
        payload : state
    }
}

export const setUser = (data)=>{
    return {
        type : CONSTANTS.SET_USER,
        payload : data
    }
}

export const setAuth = (data)=>{
    return {
        type : CONSTANTS.SET_AUTH,
        payload : data
    }
}

export const signupUser = (data,callback,errorCallback)=>async(dispatch,getState)=>{
    try {
        dispatch(setAuthLoading(true));
        const result = await signupUserAPI(data);
        callback&&callback(result.data);

    }catch(err){
        console.log(err);
        errorCallback&&errorCallback(err?.response?.data?.message || 'Something went wrong!')
    }finally{
        dispatch(setAuthLoading(false));

    }
}

export const loginUser = (data,callback,errorCallback)=>async(dispatch)=>{
    try {
        dispatch(setAuthLoading(true));
        const result = await loginUserAPI(data);
        dispatch(setUser(result.data.user));
        callback&&callback(result.data);

    }catch(err) {
        console.log(err);
        errorCallback&&errorCallback(err?.response?.data?.message || 'Something went wrong!')
    }finally{
        dispatch(setAuthLoading(false));
    }
}

export const updateUser = (data,callback,errorCallback)=>async(dispatch)=>{
    try {
        dispatch(setAuthLoading(true));
        const result = await editUserAPI(data);
        dispatch(setUser(result.data.updatedUser));
        callback&&callback(result.data);

    }catch(err) {
        console.log(err);
        errorCallback&&errorCallback(err?.response?.data?.message || 'Something went wrong!')
    }finally{
        dispatch(setAuthLoading(false));
    }
}

export const logoutUser = ()=>(dispatch)=>{
    dispatch(setAuth({user : null, isLoggedin : false}));
}

export const checkAuth = ()=>async(dispatch)=>{
    try {
        const result = await getUserAPI();
        dispatch(setAuth({user : result.data.user, isLoggedin : true}));
    }catch(err) {
         dispatch(logoutUser());
    }
}