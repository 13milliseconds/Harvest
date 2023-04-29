import '@/styles/globals.css'
import { DatabaseProvider } from '../context/databaseContext'
import Link from 'next/link'

export default function App({ Component, pageProps }) {
  return <DatabaseProvider>
    <header>
    <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
        <h1>Seed to Fruit</h1>
      </div>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/brands">Brands</Link></li>
      </ul>
    </header>
    <Component {...pageProps} />
  </DatabaseProvider>
}
