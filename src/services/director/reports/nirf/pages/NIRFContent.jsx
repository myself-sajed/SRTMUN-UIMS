import React from 'react'
import { useParams } from 'react-router-dom'
import title from '../../../../../js/title'
import GoBack from '../../../../../components/GoBack'
import useDirectorAuth from '../../../../../hooks/useDirectorAuth'
import { useSelector } from 'react-redux'
import NIRFNavbar, { navbarLinks } from '../components/NIRFNavbar'

const NIRFContent = () => {

    useDirectorAuth()
    const { academicYear, module } = useParams()
    title('National Institutional Ranking Framework (NIRF)')
    const user = useSelector((state) => state.user?.directorUser)
    const stageTitle = navbarLinks?.[module]?.title


    return (
        <div>
            <GoBack pageTitle={`NIRF Report (${academicYear})`} showAvatar={{ photoURL: user?.photoURL, userType: 'director' }} />

            <div className="my-3 sticky-top">
                <NIRFNavbar />
            </div>

            <div className="bg-gray-100 p-2 rounded-lg">
                {
                    module !== 'acknowledgement' && <>
                        <p className="text-center mt-3 font-bold text-xl">
                            {stageTitle}{navbarLinks?.[module]?.subtitle ? `: ${navbarLinks?.[module]?.subtitle}` : ''}</p>
                    </>
                }
            </div>


        </div>
    )
}

export default NIRFContent
