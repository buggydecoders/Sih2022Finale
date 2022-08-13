import React from 'react'
import ActiveConversation from '../components/Inbox/ActiveConversation'
import AllMessages from '../components/Inbox/AllMessages'
import Layout from '../components/Layout'

const Inbox = () => {
  return (
    <Layout>
        <div className='grid grid-cols-[1.2fr_4fr]'>
            <div className=''>
                <AllMessages/>
            </div>
            <div className=''>
                <ActiveConversation/>
            </div>
        </div>
    </Layout>
  )
}

export default Inbox