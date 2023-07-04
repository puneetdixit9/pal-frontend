const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.access_token
}

const getRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.refresh_token
}

const setUserToken = token => {
    let user = JSON.parse(localStorage.getItem('user'))
    user.access_token = token
}

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

const setUser = user => {
    console.log(JSON.stringify(user))
    localStorage.setItem('user', JSON.stringify(user))
}

const removeUser = () => {
    localStorage.removeItem('user')
}

const isAuthenticated = () => {
    return JSON.parse(localStorage.getItem('user')) !== null
}

const UserSession = {
    getToken,
    getRefreshToken,
    getUser,
    setUserToken,
    setUser,
    removeUser,
    isAuthenticated,
}

export default UserSession
