import axios from 'axios';

export default class ProfileServices{
    
    static getProfile =()=>{
        console.log(axios.defaults.headers.common);
        return axios.get("api/profile/get-profile");
    }
} 