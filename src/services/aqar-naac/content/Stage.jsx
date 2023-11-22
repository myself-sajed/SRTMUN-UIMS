import React from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import AQARNavbar, { navbarLinks } from '../components/AQARNavbar'
import { useParams } from 'react-router-dom'
import Footer from '../../../components/Footer'
import { authParams } from '../content/ChooseAQARYear'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion'
import { useSelector } from 'react-redux'
import AQARTablesObject from '../js/AQARTablesObject'


const Stage = () => {
    const { academicYear, userType, stageName } = useParams();
    const stageTitle = navbarLinks?.[stageName].title
    const usernames = {
        admin: 'adminUser',
        director: 'directorUser'
    }
    const bredLinks = [siteLinks.welcome, siteLinks[userType === 'admin' ? 'adminHome' : 'directorHome'], { title: "Select AQAR Year", link: `/${userType}/aqar` }, { title: `AQAR Form (${stageTitle})`, link: null }]

    useOtherServiceAuth({ ...authParams[userType], shouldNavigate: false })
    const users = useSelector((state) => state.user)


    let school = users?.directorUser?.department;
    let isDirector = userType==="director";


    const AQARTables = AQARTablesObject({academicYear, isDirector, school})

    return (
        <div>
            <GoBack pageTitle={`Annual Quality Assurance Report (${academicYear})`} bredLinks={bredLinks} showAvatar={{ photoURL: users[usernames[userType]]?.photoURL, userType }} />

            <div className="my-3">
                <AQARNavbar />
            </div>

            <div className="bg-gray-100 p-2 rounded-lg">
                <p className="text-center mt-3 font-bold text-xl">{stageTitle}</p>
                <p className="text-center mb-3 text-sm text-muted">
                    Tables: {`(${AQARTables?.[stageName]?.length})`}
                    </p>

                {/* // Render your tables here dynamically  */}
                <div className="my-5">
                    <TableAccordion AQARTables={AQARTables?.[stageName]} showIndex={false} />
                </div>

            </div>
            <Footer />


        </div>
    )
}

export default Stage
