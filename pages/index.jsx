import {useEffect, useContext} from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../context/authContext';
import { dbContext } from '../context/databaseContext'
import { useGetUser } from '../hooks/useAPI'

import { Container } from '@mui/material';

export default function Home() {
  const userAuth = useAuth()
  const router = useRouter()
  const { user } = useContext(dbContext)
  const [ loading, error, getUser ] = useGetUser()
  console.log(user)

  useEffect(()=>{
    if(!userAuth) {
      router.push('/login')
    } else {
      if (!user.loaded) getUser(userAuth.uid)
    }
  }, [userAuth, user])

  return (
    <Container maxWidth="lg">

       {!loading && <div>
          Congratulations {user.email}
          </div> 
      }
      
    </Container>
  )
}
