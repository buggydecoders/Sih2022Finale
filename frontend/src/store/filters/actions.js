import CONSTANTS from './constants';
import { fetchInstitutesAPI } from './services';
import {State} from 'country-state-city';
import {toast} from 'react-toastify';

export const setStates = (data)=>{
    return {
        type : CONSTANTS.SET_STATES,
        payload : data
    }
}

export const setInstitutes = (data)=>{
    return {
        type : CONSTANTS.SET_INSTITUTES,
        payload : data
    }
}

export const setLoading = (data)=>{
    return {
        type : CONSTANTS.SET_LOADING,
        payload : data
    }
}

export const fetchInstitutes = ()=>async(dispatch)=>{
    try {
        dispatch(setLoading('INSTITUTES'));
        const result = await fetchInstitutesAPI();
        const fetchedData = result.data.institutes;
        console.log('FETCHED DATA', fetchedData);
        let insitutes = fetchedData.map(i=>({value : i._id,label : i.instituteName}));
        console.log('FETCHED INS', insitutes);

        dispatch(setInstitutes(insitutes));
    }catch(err) {
        console.log(err);
        toast('Cannot fetch institute filters');
    }finally{
        dispatch(setLoading(false));
    }
}

export const fetchStates = ()=>{
     let allStates = State.getAllStates();
     let indianStates = allStates.filter(s=>s.countryCode==="IN").map(s=>({value : s.name,label : s.name}));
     console.log(indianStates);
     return {
        type : CONSTANTS.SET_STATES,
        payload : indianStates
     }
}