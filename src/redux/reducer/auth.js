import { createSlice } from '@reduxjs/toolkit'
import UserSession from '../../services/auth'

const initialState = {
    access_token: null,
    user: null,
}
export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        fetchLogin(state, action) {
            return {
                ...state,
                isLoading: true,
            }
        },
        fetchLoginSuccess(state, action) {
            // Update auth details into localStorage
            UserSession.setUser(action.payload.data)
            return {
                ...state,
                message: 'Login Successfull',
                isLoading: false,
            }
        },
        fetchLoginFailed(state, action) {
            return {
                ...state,
                isLoading: false,
            }
        },
        fetchRegister(state, action) {
            return {
                ...state,
                isLoading: true,
            }
        },
        fetchRegisterSuccess(state, action) {
            return {
                ...state,
                user: action.payload.data,
                isLoading: false,
            }
        },
        fetchRegisterFailed(state, action) {
            return {
                ...state,
                isLoading: false,
            }
        },
    },
})

export const {
    fetchLogin,
    fetchLoginSuccess,
    fetchLoginFailed,
    fetchRegister,
    fetchRegisterSuccess,
    fetchRegisterFailed,
} = authReducer.actions

export default authReducer.reducer
