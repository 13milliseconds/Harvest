import {useEffect, useContext} from 'react'
import { useAuth } from '../context/authContext';
import { dbContext } from '../context/databaseContext'
import { useGetUser } from '../hooks/useAPI'
import { 
    Container,
    Typography
 } from '@mui/material';

export default function Home() {
  const userAuth = useAuth()
  const { user } = useContext(dbContext)
  const [ loading, error, getUser ] = useGetUser()

  if(error) console.log(error)

  useEffect(()=>{
      if (!user.loaded) getUser(userAuth.uid)
  }, [userAuth])

  return (
    <Container maxWidth="lg">

       {loading 
       ? <div>Loading...</div>
       :<div>
            <Typography variant="h1" >My Account</Typography>
            <p>Email: {user.email}</p>
          </div> 
      }
      
    </Container>
  )
}