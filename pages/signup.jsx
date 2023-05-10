import {useEffect} from 'react'
import { useRouter } from 'next/router';
import { useAuthState } from '../hooks/useAuth';
import SignupForm from '../components/auth/SignupForm'

//Components
import { 
    Container, 
    Typography,
    Link 
} from '@mui/material'

export default function SignupPage () {
    const [ error, user] = useAuthState();
    const router = useRouter()

    useEffect(()=>{
        if( user ) router.push('/')
      }, [user])

    return <Container maxWidth="xs">
        <Typography variant="h4">Sign Up</Typography>
        <SignupForm />
        <Link href="/login">Log in instead</Link>
    </Container>
}