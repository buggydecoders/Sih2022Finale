import React from 'react'
import LoginForm from '../components/AuthenticationPages/LoginForm'
import RevolutionizeIndia from '../components/AuthenticationPages/RevolutionizeIndia'

function Login() {
  return (
    <div className='flex justify-between'>
        <LoginForm/>
        <RevolutionizeIndia/>
    </div>
  )
}

export default Login