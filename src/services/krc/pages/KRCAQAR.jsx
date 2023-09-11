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



const KRCAQAR = () => {
    title(siteLinks.krcAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.krcHome, siteLinks.krcAQAR]
    const user = useSelector((state) => state.user.krcUser)
    useOtherServiceAuth({ ...krcAuthParams, shouldNavigate: false })
    const [aqarYearState, setAqarYearState] = useState(null)

    // data states
    const [checkData, setCheckData] = useState(null)
    const [checkFile, setCheckFile] = useState(null)

    const [usage, setUsage] = useState(null)
    const [usageFile, setUsageFile] = useState(null)



    const AQARTables = [
        {
            title: "4.2.2 - Institution has subscription for e-Library resources Library has regular subscription for the following",
            component: <AQARCheckWithProof setCheckData={setCheckData} checkData={checkData} />
        },
        {
            title: "4.2.3 - Annual expenditure for purchase of books / e-books and subscription to journals / e-journals during the year (INR in Lakhs)",
            component: <SubscriptionForKRC filterByAcademicYear={aqarYearState} />
        },
        {
            title: "4.2.4 - Number of usage of library by teachers and students per day (foot falls and login data for online access)",
            component: <AQARLibraryUsage setUsage={setUsage} usage={usage} />
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

const AQARLibraryUsage = ({ setUsage, usage }) => {
    return <div className="grid grid-cols-2 gap-4">
        <div className="col-md-6">
            <label htmlFor="usage" className="form-label">Number of usage</label>
            <input type="number" value={usage} onChange={(e) => setUsage(() => e.target.value)} className="form-control" id="usage" placeholder="Usage by Students and Teachers" />
        </div>
        {
            usage && <div>
                <label htmlFor="usageFile" className="form-label">Upload Relevant document</label>
                <input type="file" className="form-control" id="usageFile" placeholder="by Students and Teachers" />
            </div>
        }
    </div>
}


