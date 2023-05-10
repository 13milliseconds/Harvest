import { useState, useEffect } from 'react';
import { useSignUp } from '../../hooks/useAuth';
import { 
  Button, 
  TextField, 
  Alert,
  Box 
} from '@mui/material';


export default function SignupForm(){
    const [loading, error, signUp] = useSignUp()
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ state, setState ] = useState({
      email: {},
      password: {},
      confirmpassword: {}
    })

    useEffect(() => {
      if(error.status){
        console.log(error.log)
      }

      if ( error.status ) {
        switch(error.code) {
        case 'auth/email-already-in-use':
          setErrorMessage('Email already in use')
          break
        default:
          setErrorMessage('An unknown error happened')
      }
      } else {
        setErrorMessage('')
      }
      
    },[error])



  
      const updateValue = (e) => {
        let newState = {...state}
        newState[e.target.name].value = e.target.value
        setState(newState)
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

      const confirmpasswordValidation = () => {
        if (state.password.value !== state.confirmpassword.value) {
          setState({
            ...state,
            password: {
              value: state.confirmpassword.value,
              error: true,
              errorMessage: 'Passwords do not match'
            }
          })
          return false
        } else {
          setState({
            ...state,
            password: {
              value: state.confirmpassword.value,
              error: false,
              errorMessage: ''
            }
          })
          return true 
        }
        }
  
      const onSubmit = (e) => {
        e.preventDefault()
  
        if(emailValidation() && passwordValidation() && confirmpasswordValidation()){
          signUp({
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
              <TextField 
              type="password" 
              name="confirmpassword" 
              placeholder="Confirm Password"
              value = {state.confirmpassword.value}
              onChange = {(e) => {updateValue(e); confirmpasswordValidation()}}
              error={state.confirmpassword.error}
              helperText={state.confirmpassword.errorMessage}
              onBlur={confirmpasswordValidation}
              />
          <Button type="submit" onClick={onSubmit} disabled={loading}>
             Submit
           </Button>
          {error.status && <Alert severity="error">{ errorMessage }</Alert>}
    </Box>
    }