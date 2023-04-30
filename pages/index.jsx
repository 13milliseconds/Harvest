import {useContext} from 'react'
import { authContext } from "../context/authContext";
import AuthBlock from "../components/auth/AuthBlock";

export default function Home() {
  const authState = useContext(authContext);
  const user = authState.user
  console.log(user)

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {user ? <div>Congratulations User: {user.email}</div> : <AuthBlock /> }
    </main>
  )
}
