import {useEffect} from 'react'
import { useRouter } from 'next/router';
import { useAuthState } from '../hooks/useAuth';
import SignupForm from '../components/auth/SignupForm'

//Components
import { Link } from '@mui/material'

export default function SignupPage () {
    const [loading, error, user] = useAuthState();
    const router = useRouter()

    useEffect(()=>{
        if(!loading && user) router.push('/')
      }, [user, loading])

    return <div className="max-w-xl mx-auto my-20">
        <h1>Sign Up</h1>
        <SignupForm />
        <Link href="/login">Log in instead</Link>
    </div>
}