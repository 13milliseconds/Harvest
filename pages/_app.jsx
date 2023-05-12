import '../styles/globals.css'
import { useRouter } from 'next/router'
import { AuthContextProvider, useAuth } from '../context/authContext'
import { DatabaseProvider } from '../context/databaseContext'
import Header from '../components/Header'
import {theme} from '../context/themeContext'
import { useAuthState } from '../hooks/useAuth'
import { ThemeProvider } from '@emotion/react'
import {
  Box,
  Toolbar
} from '@mui/material'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [loading, error, user] = useAuthState()

  if(error) console.log(error)

  if(loading) return <div>Loading</div>

  if (pageProps.protected && !user){
      if(router.isReady) router.push('/login')
    }

  return <AuthContextProvider>
  <DatabaseProvider>
    <ThemeProvider theme={theme}>
    <Header />
    <Box component="main">
      <Toolbar />
      <Component {...pageProps} />
    </Box>
    </ThemeProvider>
  </DatabaseProvider>
</AuthContextProvider>
}
