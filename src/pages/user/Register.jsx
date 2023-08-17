
import React, { useEffect, useState } from 'react'
import { TextField } from '../../components/forms/inputs'
import { Box, Button } from '@mui/material'
import styles from "./User.module.css"
import { emailRegister } from '../../features/user/userApi'
import { useDispatch } from 'react-redux'
import { login } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [c_password, setC_Password] = useState("")
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const nav = useNavigate();

    const handleSubmit = async(e)=>{
        setError(null)
        e.preventDefault()
        if(email.length < 5){setError( "Please enter a valid email")}
        if(password.length < 5){setError("Password must be at least 5 characters")}
        if(password !== c_password){setError("Passwords do not match")}
        if(!error){
           await emailRegister(email, password)
           .then(async res=>{
            if(res.status === 200){
                await dispatch(login({username:email, password:password}))
                .then(res=>{
                    if(res.type === "login/fulfilled"){
                        nav('/')
                    }
                })
            }
           })
        }
       
    }

  return (
    <Box className={styles['register-form']} component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <h1>Register</h1>
        <h3>{error}</h3>
        <TextField label= "Email" name="email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
        <TextField label= "Password" name="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
        <TextField label= "Confirm Password" name="confirm_password" type="password" onChange={(e)=>setC_Password(e.target.value)}/>
        <Button variant="contained" className='btn' type="submit">Register</Button>
    </Box>
  )
}
