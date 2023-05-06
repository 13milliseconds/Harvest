import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAuthState } from '../hooks/useAuth'

import LoginForm from "../components/auth/LoginForm"
import { Container, Link } from '@mui/material';

export default function LoginPage () {
    const [loading, error, user] = useAuthState();
    const router = useRouter()

    useEffect(()=>{
        if(!loading && user) router.push('/')
      }, [user, loading])

    return <Container maxWidth="xs">
        <h1>Login</h1>
        <LoginForm />
        <Link href="/signup">Sign up instead</Link>
    </Container>
}