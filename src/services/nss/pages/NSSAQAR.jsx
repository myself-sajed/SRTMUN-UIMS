import React from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import { useSelector } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import AQARStepper from '../../dsd/components/AQARStepper';
import { nssAuthParams } from './NSSHome';
import NssAwardByInstitution from './NssAwardByInstitution';
import NssExtensionActivity from './NssExtensionActivity';



const NSSAQAR = () => {
    title(siteLinks.nssAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.nssHome, siteLinks.nssAQAR]
    const user = useSelector((state) => state.user.nssUser)
    useOtherServiceAuth({ ...nssAuthParams, shouldNavigate: false })

    const AQARTables = [
        {
            title: "[3.6.2] Awards received by the Institution, its teachers and students from Government / Government recognised bodies in recognition of the extension activities carried out  during the year",
            component: <NssAwardByInstitution />
        },
        {
            title: "[3.6.3] Extension and outreach programs conducted  by the institution through NSS/NCC/Red cross/YRC etc. during the year ( including  Government initiated programs such as Swachh Bharat, Aids Awareness, Gender Issue, etc. and those organised in collaboration with industry, community and NGOs) ",
            component: <NssExtensionActivity />
        },
    ]

    const tableTitles = AQARTables.map((table) => table.title)


    return (
        <div className="h-screen">
            <AQARStepper bredLinks={bredLinks} submitModel="NSSAQAR" user={user} tableTitles={tableTitles} navigateToAfterSubmission={siteLinks.nssHome.link} >
                <TableAccordion AQARTables={AQARTables} />
            </AQARStepper>

            <div className="mt-5">
                <Footer />
            </div>
        </div>
    )
}

export default NSSAQAR
