import React from 'react'
import { useParams } from 'react-router-dom'
import title from '../../../../../js/title'
import GoBack from '../../../../../components/GoBack'
import useDirectorAuth from '../../../../../hooks/useDirectorAuth'
import { useSelector } from 'react-redux'
import NIRFNavbar, { navbarLinks } from '../components/NIRFNavbar'
import nirfTablesObject from '../js/nirfTablesObject'
import Footer from '../../../../../components/Footer'
import siteLinks from '../../../../../components/siteLinks'

const NIRFContent = () => {

    useDirectorAuth()
    const { academicYear, module } = useParams()
    title('National Institutional Ranking Framework (NIRF)')
    const user = useSelector((state) => state.user?.directorUser)
    const stageTitle = navbarLinks?.[module]?.title

    const NIRFTables = nirfTablesObject(user?.department)
    const bredLinks = [siteLinks.welcome, siteLinks.directorHome, siteLinks.nirfSelectYear, { title: stageTitle }]


    return (
        <div>
            <GoBack pageTitle={`NIRF Report (${academicYear})`} showAvatar={{ photoURL: user?.photoURL, userType: 'director' }} bredLinks={bredLinks} />

            <div className="my-3 md:sticky-top">
                <NIRFNavbar />
            </div>

            <div className="bg-gray-100 p-2 rounded-lg min-h-screen">
                <div>
                    {
                        module !== 'acknowledgement' && <>
                            <p className="text-center mt-3 font-bold text-xl">
                                {NIRFTables?.[module]?.title}</p>
                        </>
                    }
                </div>

                <div>
                    {
                        NIRFTables?.[module]?.component || <p>No available component</p>
                    }
                </div>
            </div>

            <Footer />





        </div>
    )
}

export default NIRFContent
