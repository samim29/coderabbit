import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import LoadingState from "../../../components/LoadingState"

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loggedIn = await handleLogin({email,password})
        if (loggedIn) {
            navigate('/app', { replace: true })
        }
    }

    if(loading){
        return <LoadingState title="Loading login..." subtitle="Please wait while we check your account." compact />
    }


    return (
        <main className="auth-page">
            <div className="auth-card">
                <p className="eyebrow">Welcome back</p>
                <h1>Login</h1>
                <p className="auth-copy">Continue where you left off and generate new interview prep plans.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>
                    <button className='button primary-button' >Login</button>
                </form>
                <p className="auth-switch">Don't have an account? <Link to={"/register"} >Register</Link></p>
            </div>
        </main>
    )
}

export default Login
