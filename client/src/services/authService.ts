import axios from "axios";
const apiUrl='http://localhost:8004/api/';

const register=(userData:any)=>{
    return axios.post(apiUrl+"signup",userData)
}

export default {register}