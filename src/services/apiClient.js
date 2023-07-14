import axios from 'axios'
import UserSession from './auth'
import { REFREST_TOKEN } from '../constants'

const token = UserSession.getToken()
// console.log(token)

const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.response.use(
    response => {
        // console.log(response)
        return response
    },
    async error => {
        console.log(error)
        const originalRequest = error.config
        console.log(originalRequest)
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true
            const response = await apiClient.get(REFREST_TOKEN, {
                Authorization: `Bearer ${UserSession.getRefreshToken()}`,
            })
            console.log(response)
            const user = UserSession.getUser()
            user['access_token'] = response.data.access_token
            UserSession.setUser(user)
            return apiClient(originalRequest)
        }
        if (!originalRequest || !originalRequest.retry) {
            return Promise.reject(error)
        }
        originalRequest.retry -= 1
        const delayRetryRequest = new Promise(resolve => {
            setTimeout(() => {
                console.log('retry the request', originalRequest.url)
                resolve()
            }, originalRequest.retryDelay || 1000)
        })
        return delayRetryRequest.then(() => apiClient(originalRequest))
    },
)

export default apiClient
