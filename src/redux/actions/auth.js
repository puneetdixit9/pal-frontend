import {umpClient, apiClient} from '../../services/apiClient'
import { CHANGE_PASSWORD, LOGIN_API, REGISTER_API, LOGOUT_API, USER_PERMISSIONS } from '../../constants'
import {
    fetchLogin,
    fetchLoginSuccess,
    fetchLoginFailed,
    fetchRegister,
    fetchRegisterSuccess,
    fetchRegisterFailed,
    passwordReset,
    passwordResetSuccess,
    passwordResetFailed,
    logout,
    logoutSuccess,
    logoutFailed,
    resetStateItems,
    fetchPermissions,
    fetchPermissionsSuccess,
    fetchPermissionsFailed,
} from '../reducer/auth'



function jwtDecode(t) {
    let token = {};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split('.')[0]));
    token.payload = JSON.parse(window.atob(t.split('.')[1]));
    return (token)
  }

export const login = payload => async dispatch => {
    console.log('Calling action : login()')
    await dispatch(fetchLogin())
    try {
        const response = await umpClient.post(LOGIN_API, payload)
        let actionPayload = response.data
        let token = jwtDecode(actionPayload["access_token"])
        actionPayload['userId'] = token.payload.sub["user_id"]
        actionPayload['role'] = token.payload.sub["role"]
        actionPayload['username'] = token.payload.sub["username"]
        return dispatch(fetchLoginSuccess(actionPayload))
    } catch (err) {
        console.log("========> err ", err)
        return dispatch(fetchLoginFailed(err))
    }
}


export const register = payload => async dispatch => {
    console.log('Calling action : register()')
    await dispatch(fetchRegister())
    try {
        const response = await umpClient.post(REGISTER_API, payload)
        return dispatch(fetchRegisterSuccess(response))
    } catch (err) {
        console.log("Action register failed")
        return dispatch(fetchRegisterFailed(err))
    }
}


export const passwordResetAction = (payload) => async (dispatch) => {
    console.log('Calling action : password_reset()')
    await dispatch(passwordReset())
    try {
        const response = await umpClient.put(CHANGE_PASSWORD, payload)
        return dispatch(passwordResetSuccess(response))
    } catch (err) {
        return dispatch(passwordResetFailed(err))
    }
}


export const logoutAction = () => async dispatch => {
    console.log('Calling Action : logout()')
    await dispatch(logout())
    try {
        const response = await umpClient.delete(`${LOGOUT_API}`)
        return await dispatch(logoutSuccess(response.data))
    } catch (err) {
        return await dispatch(logoutFailed(err))
    }
}

export const getAllowedScreens = () => async dispatch => {
    console.log('Calling Action : getAllowedScreens()')
    await dispatch(fetchPermissions())
    try {
        const response = await umpClient.get(`${USER_PERMISSIONS}`)
        return await dispatch(fetchPermissionsSuccess(response.data))
    } catch (err) {
        return await dispatch(fetchPermissionsFailed(err))
    }
}


export const resetState = () => async dispatch => {
    console.log('Calling Action : resetState()')
    await dispatch(resetStateItems())
}
