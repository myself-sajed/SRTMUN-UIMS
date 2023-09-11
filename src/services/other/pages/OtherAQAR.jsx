import React, { useState } from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import AQARStepper from '../../dsd/components/AQARStepper';
import TotalExpenditure from './TotalExpenditure';
import OtherDemandRatio from './OtherDemandRatio';
import { TableSupportingProof } from '../../exam/pages/ExamAQAR';



const OtherAQAR = () => {
    title(siteLinks.otherAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.otherAQAR]
    const user = { department: "Expenditure and Demand Ratio" }
    const [aqarYearState, setAqarYearState] = useState(null)



    const AQARTables = [
        {
            title: "2.1.1 - Demand Ratio",
            component: <OtherDemandRatio filterByAcademicYear={aqarYearState} />
        },
        {
            title: "4.1.4 - Total Expenditure (FAO)",
            component: <Expenditure aqarYearState={aqarYearState} />
        }
    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="OtherAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={'/'} >

                    <TableAccordion AQARTables={AQARTables} showIndex={false} />

                </AQARStepper>

            </div>
            <Footer />
        </div>
    )
}

export default OtherAQAR


const Expenditure = ({ aqarYearState }) => {
    return <div>
        <TableSupportingProof />
        <TotalExpenditure filterByAcademicYear={aqarYearState} />
    </div>
}

