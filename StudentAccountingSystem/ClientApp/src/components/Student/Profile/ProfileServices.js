import axios from 'axios';

export default class ProfileServices{
    
    static getProfile =()=>{
        return axios.get("api/profile/get-profile");
    }
} 