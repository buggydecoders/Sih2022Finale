import { toast } from 'react-toastify';
import CONSTANTS from './constants';
import { addRequirementAPI, deleteRequirementAPI, fetchRequirementAPI, updateRequirementAPI } from './services';

export const setRequirement = (state) => {
    return {
        type: CONSTANTS.SET_REQUIREMENTS,
        payload: state
    }
}

export const setLoading = (state) => {
    return {
        type: CONSTANTS.SET_LOADING,
        payload: state
    }
}

export const addRequirement = (data) => {
    return {
        type: CONSTANTS.ADD_REQUIREMENTS,
        payload: data
    }
}

export const deleteRequirementInStore = (id) => {
    return {
        type: CONSTANTS.DELETE_REQUIREMENTS,
        payload: id
    }
}

export const editRequirementInStore = (updatedData) => {
    return {
        type: CONSTANTS.EDIT_REQUIREMENTS,
        payload: updatedData
    }
}

export const sendRequierement = (data, successCallback, errorCallback) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const result = await addRequirementAPI(data);
        let { requirement } = result.data;
        dispatch(addRequirement(requirement));
        successCallback && successCallback(result.data);
    } catch (err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
        errorCallback && errorCallback()
    } finally {
        dispatch(setLoading(false));
    }
}

export const fetchRequierements = (type, successCallback, errorCallback) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const result = await fetchRequirementAPI(type);
        let { requirement } = result.data;
        dispatch(setRequirement(requirement));
        successCallback && successCallback(result.data);
    } catch (err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
        errorCallback && errorCallback()
    } finally {
        dispatch(setLoading(false));
    }
}

export const deleteRequirement = (requirementId,successCallback)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true));
        const result = await deleteRequirementAPI(requirementId);
        dispatch(deleteRequirementInStore(requirementId))
        toast(`Re deleted Successfully!`)
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}

export const editRequirement = (data,successCallback)=>async(dispatch)=>{
    try {
        dispatch(setLoading('SAVE'));
        const result = await updateRequirementAPI(data._id,data);
        console.log(data)
        dispatch(editRequirementInStore(result.data.updatedRequirement));
        toast(`${result.data.updatedRequirement.name} updated successfully!`);
        console.log(result.data.updatedRequirement)
        successCallback&&successCallback(result.data.updatedRequirement);
    }catch(err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');
    }finally{
        dispatch(setLoading(false));
    }
}
