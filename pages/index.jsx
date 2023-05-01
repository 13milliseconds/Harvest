import {useEffect} from 'react'
import { useRouter } from 'next/router';
import { useAuthState } from '../hooks/useAuth';
import ButtonSignout from '../components/auth/ButtonSignout';

export default function Home() {
  const [loading, error, user] = useAuthState();
  const router = useRouter()

  useEffect(()=>{
    if(!loading && !user) router.push('/login')
  }, [user, loading])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {loading && <div>Loading...</div>}

       {user && <div>
          Congratulations User: {user.email}
          <ButtonSignout />
          </div> 
      }
      
    </main>
  )
}
