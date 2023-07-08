import {useEffect, useContext} from 'react'
import { useAuth } from '@/context/authContext'
import { dbContext } from '@/context/databaseContext'
import { useGetUser } from '../hooks/useAPI'


import { Container, Typography } from '@mui/material';

export default function Home() {
  const { user } = useContext(dbContext)
  const [ loading, error, getUser ] = useGetUser()

  if(error) console.log(error)

  if (loading) return <div>Loading...</div>

  return (
    <Container maxWidth="lg">
        <Typography variant="h6">
          Congratulations {user.email}
        </Typography>
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
