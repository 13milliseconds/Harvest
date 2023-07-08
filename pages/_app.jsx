import '../styles/globals.css'
import { AuthContextProvider, useAuth } from '../context/authContext'
import { DatabaseProvider } from '../context/databaseContext'
import Header from '../components/Header'
import {theme} from '../context/themeContext'
import { ThemeProvider } from '@emotion/react'
import AuthWrapper from '../components/AuthWrapper'
import {
  Box,
  Toolbar
} from '@mui/material'

export default function App({ Component, pageProps }) {
  const user = useAuth()
  console.log(user)

  return <AuthContextProvider>
  <DatabaseProvider>
    <ThemeProvider theme={theme}>
    <Header />
    <Box component="main">
      <Toolbar />
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </Box>
    </ThemeProvider>
  </DatabaseProvider>
</AuthContextProvider>
}
