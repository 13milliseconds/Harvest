import {useEffect} from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../context/authContext';

export default function Home() {
  const user = useAuth()
  const router = useRouter()

  useEffect(()=>{
    console.log(user)
    if(!user) router.push('/login')
  }, [user])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">

       {user && <div>
          Congratulations User: {user.email}
          </div> 
      }
      
    </main>
  )
}
