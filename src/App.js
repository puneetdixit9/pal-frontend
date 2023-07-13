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
                        exact
                        path="/app"
                        element={<Home />}
                        render={() => {
                            return UserSession.isAuthenticated() ? (
                                <Navigate to="/app" />
                            ) : (
                                <Navigate to="/app/signin" />
                            )
                        }}
                    />

                    <Route path="/app/signin" element={<SignIn />}></Route>
                    <Route path="/app/signup" element={<SignUp />}></Route>
                    <Route path="/app/about" element={<About />}></Route>
                    {/* <Route path="/profile" element={<Profile />}></Route> */}
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
