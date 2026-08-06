import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import LoadingState from "../../../components/LoadingState"

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const registered = await handleRegister({username,email,password})
        if (registered) {
            navigate("/")
        }
    }

    if(loading){
        return <LoadingState title="Loading register..." subtitle="Setting up your account access." compact />
    }

    return (
        <main className="auth-page">
            <div className="auth-card">
                <p className="eyebrow">Start here</p>
                <h1>Register</h1>
                <p className="auth-copy">Create your account and start building interview plans in minutes.</p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username' />
                    </div>
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

                    <button className='button primary-button' >Register</button>

                </form>

                <p className="auth-switch">Already have an account? <Link to={"/login"} >Login</Link></p>
            </div>
        </main>
    )
}

export default Register
