import CONSTANTS from './constants';
import { toast } from 'react-toastify'
import { adminAuthAPI, fetchAdminInstituteAPI, fetchAdminRequestAPI, fetchAdminRequirementAPI, fetchAdminResourceAPI, fetchAdminStatsAPI, updateBanAPI } from './services';
import { useNavigate } from 'react-router-dom';

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

const setAdmin = (data) => {
    return {
        type: CONSTANTS.SET_ADMIN_USER,
        payload: data
    }
}

const setAdminLoading = (data) => {
    return {
        type: CONSTANTS.SET_ADMIN_LOADING,
        payload: data
    }
}

const updatedBanInStore = (data) => {
    return {
        type: CONSTANTS.UPDATE_BAN,
        payload: data
    }
}

export const fetchAdminStats = (page, limit) => async (dispatch) => {
    try {
        dispatch(setLoading("LOADING_STATS"));
        const { data } = await fetchAdminStatsAPI(page, limit);
        dispatch(setStats(data));
    } catch (err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    } finally {
        dispatch(setLoading(false));
    }
}

export const fetchAdminInstitutes = (page, limit) => async (dispatch) => {
    try {
        dispatch(setLoading("LOADING_INSTITUTES"));
        const { data } = await fetchAdminInstituteAPI(page, limit);
        dispatch(setInstitutes(data));
    } catch (err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    } finally {
        dispatch(setLoading(false));
    }
}

export const fetchAdminRequirements = (page, limit) => async (dispatch) => {
    try {
        dispatch(setLoading("LOADING_REQUIREMENTS"));
        const { data } = await fetchAdminRequirementAPI(page, limit);
        dispatch(setRequirements(data));
    } catch (err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    } finally {
        dispatch(setLoading(false));
    }
}

export const fetchAdminRequests = (page, limit) => async (dispatch) => {
    try {
        dispatch(setLoading("LOADING_REQUESTS"));
        const { data } = await fetchAdminRequestAPI(page, limit);
        dispatch(setRequests(data));
    } catch (err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    } finally {
        dispatch(setLoading(false));
    }
}

export const fetchAdminResources = (page, limit) => async (dispatch) => {
    try {
        dispatch(setLoading("LOADING_RESOURCES"));
        const { data } = await fetchAdminResourceAPI(page, limit);
        dispatch(setResources(data));
    } catch (err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    } finally {
        dispatch(setLoading(false));
    }
}

export const updatedBan = (id, isBan) => async (dispatch) => {
    try {
        dispatch(setLoading("UPDATE_BAN"));
        const data = {id, isBan}
        await updateBanAPI(data);
        dispatch(updatedBanInStore(data)) 
    } catch (err) {
        console.log(err);
        toast(err?.response?.data?.message || 'Something went wrong!');

    } finally {
        dispatch(setLoading(false));
    }
}

export const loginAdmin =
  (data, callback, errorCallback) => async (dispatch) => {
    try {
      dispatch(setAdminLoading(true));
      const result = await adminAuthAPI(data);
      dispatch(setAdmin(result.data.user));
      callback && callback(result.data);
    } catch (err) {
      console.log(err);
      errorCallback &&
        errorCallback(err?.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setAdminLoading(false));
    }
  };

