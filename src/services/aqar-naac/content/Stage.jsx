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


    const AQARTables = {
        director: [
            {
                title: 'Syllabus Revision',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'SyllabusRevision', userType: 'director'
                },
                component: <SyllabusRevision filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Employability',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Employability', userType: 'director'
                },
                component: <Employability filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Value Added Courses',
                component: <ValueAddedCource filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Projects / Internships',
                component: <ProjectsInternships filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Demand Ratio',
                component: <DemandRatio filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Seats reserved for various categories as per applicable reservation policy',
                component: <ReservedSeats filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR',
                component: <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Research Methodology Workshops',
                component: <ResearchMethodologyWorkshops filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Awards',
                component: <Awards filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Extension Activities',
                component: <ExtensionActivities filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Memorandum of Understanding (MoU)',
                component: <MoUs filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Counseling and Guidance',
                component: <CounselingAndGuidance filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Skills Enhancement Initiatives',
                component: <SkillsEnhancementInitiatives filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Qualified Exams',
                component: <QualifiedExams filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Placements',
                component: <Placements filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Progression to Higher Education',
                component: <ProgressionToHE filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Alumni Contribution',
                component: <AlumniContribution filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: 'Professional Development / Administrative Training programs organized',
                component: <TrainingProgramsOrganized filterByAcademicYear={true} academicYear={academicYear} />
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
