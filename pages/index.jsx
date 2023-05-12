import {useEffect, useContext} from 'react'
import { useAuth } from '../context/authContext'
import { dbContext } from '../context/databaseContext'
import { useGetUser } from '../hooks/useAPI'


import { Container } from '@mui/material';

export default function Home() {
  const {user: userAuth} = useAuth()
  const { user } = useContext(dbContext)
  const [ loading, error, getUser ] = useGetUser()

  if(error) console.log(error)

  useEffect(() => {
    console.log(user, userAuth)
      if(!user.loaded)
        getUser(userAuth.uid)
    }, [userAuth])

  return (
    <Container maxWidth="lg">
       {!loading && <div>
          Congratulations {user.email}
          </div> 
      }
    </Container>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}
