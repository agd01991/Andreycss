import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import clientsApi from "../../api/clients";

const TYPES = {
    GET_CLIENTS: "clients/getClients",
    GET_CLIENT: "clients/getClient",
    ADD_CLIENT: "clients/addClient",
    GET_CLIENT_BANK_DETAILS: "clients/getClientBankDetails",
    UPDATE_CLIENT_BANK_DETAILS: "clients/updateClientBankDetails"
}

const initialState = {
    clients: [],
    currentClient: {},
    currentClientBankDetails: {}
};

export const getClients = createAsyncThunk(
    TYPES.GET_CLIENTS,
    async () => {
        const response = await clientsApi.getAllClients()
        return response.data;
    }
);

export const getClient = createAsyncThunk(
    TYPES.GET_CLIENT,
    async (id) => {
        const response = await clientsApi.getClient(id)
        return response.data;
    }
);

export const getClientBankDetails = createAsyncThunk(
    TYPES.GET_CLIENT_BANK_DETAILS,
    async (id) => {
        const response = await clientsApi.getClientBankDetails(id)
        return response.data;
    }
);


export const addClient = createAsyncThunk(
    TYPES.ADD_CLIENT,
    async (data) => {
        const response = await clientsApi.addClient(data)
        return response.data;
    }
);

export const updateClientBankDetails = createAsyncThunk(
    TYPES.UPDATE_CLIENT_BANK_DETAILS,
    async (data) => {
        const response = await clientsApi.updateClientBankDetails(data)
        return response.data;
    }
);

export const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setClients(state, action) {
            state.clients = action.payload
        },
        setCurrentClient(state, action) {
            state.currentClient = action.payload
        },
        setCurrentClientBankDetails(state, action) {
            state.currentClientBankDetails = action.payload
        }
    },
});

export const {setClients, setCurrentClient, setCurrentClientBankDetails} = clientsSlice.actions;

export const selectClients = (state) => state.clients.clients;
export const selectCurrentClient = (state) => state.clients.currentClient;
export const selectCurrentClientBankDetails = (state) => state.clients.currentClientBankDetails;

export const getClientsThunk = () => (dispatch) => {
    dispatch(getClients()).then(result => {
        dispatch(setClients(result.payload.clients))
    });
};

export const getClientThunk = (id) => (dispatch) => {
    dispatch(getClient(id)).then(result => {
        dispatch(setCurrentClient(result.payload.client))
    });
};

export const getClientBankDetailsThunk = (id) => (dispatch) => {
    dispatch(getClientBankDetails(id)).then(result => {
        dispatch(setCurrentClientBankDetails(result.payload.bankDetails))
    });
};

export const addClientThunk = (data) => (dispatch) => {
    dispatch(addClient(data)).then(() => {
        dispatch(getClientsThunk())
    })
}

export const updateClientThunk = (data, id) => (dispatch) => {
    data = {
        ...data,
        id: id
    }
    dispatch(updateClientBankDetails(data))
        .then(() => {
            dispatch(getClientsThunk())
        })
};

export default clientsSlice.reducer;
