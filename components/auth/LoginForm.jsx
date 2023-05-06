import { useState } from 'react';
import { useSignIn } from '../../hooks/useAuth';
import {
  Button,
  TextField,
  Box,
  Alert
} from '@mui/material'

export default function LoginForm(){
  const [loading, error, signIn] = useSignIn()
  const [state, setState] = useState({
    email: {
      value: '',
      error: false,
      errorMessage: ''
    },
    password: {
      value: '',
      error: false,
      errorMessage: ''
    }
  })

  if(error.status){
    console.log(error.log)
  }

    const updateValue = (e) => {
      let newState = {...state}
      newState[e.target.name].value = e.target.value
      setState(newState)
      console.log(newState)
    }

    const emailValidation = () => {
      if (!state.email.value) {
        setState({
            ...state,
            email: {
              value: state.email.value,
              error: true,
              errorMessage: 'Required'
            }
        })
        return false
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(state.email.value)
      ) {
        setState({
          ...state,
          email: {
            value: state.email.value,
            error: true,
            errorMessage: 'Invalid email address'
          }
        })
        return false
      } else {
        setState({
          ...state,
          email: {
            value: state.email.value,
            error: false,
            errorMessage: ''
          }
        })
        return true
      }
      
    }
    const passwordValidation = () => {
      if (!state.password.value) {
        setState({
          ...state,
          password: {
            value: state.password.value,
            error: true,
            errorMessage: 'Required'
          }
        })
        return false
      } else {
        setState({
          ...state,
          password: {
            value: state.password.value,
            error: false,
            errorMessage: ''
          }
        })
        return true
      }
    }

    const onSubmit = (e) => {
      e.preventDefault()

      if(emailValidation() && passwordValidation()){
        signIn({
          email: state.email.value,
          password: state.password.value
        })
      }
    }

    return <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
           <TextField 
              type="email" 
              name="email" 
              placeholder="Email"
              value = {state.email.value}
              onChange = {(e) => {updateValue(e); emailValidation()}}
              error = {state.email.error}
              helperText={state.email.errorMessage}
              onBlur={emailValidation}
              />
           <TextField 
              type="password" 
              name="password" 
              placeholder="Password"
              value = {state.password.value}
              onChange = {(e) => {updateValue(e); passwordValidation()}}
              error={state.password.error}
              helperText={state.password.errorMessage}
              onBlur={passwordValidation}
              />
           <Button type="submit" onClick={onSubmit} disabled={loading}>
             Submit
           </Button>
           {error.status && <Alert severity="error">Invalid username/password</Alert>}
        </Box>
}