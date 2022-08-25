import axios from "axios";
import { serverInstance } from "../../utils/serverInstance"

export const fetchInstitutesAPI = async()=>{
    const result = await serverInstance.get('/auth/get-institutes');
    return result;
}

