import React from 'react'
import '../landing.scss'
import { Link } from 'react-router'

const CallToAction = ({ onPrimaryClick }) => {
    return (
        <section className='cta'>
            <div className='cta__inner'>
                <h2 className='cta__title'>Ace Your Next Interview</h2>
                <p className='cta__subtitle'>Get a tailored interview plan, curated questions, and a resume optimized for the job.</p>

                <div className='cta__actions'>
                    <button className='btn btn--primary' onClick={onPrimaryClick}>Get My Free Plan</button>
                    <Link className='btn btn--ghost' to={'/register'}>Create Account</Link>
                </div>

                <div className='cta__features'>
                    <div>AI-generated interview strategy</div>
                    <div>ATS-friendly resume builder</div>
                    <div>Personalized preparation plan</div>
                </div>
            </div>
        </section>
    )
}

export default CallToAction
