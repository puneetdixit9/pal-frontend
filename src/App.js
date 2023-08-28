import * as React from 'react'
import SignIn from './components/SignIn'
import TopBar from './components/TopBar'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home/Home'
import UserSession from './services/auth'
import About from './components/About'

function App() {
    return (
        <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
            <TopBar />
            <div style={{ margin: 40 }}>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home />}
                        render={() => {
                            return UserSession.isAuthenticated() ? (
                                <Navigate to="/" />
                            ) : (
                                <Navigate to="/signin" />
                            )
                        }}
                    />

                    <Route path="/signin" element={<SignIn />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route
                        path="/*"
                        element={<h1>404 - Not Found</h1>}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
