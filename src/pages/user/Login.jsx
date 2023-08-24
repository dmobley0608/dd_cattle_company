import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, verifyUser } from '../../features/user/userSlice'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import styles from './User.module.css'
import googleLogo from '../../static/images/google.png'


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setErrors([]);
    setIsLoading(true)
    e.preventDefault()
    await dispatch(login({ username: form.email, ...form }))
      .then((res) => {
        if (res.type === "login/fulfilled") {
          nav('/')
        } else {
          setErrors(errors => [...errors, "Invalid Email or Password"])
        }
      })
    setIsLoading(false)

  }



  return (

    <Box component="form" className={styles["login-form"]} onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <h1>Login</h1>
      {errors.map(error => <h4 key={error} className='error'>{error}</h4>)}
      <TextField id="email" label="Email" margin="normal" autoComplete='username' onChange={(e) => handleChange(e)} required />
      <TextField id='password' label="Password" margin="normal" type='password' autoComplete='current-password' onChange={(e) => handleChange(e)} required />
      <LoadingButton variant='contained' type="submit" loading={isLoading}>Login</LoadingButton>

      <Button variant='outlined' href="/register">Sign Up !</Button>
      <hr />
      <div>
        <h4>Login with via Google</h4>
        <a href='https://ddcattle.company/login/google' >
          <img src={googleLogo} alt="google" width="50px" />
        </a>
      </div>


    </Box>




  )
}
