import axios from "./index";
import {login} from "../features/auth/authSlice";

const requestConfig = {
    headers: {'Authorization': `bearer ${localStorage.getItem("token")}`}
}

class clientsApi {
    static getAllClients = () => {
        return axios.get(`client/`, requestConfig);
    };

    static getClient = (id) => {
        return axios.get(`client/${id}`, requestConfig);
    };

    static getClientBankDetails = (id) => {
        return axios.get(`client/${id}/bank`, requestConfig);
    };

    static updateClientBankDetails = (data) => {
        return axios.post(`client/${data.id}/bank`,{
            bank: data.bank,
            corrAccount: data.corrAccount,
            bankCode: data.bankCode,
            recipient: data.recipient,
            taxpayerNumber: data.taxpayerNumber,
            statementCode: data.statementCode,
            recipientAccount: data.recipientAccount
        }, requestConfig);
    };

    static addClient = (data) => {
        return axios.post(`client/add`, {
            company: data.company,
            name: data.name,
            phone: data.phone,
            email: data.email
        }, requestConfig);
    };

}

export default clientsApi;