import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './userSlice'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault()
       let user = {email, password}
        user = await dispatch(login(user))
        if(user){
          nav('/admin')
        }else{
          console.log(user)
          alert("Error Logging In")
        }
      
    }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
        <input name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required/>
        <input name='password' type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required/>
        <input type="submit" />
    </form>
  )
}
