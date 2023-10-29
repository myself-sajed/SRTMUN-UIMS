import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { setESTTUser } from '../../../redux/slices/UserSlice'
import siteLinks from '../../../components/siteLinks'
import { useSelector } from 'react-redux'
import title from '../../../js/title'
import Footer from '../../../components/Footer'
import GoBack from '../../../components/GoBack'
import ESTTSanctionedPostWithProof from '../components/ESTTSanctionedPost'
import AQARStepper from '../../dsd/components/AQARStepper'
import { useState } from 'react'
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion'

const esttAuthParams = { shouldNavigate: true, tokenName: "estt-token", setUser: setESTTUser, navigationHomeLink: siteLinks.esttHome.link, navigationLoginLink: siteLinks.esttLogin.link, model: "ESTTUser" }

const ESTTHome = () => {
    useOtherServiceAuth(esttAuthParams)
    const user = useSelector((state) => state.user?.esttUser)
    const bredLinks = [siteLinks.welcome, siteLinks.esttHome]
    title(siteLinks.esttHome.title)
    const [aqarYearState, setAqarYearState] = useState(null)


    const tables = [
        {
            title: "3.3 Sanctioned posts during the year",
            component: <ESTTSanctionedPostWithProof academicYear={aqarYearState} />
        },

    ]

    const tableTitles = tables.map((table) => table.title)


    return (
        <div>
            <div>
                <div className="min-h-screen">
                    <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="ESTTAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.esttHome.link} >
                        <TableAccordion AQARTables={tables} showIndex={false} />
                    </AQARStepper>

                </div>
                <Footer />
            </div>
        </div>
    )
}

export default ESTTHome

export { esttAuthParams }
