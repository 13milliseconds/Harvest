import { Children } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../context/authContext"

export default function AuthWrapper({children}){
    const {user, loading} = useAuth()
    const router = useRouter()

    if (loading) return <div>Loading...</div>

    const displayPage = (page) => {
        if (page.props.protected && !user){
            if(router.isReady) router.push('/login')
        }
        return page
    }

    return <>
        {Children.map(children, displayPage)}
    </>
}