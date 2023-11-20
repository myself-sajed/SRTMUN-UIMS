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
import AQARTextMatter from '../components/AQARTextMatter'

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
        "criterion-1": [
            {
                title: '1.2.1 - Employability',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Employability', userType: 'director'
                },
                component: <Employability filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: '1.2.2 - Syllabus Revision ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'SyllabusRevision', userType: 'director'
                },
                component: <SyllabusRevision filterByAcademicYear={true} academicYear={academicYear} />,
            },
            {
                title: '1.3.3 - Value Added Courses ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ValueAddedCource', userType: 'director'
                },
                component: <ValueAddedCource filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: '1.3.4 - Projects / Internships',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ProjectsInternships', userType: 'director'
                },
                component: <ProjectsInternships filterByAcademicYear={true} academicYear={academicYear} />
            },
        ],
        "criterion-2": [
            {
                title: '2.1.1 - Demand Ratio',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'DemandRatio', userType: 'director'
                },
                component: <DemandRatio filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: '2.1.2 - Seats reserved for various categories as per applicable reservation policy',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ReservedSeats', userType: 'director'
                },
                component: <ReservedSeats filterByAcademicYear={true} academicYear={academicYear} />
            },
        ],
        "criterion-3": [
            {
                title: '3.1.6 - UGC-SAP, CAS, DST-FIST, DBT, ICSSR',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'UgcSapCasDstFistDBTICSSR', userType: 'director'
                },
                component: <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: '3.3.2 - Research Methodology Workshops ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ResearchMethodologyWorkshops', userType: 'director'
                },
                component: <ResearchMethodologyWorkshops filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: '3.3.3 - Awards ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Award', userType: 'director'
                },
                component: <Awards filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: '3.6.3 - Extension Activities ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ExtensionActivities', userType: 'director'
                },
                component: <ExtensionActivities filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: '3.7.2 - Memorandum of Understanding (MoU) ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'MoUs', userType: 'director'
                },
                component: <MoUs filterByAcademicYear={true} academicYear={academicYear} />
            },
        ],
        "criterion-5": [
            {
                title: '5.1.2 - Counseling and Guidance ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'CounselingAndGuidance', userType: 'director'
                },
                component: <CounselingAndGuidance filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: '5.1.3 - Skills Enhancement Initiatives',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'SkillsEnhancementInitiatives', userType: 'director'
                },
                component: <SkillsEnhancementInitiatives filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: '5.2.1 - Qualified Exams',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'QualifiedExams', userType: 'director'
                },
                component: <QualifiedExams filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: '5.2.2 - Placements',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Placement', userType: 'director'
                },
                component: <Placements filterByAcademicYear={true} academicYear={academicYear} />
            },
            {
                title: '5.2.3 - Progression to Higher Education',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ProgressionToHE', userType: 'director'
                },
                component: <ProgressionToHE filterByAcademicYear={true} academicYear={academicYear} />
            },
        ],
        "criterion-6": [
            {
                title: '6.3.3 - Professional Development / Administrative Training programs organized',
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
                    <TableAccordion AQARTables={AQARTables?.[stageName]} showIndex={false} />
                </div>

            </div>
            <Footer />


        </div>
    )
}

export default Stage
