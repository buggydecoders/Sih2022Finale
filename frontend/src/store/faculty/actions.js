import { toast } from 'react-toastify';
import { setAuth, setUser } from '../auth/actions';
import CONSTANTS from './constants';
import { loginUserAPI, signupUserAPI } from './services';


export const setLoading = (state)=>{
    return {
        type : CONSTANTS.SET_LOADING,
        payload : state
    }
}

export const signupFaculty =(data)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await signupUserAPI(data);
        toast('Signed up successfully!');
    }catch(err){
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }

}

export const loginFaculty = (data,successCallback)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await loginUserAPI(data);
        dispatch(setUser(result.data.user));
        successCallback&&successCallback();
        
    }catch(err){
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}
