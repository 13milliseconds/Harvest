import LoginForm from "./LoginForm"
import {useState} from 'react'
import SignupForm from "./SignupForm"

export default function AuthBlock(){
    const [isSignup, setIsSignup] = useState(false)

    return <div className="p-6 bg-white">
        {isSignup 
        ? <SignupForm />
        : <LoginForm />
        }
        <a onClick={() => setIsSignup(!isSignup)} >{isSignup ? "Login instead" : "Signup instead"}</a>
    </div>
}