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
import AQARTextMatter from '../components/AQARTextMatter'
import AdminMasterTable from '../../admin/components/AdminMasterTable'

function AQARTablesObject({ academicYear, isDirector, school }) {
    return {
        "extended-profile": [],
        "criterion-1": [
            {
                title: '1.2.1 - Employability',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Employability', userType: 'director'
                },
                component: isDirector ? <Employability filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="Employability" costomParams={{ model: "Employability", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Courses focusing employability / entrepreneurship / skill development' serviceName="director" />
            },
            {
                title: '1.2.2 - Syllabus Revision ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'SyllabusRevision', userType: 'director'
                },
                component: isDirector ?
                    <SyllabusRevision filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="SyllabusRevision" costomParams={{ model: "SyllabusRevision", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Syllabus Revision' serviceName="director" />,
            },
            {
                title: '1.3.3 - Value Added Courses ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ValueAddedCource', userType: 'director'
                },
                component: isDirector ?
                    <ValueAddedCource filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="ValueAddedCource" costomParams={{ model: "ValueAddedCource", module: "Admin", filter: { Academic_year: academicYear } }} heading='Value Added Courses' serviceName="director" />,
            },
            {
                title: '1.3.4 - Projects / Internships',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ProjectsInternships', userType: 'director'
                },
                component: isDirector ?
                    <ProjectsInternships filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ProjectsInternships" costomParams={{ model: "ProjectsInternships", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Projects / Internships' serviceName="director" />,
            },
        ],
        "criterion-2": [
            {
                title: '2.1.1 - Demand Ratio',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'DemandRatio', userType: 'director'
                },
                component: isDirector ?
                    <DemandRatio filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="DemandRatio" costomParams={{ model: "DemandRatio", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Demand Ratio' serviceName="director" />,
            },
            {
                title: '2.1.2 - Seats reserved for various categories as per applicable reservation policy',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ReservedSeats', userType: 'director'
                },
                component: isDirector ?
                    <ReservedSeats filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ReservedSeats" costomParams={{ model: "ReservedSeats", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Seats reserved for various categories as per applicable reservation policy' serviceName="director" />,
            },
        ],
        "criterion-3": [
            {
                title: '3.1.3 - Teachers receiving national/ international fellowship/financial support by various agencies for advanced studies/ research  during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Fellowship', userType: 'faculty'
                },
                component: <AdminMasterTable model="Fellowship" academicYear={academicYear} school={school} heading='Fellowships' serviceName="faculty" />
            },
            {
                title: '3.1.4 - JRFs, SRFs, Post Doctoral Fellows, Research Associates and other research fellows enrolled in the institution during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'JrfSrf', userType: 'faculty'
                },
                component: <AdminMasterTable model="JrfSrf" academicYear={academicYear} school={school} heading='JRFs, SRFs, PDF, Research Associates' serviceName="faculty" />
            },
            {
                title: '3.1.6 - UGC-SAP, CAS, DST-FIST, DBT, ICSSR',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'UgcSapCasDstFistDBTICSSR', userType: 'director'
                },
                component: isDirector ?
                    <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="UgcSapCasDstFistDBTICSSR" costomParams={{ model: "UgcSapCasDstFistDBTICSSR", module: "Admin", filter: { Year_of_Award: academicYear } }} heading='UGC-SAP, CAS, DST-FIST, DBT, ICSSR' serviceName="director" />,
            },
            {
                title: '3.3.2 - Research Methodology Workshops ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ResearchMethodologyWorkshops', userType: 'director'
                },
                component: isDirector ?
                    <ResearchMethodologyWorkshops filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ResearchMethodologyWorkshops" costomParams={{ model: "ResearchMethodologyWorkshops", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Research Methodology Workshops' serviceName="director" />,
            },
            {
                title: '3.3.3 - Awards ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Award', userType: 'director'
                },
                component: isDirector ?
                    <Awards filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="Award" costomParams={{ model: "Award", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Awards' serviceName="director" />,
            },
            {
                title: '3.4.2 - Full time teachers who received awards, recognition, fellowships at State, National, International level from Government/Govt. recognised bodies during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'AwardRecognition', userType: 'faculty'
                },
                component: <AdminMasterTable model="AwardRecognition" academicYear={academicYear} school={school} heading='Award Recognition' serviceName="faculty" />
            },
            {
                title: '3.4.3 - Patents published/awarded during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Patent', userType: 'faculty'
                },
                component: <AdminMasterTable model="Patent" academicYear={academicYear} school={school} heading='Patents' serviceName="faculty" />
            },
            {
                title: '3.4.4 - Ph.D awarded during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'PhdAwarded', userType: 'faculty'
                },
                component: <AdminMasterTable model="PhdAwarded" costomParams={{
                    model: "PhdAwarded", module: "Admin", filter: { year: academicYear, degreeName: "Ph.D.", awardSubmit: 'Awarded' },
                    filterConditios: { school }
                }} heading='Ph.D Awarded' serviceName="faculty" />
            },
            {
                title: '3.4.5 - Research papers per teacher in the Journals notified on UGC website during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ResearchPapers', userType: 'faculty'
                },
                component: <AdminMasterTable model="ResearchPapers" academicYear={academicYear} school={school} heading='Research papers' serviceName="faculty" />
            },
            {
                title: '3.4.6 - Books and  Chapters in edited volumes published per teacher during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'BooksAndChapters', userType: 'faculty'
                },
                component: <AdminMasterTable model="BooksAndChapters" academicYear={academicYear} school={school} heading='Books and  Chapters' serviceName="faculty" />
            },
            {
                title: '3.4.7 - E-content is developed by teachers',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'EContentDeveloped', userType: 'faculty'
                },
                component: <AdminMasterTable model="EContentDeveloped" academicYear={academicYear} school={school} heading='E-content Developed' serviceName="faculty" />
            },
            {
                title: '3.5.2 - Consultancy Services',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ConsultancyServices', userType: 'faculty'
                },
                component: <AdminMasterTable model="ConsultancyServices" academicYear={academicYear} school={school} heading='Consultancy Services' serviceName="faculty" />
            },
            {
                title: '3.6.3 - Extension Activities ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ExtensionActivities', userType: 'director'
                },
                component: isDirector ?
                    <ExtensionActivities filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ExtensionActivities" costomParams={{ model: "ExtensionActivities", module: "Admin", filter: { Year_of_activity: academicYear } }} heading='Extension Activities' serviceName="director" />,
            },
            {
                title: '3.7.1 - Collaborative activities and academic development of faculty and students during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Collaboration', userType: 'faculty'
                },
                component: <AdminMasterTable model="Collaboration" academicYear={academicYear} school={school} heading='Collaborations' serviceName="faculty" />
            },
            {
                title: '3.7.2 - Memorandum of Understanding (MoU) ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'MoUs', userType: 'director'
                },
                component: isDirector ?
                    <MoUs filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="MoUs" costomParams={{ model: "MoUs", module: "Admin", filter: { Academic_Year: academicYear } }} heading='MoUs' serviceName="director" />,
            },
        ],
        "criterion-4": [],
        "criterion-5": [
            {
                title: '5.1.2 - Counseling and Guidance ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'CounselingAndGuidance', userType: 'director'
                },
                component: isDirector ?
                    <CounselingAndGuidance filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="CounselingAndGuidance" costomParams={{ model: "CounselingAndGuidance", module: "Admin", filter: { Year_of_Activity: academicYear } }} heading='Counseling and Guidance' serviceName="director" />,
            },
            {
                title: '5.1.3 - Skills Enhancement Initiatives',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'SkillsEnhancementInitiatives', userType: 'director'
                },
                component: isDirector ?
                    <SkillsEnhancementInitiatives filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="SkillsEnhancementInitiatives" costomParams={{ model: "SkillsEnhancementInitiatives", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Skills Enhancement Initiatives' serviceName="director" />,
            },
            {
                title: '5.2.1 - Qualified Exams',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'QualifiedExams', userType: 'director'
                },
                component: isDirector ?
                    <QualifiedExams filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="QualifiedExams" costomParams={{ model: "QualifiedExams", module: "Admin", filter: { Acadmic_year: academicYear } }} heading='Qualified Exams' serviceName="director" />,
            },
            {
                title: '5.2.2 - Placements',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Placement', userType: 'director'
                },
                component: isDirector ?
                    <Placements filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="Placement" costomParams={{ model: "Placement", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Placements' serviceName="director" />,
            },
            {
                title: '5.2.3 - Progression to Higher Education',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ProgressionToHE', userType: 'director'
                },
                component: isDirector ?
                    <ProgressionToHE filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ProgressionToHE" costomParams={{ model: "ProgressionToHE", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Progression to Higher Education' serviceName="director" />,
            },
        ],
        "criterion-6": [
            {
                title: '6.3.3 - Professional Development / Administrative Training programs organized',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'TrainingProgramsOrganized', userType: 'director'
                },
                component: isDirector ?
                    <TrainingProgramsOrganized filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="TrainingProgramsOrganized" costomParams={{ model: "TrainingProgramsOrganized", module: "Admin", filter: { Year: academicYear } }} heading='Professional Development / Administrative Training Programs Organized' serviceName="director" />,
            },
            {
                title: '6.3.4 - Teachers undergoing online/ face-to-face  Faculty Development Programmes (FDP)during  the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Online', userType: 'faculty'
                },
                component: <AdminMasterTable model="Online" academicYear={academicYear} school={school} heading='Orientation / Refresher Course (FDP)' serviceName="faculty" />
            },
        ],
        "criterion-7": [],
        director: [

            {
                title: 'Alumni Contribution',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'AlumniContribution', userType: 'director'
                },
                component: <AlumniContribution filterByAcademicYear={true} academicYear={academicYear} />
            },


        ]
    }
}


export default AQARTablesObject