import '@/styles/globals.css'
import { DatabaseProvider } from '../context/databaseContext'

export default function App({ Component, pageProps }) {
  return <DatabaseProvider>
    <Component {...pageProps} />
  </DatabaseProvider>
}
