import axios from 'axios'
import {
    fetchLogin,
    fetchLoginSuccess,
    fetchLoginFailed,
    fetchRegister,
    fetchRegisterSuccess,
    fetchRegisterFailed,
} from '../reducer/auth'
import apiClient from '../../services/apiClient'
import { CHANGE_PASSWORD, LOGIN_API, REGISTER_API } from '../../constants'

const globalConfig = {
    retry: 3,
    retryDelay: 1000,
}

export const login = payload => async dispatch => {
    console.log('Calling action : login()')
    await dispatch(fetchLogin())
    try {
        const response = await apiClient.post(LOGIN_API, payload)
        return dispatch(fetchLoginSuccess(response))
    } catch (err) {
        return dispatch(fetchLoginFailed(err))
    }
}

export const register = payload2 => async dispatch => {
    console.log('Calling action : register()')
    await dispatch(fetchRegister())
    try {
        const response = await apiClient.post(REGISTER_API, payload2)
        return dispatch(fetchRegisterSuccess(response))
    } catch (err) {
        return dispatch(fetchRegisterFailed(err))
    }
}

export const password_reset = payload => async dispatch => {
    console.log('Calling action : password_reset()')
    try {
        const response = await apiClient.put(
            CHANGE_PASSWORD,
            payload,
            globalConfig,
        )
        return dispatch(fetchRegisterSuccess(response))
    } catch (err) {
        return dispatch(fetchRegisterFailed(err))
    }
}
