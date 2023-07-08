import {useEffect} from 'react'
import { useRouter } from 'next/router';
import SignupForm from '@/components/auth/SignupForm'

//Components
import { 
    Container, 
    Typography,
    Link 
} from '@mui/material'
import { useAuth } from '@/context/authContext';

export default function SignupPage () {
    const {user} = useAuth()
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