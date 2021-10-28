import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

import {API_URL, userLogin, userLogout, userRegistration} from "../../http/API";

const initialState = {
    isAuth: false,
    info: {}
}

export const registrationRequest = createAsyncThunk(
    'registration',
    async ({email, password}, {rejectWithValue, dispatch}) => {
        try {
            const response = await userRegistration(email, password)
            dispatch(registration(response))
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const loginRequest = createAsyncThunk(
    'login',
    async ({email, password}, {rejectWithValue, dispatch}) => {
        try {
            const response = await userLogin(email, password)
            dispatch(login(response))
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const logoutRequest = createAsyncThunk(
    'logout',
    async(_, {rejectWithValue, dispatch}) => {
        try {
            const response = await userLogout()
            dispatch(logout(response))
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'checkAuth',
    async(_, {rejectWithValue, dispatch}) => {
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            dispatch(check(response))
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registration(state, action) {
            localStorage.setItem('token', action.payload.data.accessToken)
            state.isAuth = true
            state.info = {...action.payload.data.user}
        },
        login(state, action) {
            localStorage.setItem('token', action.payload.data.accessToken)
            state.isAuth = true
            state.info = {...action.payload.data.user}
        },
        logout(state, action) {
            localStorage.removeItem('token')
            state.isAuth = false
        },
        check(state, action) {
            localStorage.setItem('token', action.payload.data.accessToken)
            state.isAuth = true
        },
    },
    extraReducers: {}
})

const {login, registration, logout, check} = userSlice.actions
export default userSlice.reducer