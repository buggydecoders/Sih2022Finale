import React from 'react'
import RevolutionizeIndia from '../components/AuthenticationPages/RevolutionizeIndia'
import SignupForm from '../components/AuthenticationPages/SignupForm'

function Signup() {
  return (
    <div className='flex justify-between'>
        <SignupForm/>
        <RevolutionizeIndia/>
    </div>
  )
}

export default Signup