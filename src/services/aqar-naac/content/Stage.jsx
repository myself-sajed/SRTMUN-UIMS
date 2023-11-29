import React, { useState } from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import AQARNavbar, { navbarLinks } from '../components/AQARNavbar'
import { useParams } from 'react-router-dom'
import Footer from '../../../components/Footer'
import { authParams } from '../content/ChooseAQARYear'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material'
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
    let isDirector = userType === "director";

    const AQARTables = AQARTablesObject({ academicYear, isDirector, school })

    const [expandedAccordion, setExpandedAccordion] = useState();

    const handleChangeAccordion = (index) => {
        setExpandedAccordion(index === expandedAccordion ? null : index);
    };


    return (
        <div>
            <GoBack pageTitle={`Annual Quality Assurance Report (${academicYear})`} bredLinks={bredLinks} showAvatar={{ photoURL: users[usernames[userType]]?.photoURL, userType }} />

            <div className="my-3">
                <AQARNavbar />
            </div>

            <div className="bg-gray-100 p-2 rounded-lg">
                <p className="text-center mt-3 font-bold text-xl">
                    {stageTitle}{navbarLinks?.[stageName]?.subtitle ? `: ${navbarLinks?.[stageName]?.subtitle}` : ''}</p>
                <p className="text-center mb-3 text-sm text-muted">
                    Categories: {`(${AQARTables?.[stageName]?.length})`}
                </p>

                {/* // Render your tables here dynamically  */}
                <div className="my-5">


                    {
                        AQARTables?.[stageName].map((mainPoint, mainIndex) => {
                            return <div className={`border-[#8c8cd9] rounded-lg p-1 border-2 my-3 text-sm lg:text-base w-full`}>
                                <Accordion sx={{ boxShadow: 'none' }} TransitionProps={{ unmountOnExit: true }} expanded={expandedAccordion === mainIndex} onChange={() => handleChangeAccordion(mainIndex)}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`main-content-${mainIndex}`}
                                        id={`main-accordion-${mainIndex}`}
                                    >
                                        <Typography sx={{ color: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> {mainPoint.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableAccordion AQARTables={mainPoint?.components} showIndex={false} />
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        })
                    }






                </div>

            </div>
            <Footer />


        </div>
    )
}

export default Stage
