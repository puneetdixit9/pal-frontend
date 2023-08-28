import React from 'react'
import TopSearch from './TopSearch'
import MainPage from './MainPage'
import SnackbarNotification from '../SnackbarNotification'
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'
import {
    getProducts,
    getConfig,
} from '../../redux/actions/product'
import UserSession from '../../services/auth'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const productState = useAppSelector(state => state.productReducer)
    const [snackbarState, setSnackbarState] = useState(false)

    useEffect(() => {
        if (UserSession.isAuthenticated()) {
            dispatch(getProducts())
            dispatch(getConfig())
        }
        else {
            navigate("/signin")
        }
    }, [])

    useEffect(() => {
        setSnackbarState(true)
    }, [productState.message])

    return (
        <>
            <TopSearch />
            <MainPage />
            {snackbarState && productState.message && (
                <SnackbarNotification
                    message={productState.message}
                    onClose={() => setSnackbarState(false)}
                    severity={productState.isError ? 'error' : 'success'}
                />
            )}
        </>
    )
}

export default Home
