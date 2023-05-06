import '../styles/globals.css'
import { DatabaseProvider } from '../context/databaseContext'
import Header from '../components/Header'
import {theme} from '../context/themeContext'
import { ThemeProvider } from '@emotion/react'
import {
  Box,
  Toolbar
} from '@mui/material'

export default function App({ Component, pageProps }) {
  return <DatabaseProvider>
    <ThemeProvider theme={theme}>
    <Header />
    <Box component="main">
      <Toolbar />
      <Component {...pageProps} />
    </Box>
    </ThemeProvider>
  </DatabaseProvider>
}
