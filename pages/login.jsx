import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../context/authContext';

import LoginForm from "../components/auth/LoginForm"
import { 
    Container, 
    Link,
    Typography
 } from '@mui/material';

export default function LoginPage () {
    const {user} = useAuth()
    const router = useRouter()

    useEffect(()=>{
        if(user) router.push('/')
      }, [user])

    return <Container maxWidth="xs">
        <Typography variant="h4">
        Login
        </Typography>
        <LoginForm />
        <Link href="/signup">Sign up instead</Link>
    </Container>
}