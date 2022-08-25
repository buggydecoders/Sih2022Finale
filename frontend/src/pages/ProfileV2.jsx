import React from 'react'
import Layout from '../components/Layout'
import BannerAndProfile from '../components/ProfileV2/BannerAndProfile'
import ContactInfo from '../components/ProfileV2/ContactInfo'
import Resources from '../components/ProfileV2/Resources'
import SideBarInformation from '../components/ProfileV2/SideBarInformation'

const ProfileV2 = () => {
  return (
    <Layout>
      <div className='p-4 gap-6 bg-lightGray grid grid-cols-[4fr_1.3fr]'>
        <div className=''>
          <BannerAndProfile />
          <ContactInfo />
          <Resources />
        </div>
        <SideBarInformation />
      </div>
    </Layout>
  )
}

export default ProfileV2