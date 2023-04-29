import '../styles/globals.css'
import { DatabaseProvider } from '../context/databaseContext'
import Header from '../components/Header'

export default function App({ Component, pageProps }) {
  return <DatabaseProvider>
    <Header />
    <Component {...pageProps} />
  </DatabaseProvider>
}
