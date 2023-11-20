import React from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import AQARNavbar, { navbarLinks } from '../components/AQARNavbar'
import { useParams } from 'react-router-dom'
import Footer from '../../../components/Footer'
import { authParams } from '../content/ChooseAQARYear'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import SyllabusRevision from '../../director/pages/SyllabusRevision'
import Employability from '../../director/pages/Employability'
import ValueAddedCource from '../../director/pages/ValueAddedCource'
import ProjectsInternships from '../../director/pages/ProjectsInternships'
import DemandRatio from '../../director/pages/DemandRatio'
import ReservedSeats from '../../director/pages/ReservedSeats'
import UgcSapCasDstFistDbtICssr from '../../director/pages/UgcSapCasDstFistDBTICSSR'
import ResearchMethodologyWorkshops from '../../director/pages/ResearchMethodologyWorkshops'
import Awards from '../../director/pages/Awards'
import ExtensionActivities from '../../director/pages/ExtensionActivities'
import MoUs from '../../director/pages/MoUs'
import CounselingAndGuidance from '../../director/pages/CounselingAndGuidance'
import SkillsEnhancementInitiatives from '../../director/pages/SkillsEnhancementInitiatives'
import QualifiedExams from '../../director/pages/QualifiedExams'
import Placements from '../../director/pages/Placements'
import ProgressionToHE from '../../director/pages/ProgressionToHE'
import AlumniContribution from '../../director/pages/AlumniContribution'
import TrainingProgramsOrganized from '../../director/pages/TrainingProgramsOrganized'
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion'
import { useSelector } from 'react-redux'

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


    console.log(users);


    const AQARTables = {
        criterion1: [
            {
                title: 'Employability 1.2.1',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Employability', userType: 'director'
                },
                component: <Employability filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Syllabus Revision 1.2.2',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'SyllabusRevision', userType: 'director'
                },
                component: <SyllabusRevision filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Value Added Courses 1.3.3',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ValueAddedCource', userType: 'director'
                },
                component: <ValueAddedCource filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Projects / Internships 1.3.4',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ProjectsInternships', userType: 'director'
                },
                component: <ProjectsInternships filterByAcademicYear={true} academicYear={academicYear} />
            },
        ],
        criterion2: [
            {
                title: 'Demand Ratio 2.1.1',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'DemandRatio', userType: 'director'
                },
                component: <DemandRatio filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Seats reserved for various categories as per applicable reservation policy 2.1.2',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ReservedSeats', userType: 'director'
                },
                component: <ReservedSeats filterByAcademicYear={true} academicYear={academicYear} />
            },
        ],
        criterion3: [
            {
                title: 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR 3.1.6',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'UgcSapCasDstFistDBTICSSR', userType: 'director'
                },
                component: <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Research Methodology Workshops 3.3.2',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ResearchMethodologyWorkshops', userType: 'director'
                },
                component: <ResearchMethodologyWorkshops filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Awards 3.3.3',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Award', userType: 'director'
                },
                component: <Awards filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Extension Activities 3.6.3',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ExtensionActivities', userType: 'director'
                },
                component: <ExtensionActivities filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Memorandum of Understanding (MoU) 3.7.2',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'MoUs', userType: 'director'
                },
                component: <MoUs filterByAcademicYear={true} academicYear={academicYear} />
            },
        ],
        criterion5: [
            {
                title: 'Counseling and Guidance 5.1.2',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'CounselingAndGuidance', userType: 'director'
                },
                component: <CounselingAndGuidance filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Skills Enhancement Initiatives 5.1.3',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'SkillsEnhancementInitiatives', userType: 'director'
                },
                component: <SkillsEnhancementInitiatives filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Qualified Exams 5.2.1',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'QualifiedExams', userType: 'director'
                },
                component: <QualifiedExams filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Placements 5.2.2',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Placement', userType: 'director'
                },
                component: <Placements filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Progression to Higher Education 5.2.3',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ProgressionToHE', userType: 'director'
                },
                component: <ProgressionToHE filterByAcademicYear={true} academicYear={academicYear} />
            },
        ],
        criterion6: [
            {
                title: 'Professional Development / Administrative Training programs organized 6.3.3',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'TrainingProgramsOrganized', userType: 'director'
                },
                component: <TrainingProgramsOrganized filterByAcademicYear={true} academicYear={academicYear} />
            },
        ],
        director: [
            
            {
                title: 'Alumni Contribution',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ProjectsInternships', userType: 'director'
                },
                component: <AlumniContribution filterByAcademicYear={true} academicYear={academicYear} />
            },
            

        ]
    }

    return (
        <div>
            <GoBack pageTitle={`Annual Quality Assurance Report (${academicYear})`} bredLinks={bredLinks} showAvatar={{ photoURL: users[usernames[userType]]?.photoURL, userType }} />

            <div className="my-3">
                <AQARNavbar />
            </div>

            <div className="bg-gray-100 p-2 rounded-lg">
                <p className="text-center my-3 font-bold text-xl">{stageTitle}</p>

                {/* // Render your tables here dynamically  */}
                <div className="my-5">
                    <TableAccordion AQARTables={AQARTables?.[userType]} />
                </div>

            </div>
            <Footer />


        </div>
    )
}

export default Stage
