import axios from "axios"

export default class LoginAndRegisterServices {
    static login(model) {
        return axios.post(`api/account/login`,model)
    };
    static register(model) {
        return axios.post(`api/account/register`,model)
    }
    static loginFacebook(model){
        return axios.post(`api/ExternalAuth/facebook`, model)
    }
}