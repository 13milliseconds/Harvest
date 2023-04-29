import '@/styles/globals.css'
import { DatabaseProvider } from '../context/databaseContext'

export default function App({ Component, pageProps }) {
  return <DatabaseProvider>
    <header>
    <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
        <h1>Seed to Fruit</h1>
      </div>
      <ul>
        <li><a href="/">Plants</a></li>
        <li><a href="/brands">Brands</a></li>
      </ul>
    </header>
    <Component {...pageProps} />
  </DatabaseProvider>
}
