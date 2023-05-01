import { useAuthState } from '../hooks/useAuth';
import Link from 'next/link'

export default function Header () {
  const [loading, error, user] = useAuthState();

    return <header>
    <div className="z-10 w-full max-w-5xl items-center font-mono text-sm md:flex">
        <h1 className="md:flex-1"><Link href="/">Seed to Fruit</Link></h1>
        { user && <ul className="flex">
        <li className="px-6 py-1"><Link href="/plants">Plants</Link></li>
        <li className="px-6 py-1"><Link href="/brands">Brands</Link></li>
      </ul>
      }
      </div>
    </header>
}