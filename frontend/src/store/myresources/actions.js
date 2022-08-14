import { fetchResourcesAPI } from "./services";

const fetchAllResources = (category,page,limit,state)=>async(dispatch,getState)=>{
    const {myResources} = getState();
    const result = await fetchResourcesAPI();
}