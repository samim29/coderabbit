import React from 'react'
import CallToAction from '../components/CallToAction'
import '../landing.scss'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

const Landing = () => {
    const navigate = useNavigate()

    const handlePrimary = () => {
        // send user to register or login depending on auth state
        navigate('/register')
    }

    const { user, handleLogout } = useAuth()

    const onLogout = () => {
        navigate('/', { replace: true })
        // do not await so the navigation happens before Protected can redirect
        handleLogout()
    }

    return (
        <main className='landing-page'>
            <section className='landing-hero'>
                <p className='eyebrow'>AI interview coach</p>
                <h1>Prepare smarter with a plan built around the role you want.</h1>
                <p className='landing-hero__copy'>Paste a job description, add your resume or quick summary, and get a tailored interview roadmap with the questions that matter.</p>
                {!user ? (
                    <div className='landing-hero__actions'>
                        <Link to={'/login'} className='btn btn--small btn--primary-ghost'>Login</Link>
                        <Link to={'/register'} className='btn btn--small btn--primary-ghost'>Sign up</Link>
                    </div>
                ) : (
                    <div className='landing-hero__actions'>
                        <span className='user-greeting'>Hi, {user.username || user.email}</span>
                        <button className='btn btn--small btn--primary-ghost' onClick={onLogout}>Logout</button>
                    </div>
                )}
            </section>

            <CallToAction onPrimaryClick={handlePrimary} />

            <section className='how-it-works'>
                <h2>How it works</h2>
                <div className='steps'>
                    <div className='step'>
                        <h3>1. Share the job</h3>
                        <p>Paste the job description you want to target.</p>
                    </div>
                    <div className='step'>
                        <h3>2. Upload resume</h3>
                        <p>Upload your resume or write a quick self-description.</p>
                    </div>
                    <div className='step'>
                        <h3>3. Get ready</h3>
                        <p>Receive a personalized interview plan and practice questions.</p>
                    </div>
                </div>
            </section>

        </main>
    )
}

export default Landing
