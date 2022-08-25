import CONSTANTS from './constants';
import { toast } from 'react-toastify'
import { fetchAdminInstituteAPI, fetchAdminRequestAPI, fetchAdminRequirementAPI, fetchAdminResourceAPI, fetchAdminStatsAPI } from './services';

// stats
// institute
// requirement
// request
// resource

const setStats = (data) => {
    return {
        type: CONSTANTS.SET_STATS,
        payload: data
    }
}

const setInstitutes = (data) => {
    return {
        type: CONSTANTS.SET_INSTITUTES,
        payload: data
    }
}

const setRequirements = (data) => {
    return {
        type: CONSTANTS.SET_REQUIREMENTS,
        payload: data
    }
}

const setRequests = (data) => {
    return {
        type: CONSTANTS.SET_REQUESTS,
        payload: data
    }
}

const setResources = (data) => {
    return {
        type: CONSTANTS.SET_RESOURCES,
        payload: data
    }
}

const setLoading = (data) => {
    return {
        type: CONSTANTS.SET_ADMIN_LOADING,
        payload: data
    }
}

export const fetchAdminStats = () => async (dispatch, page, limit) => {
    try {
        dispatch(setLoading("LOADING_STATS"));
        const {data} = await fetchAdminStatsAPI(page, limit);
        dispatch(setStats(data));
    } catch (err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    } finally {
        dispatch(setLoading(false));
    }
}

export const fetchAdminInstitutes = () => async (dispatch, page, limit) => {
    try {
        dispatch(setLoading("LOADING_INSTITUTES"));
        const {data} = await fetchAdminInstituteAPI(page, limit);
        dispatch(setInstitutes(data));
    } catch (err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    } finally {
        dispatch(setLoading(false));
    }
}

export const fetchAdminRequirements = () => async (dispatch, page, limit) => {
    try {
        dispatch(setLoading("LOADING_REQUIREMENTS"));
        const {data} = await fetchAdminRequirementAPI(page, limit);
        dispatch(setRequirements(data));
    } catch (err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    } finally {
        dispatch(setLoading(false));
    }
}

export const fetchAdminRequests = () => async (dispatch, page, limit) => {
    try {
        dispatch(setLoading("LOADING_REQUESTS"));
        const {data} = await fetchAdminRequestAPI(page, limit);
        dispatch(setRequests(data));
    } catch (err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    } finally {
        dispatch(setLoading(false));
    }
}

export const fetchAdminResources = () => async (dispatch, page, limit) => {
    try {
        dispatch(setLoading("LOADING_RESOURCES"));
        const {data} = await fetchAdminResourceAPI(page, limit);
        dispatch(setResources(data));
    } catch (err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    } finally {
        dispatch(setLoading(false));
    }
}

