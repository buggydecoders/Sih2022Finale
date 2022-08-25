import React from 'react'

import RevolutionizeIndiaFaculty from '../../components/FacultyAssistance/RevolutionizeIndia'
import FacultySignupForm from '../../components/FacultyAssistance/SignupForm'

const FacultySignup = () => {
  return (
    <div className='flex justify-between overflow-hidden h-[100vh]'>
    <FacultySignupForm/>
    <RevolutionizeIndiaFaculty/>
</div>
  )
}

export default FacultySignup