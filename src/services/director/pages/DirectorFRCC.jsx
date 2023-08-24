import React from 'react'
import AdminFaculty from '../../admin/pages/AdminFaculty'
import useDirectorAuth from '../../../hooks/useDirectorAuth'
import { useSelector } from 'react-redux'
import Bred from '../../../components/Bred'
import siteLinks from '../../../components/siteLinks'
import OnlyNav from '../../../components/OnlyNav'

const DirectorFRCC = () => {
    const user = useSelector(state => state.user.directorUser)
    useDirectorAuth()
  return (
    <>
      <OnlyNav user={user} logout={{ token: 'director-token', link: siteLinks.welcome.link }}
                heading={{ title: 'Director', link: siteLinks.directorHome.link }}
                li={[siteLinks.sdm, siteLinks.aaa]} userType="director"
            />

            {/* bred & title */}
            <div className='my-4'>
                <Bred links={[siteLinks.welcome, siteLinks.directorHome, siteLinks.fdc]} />
            </div>
      <AdminFaculty school={user?.department} />
    </>
  )
}

export default DirectorFRCC
