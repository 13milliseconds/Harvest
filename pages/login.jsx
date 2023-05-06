import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAuthState } from '../hooks/useAuth'

import LoginForm from "../components/auth/LoginForm"
import { 
    Container, 
    Link,
    Typography
 } from '@mui/material';

export default function LoginPage () {
    const [loading, error, user] = useAuthState();
    const router = useRouter()

    useEffect(()=>{
        if(!loading && user) router.push('/')
      }, [user, loading])

    return <Container maxWidth="xs">
        <Typography variant="h4">
        Login
        </Typography>
        <LoginForm />
        <Link href="/signup">Sign up instead</Link>
    </Container>
}