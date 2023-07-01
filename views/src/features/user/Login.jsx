import React, {  useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './userSlice'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';


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
    await dispatch(login(form))
      .then((res) => {
        if (res.type === "login/fulfilled") {

          nav('/admin')
        } else {
          setErrors(errors => [...errors, "Invalid Email or Password"])
        }
      })
    setIsLoading(false)

  }



  return (
    <div id='loginPage'>
      <Box component="form" onSubmit={handleSubmit} sx={{width:'100%'}}>
        <h1>Login</h1>
        {errors.map(error => <h4 key={error} className='error'>{error}</h4>)}
        <TextField id="email" label="Email" margin="normal" autoComplete='username' onChange={(e) => handleChange(e)} required />
        <TextField id='password' label="Password" margin="normal" type='password' autoComplete='current-password' onChange={(e) => handleChange(e)} required />
        <LoadingButton variant='contained' type="submit" loading={isLoading}>Login</LoadingButton>
      </Box>
    </div>



  )
}
