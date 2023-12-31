import React, { useState } from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion, { AQARSection } from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import { useSelector } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import AQARStepper from '../../dsd/components/AQARStepper';
import { krcAuthParams } from './KRCHome';
import SubscriptionForKRC from './SubscriptionForKRC';
import AQARCheckWithProof from '../components/AQARCheckWithProof';
import AQARLibraryUsageWithProof from '../components/AQARLibraryUsageWithProof';
import AQARTextMatter from '../../aqar-naac/components/AQARTextMatter';



const KRCAQAR = () => {
    title(siteLinks.krcAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.krcHome, siteLinks.krcAQAR]
    const user = useSelector((state) => state.user.krcUser)
    useOtherServiceAuth({ ...krcAuthParams, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)

    const [usage, setUsage] = useState(null)
    const [usageFile, setUsageFile] = useState(null)



    const AQARTables = [
        {
            id: "4.2.1",
            title: "4.2.1 - Library is automated using Integrated Library Management System (ILMS) and has digitisation facility",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '4.2.1', userType: 'krc', school: "KRC"
            },
            component: <AQARTextMatter academicYear={aqarYearState} school={"KRC"} matterType='4.2.1' userType='krc' />

        },
        {
            title: "4.2.2 - Institution has subscription for e-Library resources Library has regular subscription for the following",
            component: <AQARCheckWithProof academicYear={aqarYearState} />
        },
        {
            title: "4.2.3 - Annual expenditure for purchase of books / e-books and subscription to journals / e-journals during the year (INR in Lakhs)",
            hasSupportingDocument: true,
            proofData: {
                academicYear: aqarYearState, proofType: '4.2.3', userType: 'krc', school: "KRC"
            },
            component: <SubscriptionForKRC filterByAcademicYear={aqarYearState} />
        },
        {
            title: "4.2.4 - Number of usage of library by teachers and students per day (foot falls and login data for online access)",
            component: <AQARLibraryUsageWithProof academicYear={aqarYearState} setUsage={setUsage} usage={usage} />
        },
    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="KRCAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.krcHome.link} >

                    <TableAccordion AQARTables={AQARTables} showIndex={false} />

                </AQARStepper>

            </div>
            <Footer />
        </div>
    )
}

export default KRCAQAR




