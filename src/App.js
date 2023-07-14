import * as React from 'react'
import SignIn from './components/SignIn'
import TopBar from './components/TopBar'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './components/SignUp'
import Home from './components/Home/Home'
import UserSession from './services/auth'
import About from './components/About'
import Profile from './components/Profile'

function App() {
    return (
        <BrowserRouter>
            <TopBar />
            <div style={{ margin: 40 }}>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/pal" />}
                    />
                    <Route
                        exact
                        path="/pal"
                        element={<Home />}
                        render={() => {
                            return UserSession.isAuthenticated() ? (
                                <Navigate to="/pal" />
                            ) : (
                                <Navigate to="/pal/signin" />
                            )
                        }}
                    />

                    <Route path="/pal/signin" element={<SignIn />}></Route>
                    <Route path="/pal/signup" element={<SignUp />}></Route>
                    <Route path="/pal/about" element={<About />}></Route>
                    {/* <Route path="/pal/profile" element={<Profile />}></Route> */}
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
