import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useAuthState } from '../hooks/useAuth'

import LoginForm from "../components/auth/LoginForm"

export default function LoginPage () {
    const [loading, error, user] = useAuthState();
    const router = useRouter()

    useEffect(()=>{
        if(!loading && user) router.push('/')
      }, [user, loading])

    return <div className="max-w-xl mx-auto my-20">
        <h1>Login</h1>
        <LoginForm />
        <Link href="/signup">Sign up instead</Link>
    </div>
}