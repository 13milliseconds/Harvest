import '../styles/globals.css'
import { DatabaseProvider } from '../context/databaseContext'
import { AuthProvider } from '../context/authContext'
import Header from '../components/Header'

export default function App({ Component, pageProps }) {
  return <DatabaseProvider>
    <AuthProvider>
    <Header />
    <Component {...pageProps} />
    </AuthProvider>
  </DatabaseProvider>
}
