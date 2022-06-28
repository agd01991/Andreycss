import axios from "./index";

class authApi {

    static login = (data) => {
        return axios.post(`auth/login`, data);
    };

    static register = (data) => {
        return axios.post(`auth/register`, data);
    };

}

export default authApi;