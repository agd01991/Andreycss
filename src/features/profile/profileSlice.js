import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import userApi from "../../api/profile";

const TYPES = {
    GET_USER: "user/getUser",
    UPDATE_USER_DATA: "user/updateUserData",
}

const initialState = {
    user: {
        userData: {

        }
    },
};

export const getUser = createAsyncThunk(
    TYPES.GET_USER,
    async () => {
        const response = await userApi.getProfile()
        return response.data;
    }
);


export const updateUserData = createAsyncThunk(
    TYPES.UPDATE_USER_DATA,
    async (data) => {
        const response = await userApi.updateUserData(data)
        return response.data;
    }
);


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
    },
});

export const {setUser} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const getUserThunk = () => (dispatch) => {
    dispatch(getUser()).then(result => {
        dispatch(setUser(result.payload.data))
    });
};

export const updateUserDataThunk = (data) => (dispatch) => {
    dispatch(updateUserData(data)).then(() => {
        dispatch(getUser()).then(result => {
            dispatch(setUser(result.payload.data))
        });
    });
};

export default userSlice.reducer;
