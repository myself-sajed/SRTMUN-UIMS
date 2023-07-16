import React, { useEffect, useState } from 'react'

// other imports
import { useSelector } from 'react-redux'
import UserLoading from '../../../../../pages/UserLoading'
import useScroll from '../../../../../hooks/useScroll'

// importing faculty components
import AwardRecognition from '../../../tables/AwardRecognition'
import Fellowship from '../../../tables/Fellowship'
import JRFSRF from '../../../tables/JRFSRF'
import PatentPublished from '../../../tables/PatentPublished'
import PHDAwarded from '../../../tables/PHDAwarded'
import ResearchProjects from '../../../tables/ResearchProjects'
import ResearchPapersUGC from '../../../tables/ResearchPapersUGC'
import BooksAndChapters from '../../../tables/BooksAndChapters'
import EContentDeveloped from '../../../tables/EContentDeveloped'
import ConsultancyServices from '../../../tables/ConsultancyServices'
import FinancialSupportToAttendConferences from '../../../tables/FinancialSupportToAttendConferences'
import OnlineFDP from '../../../tables/OnlineFDP'

// importing director components
import SyllabusRevision from '../../../../director/pages/SyllabusRevision';
import Employability from '../../../../director/pages/Employability';
import ValueAddedCource from '../../../../director/pages/ValueAddedCource';
import ProjectsInternships from '../../../../director/pages/ProjectsInternships';
import DemandRatio from '../../../../director/pages/DemandRatio';
import ReservedSeats from '../../../../director/pages/ReservedSeats';
import UgcSapCasDstFistDbtICssr from '../../../../director/pages/UgcSapCasDstFistDBTICSSR';
import ResearchMethodologyWorkshops from '../../../../director/pages/ResearchMethodologyWorkshops';
import Awards from '../../../../director/pages/Awards';
import ExtensionActivities from '../../../../director/pages/ExtensionActivities';
import MoUs from '../../../../director/pages/MoUs';
import CounselingAndGuidance from '../../../../director/pages/CounselingAndGuidance';
import SkillsEnhancementInitiatives from '../../../../director/pages/SkillsEnhancementInitiatives';
import QualifiedExams from '../../../../director/pages/QualifiedExams';
import Placements from '../../../../director/pages/Placements';
import ProgressionToHE from '../../../../director/pages/ProgressionToHE';
import AlumniContribution from '../../../../director/pages/AlumniContribution';
import TrainingProgramsOrganized from '../../../../director/pages/TrainingProgramsOrganized';
import TableAccordion from './TableAccordion'

const AQARForm = ({ userType = 'faculty' }) => {

    useScroll()
    const aqarYear = useSelector((state) => state.aqar.aqarYear)


    const AQARTables = {
        faculty: [
            {
                title: "Research papers per teacher in the Journals notified on UGC website during the year",
                component: <ResearchPapersUGC filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: "The institution provides seed money to its teachers for research (amount INR in Lakhs)",
                component: <ResearchProjects filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: "Full time teachers who received awards, recognition, fellowships at State, National, International level from Government/Govt. recognised bodies during the year",
                component: <AwardRecognition filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: "Teachers receiving national/ international fellowship/financial support by various agencies for advanced studies/ research during the year",
                component: <Fellowship filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: "JRFs, SRFs, Post-Doctoral Fellows, Research Associates and other research fellows enrolled in the institution during the year",
                component: <JRFSRF filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: "Patents published/awarded during the year",
                component: <PatentPublished filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: 'Ph.D Awarded during the year',
                component: <PHDAwarded filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: "Books and chapters in edited volumes published per teacher during the year",
                component: <BooksAndChapters filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: 'E-content is developed by teachers',
                component: <EContentDeveloped filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: 'Consultancy Services',
                component: <ConsultancyServices filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: "Teachers provided with financial support to attend conferences / workshops and towards membership fee of professional bodies during the year",
                component: <FinancialSupportToAttendConferences filterByAcademicYear={true} academicYear={aqarYear} />,
            },
            {
                title: 'Teachers undergoing online/ face-to-face Faculty Development Programmes (FDP) during the year',
                component: <OnlineFDP filterByAcademicYear={true} academicYear={aqarYear} />,
            },
        ],
        director: [
            {
                title: 'Syllabus Revision',
                component: <SyllabusRevision filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Employability',
                component: <Employability filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Value Added Courses',
                component: <ValueAddedCource filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Projects / Internships',
                component: <ProjectsInternships filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Demand Ratio',
                component: <DemandRatio filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Seats reserved for various categories as per applicable reservation policy',
                component: <ReservedSeats filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR',
                component: <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Research Methodology Workshops',
                component: <ResearchMethodologyWorkshops filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Awards',
                component: <Awards filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Extension Activities',
                component: <ExtensionActivities filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Memorandum of Understanding (MoU)',
                component: <MoUs filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Counseling and Guidance',
                component: <CounselingAndGuidance filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Skills Enhancement Initiatives',
                component: <SkillsEnhancementInitiatives filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Qualified Exams',
                component: <QualifiedExams filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Placements',
                component: <Placements filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Progression to Higher Education',
                component: <ProgressionToHE filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Alumni Contribution',
                component: <AlumniContribution filterByAcademicYear={true} academicYear={aqarYear} />
            },
            {
                title: 'Professional Development / Administrative Training programs organized',
                component: <TrainingProgramsOrganized filterByAcademicYear={true} academicYear={aqarYear} />
            },

        ]
    }

    return (
        <div>



            {
                !aqarYear ? <UserLoading title="Loading Form" /> :
                    <div className="my-5">
                        <TableAccordion AQARTables={AQARTables[userType]} />
                    </div>

            }


        </div>
    )
}


export default AQARForm
