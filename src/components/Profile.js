import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CardMedia, TextField } from '@mui/material'
import Grid from '@mui/material'
import UserSession from '../services/auth'
import { password_reset } from '../redux/actions/auth'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
// import
const Profile = () => {
    const dispatch = useAppDispatch()
    const [user, setUser] = useState({
        first_name: 'Unknown',
        last_name: 'User',
        email: 'N/A',
    })

    useEffect(() => {
        setUser(UserSession.getUser())
        // console.log(user)
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const context = {
            old_password: data.get('old_password'),
            new_password: data.get('new_password'),
        }
        dispatch(password_reset(context))
    }
    return (
        <>
            <Card
                sx={{ maxWidth: 300 }}
                style={{
                    justify: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CardContent>
                    <CardMedia
                        sx={{ height: 140 }}
                        image="./profilepic.svg"
                        title="profile pic"
                    />
                    <Typography variant="h5" component="div">
                        {user.first_name} {user.last_name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {user.email}
                    </Typography>
                </CardContent>

            </Card>

            <Card
                sx={{ maxWidth: 500 }}
                style={{
                    justify: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Change Password
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="old_password"
                        label="Old Password"
                        name="old_password"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="new_password"
                        label="New Password"
                        type="password"
                        id="new_password"
                        autoComplete="current-password"
                    />
                    <Button
                        data-type="Update"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Update
                    </Button>
                </Box>
            </Card>
        </>
    )
}

export default Profile
