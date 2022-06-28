import axios from "./index";

const requestConfig = {
    headers: {'Authorization': `bearer ${localStorage.getItem("token")}`}
}

class userApi {
    static getProfile = () => {
        return axios.get(`user/`, requestConfig);
    };

    static updateUserData = (data) => {
        return axios.post(`user/data`, {
            name: data.name,
            phone: data.phone,
        }, requestConfig);
    };

    static updateUserBankDetails = (data) => {
        return axios.post(`user/bank`, {
            bank: data.bank,
            corrAccount: data.corrAccount,
            bankCode: data.bankCode,
            recipient: data.recipient,
            taxpayerNumber: data.taxpayerNumber,
            statementCode: data.statementCode,
            recipientAccount: data.recipientAccount
        }, requestConfig);
    };

}

export default userApi;