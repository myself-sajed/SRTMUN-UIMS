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
            // todo 1.1.1 text area
            {
                title: '1.1.2 - Programmes for which syllabus revision was carried out during the Academic year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'SyllabusRevision', userType: 'director'
                },
                component: isDirector ?
                    <SyllabusRevision filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="SyllabusRevision" customParams={{ model: "SyllabusRevision", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Syllabus Revision' serviceName="director" proof= "Upload_Proof" />,
            },
            {
                title: '1.1.3 - Programmes/ courses focussed on employability/ entrepreneurship/ skill development during the Academic year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Employability', userType: 'director'
                },
                component: isDirector ? <Employability filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="Employability" customParams={{ model: "Employability", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Courses focusing employability / entrepreneurship / skill development' serviceName="director" proof= "Upload_Proof" />
            },
            {
                title: '1.2.1 - New programmes/courses introduced during the Academic year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Employability', userType: 'director'
                },
                component: isDirector ? <Employability filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="Employability" customParams={{ model: "Employability", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Courses focusing employability / entrepreneurship / skill development' serviceName="director" proof= "Upload_Proof" />
            },
            {
                title: '1.2.2 - Programmes in which Choice Based Credit System (CBCS)/Elective Course System implemented at the University level during the Academic year.',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'SyllabusRevision', userType: 'director'
                },
                component: isDirector ?
                    <SyllabusRevision filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="SyllabusRevision" customParams={{ model: "SyllabusRevision", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Syllabus Revision' serviceName="director"  proof= "Upload_Proof" />,
            },
            // todo 1.3
                // ? textarea title - 1.3.2 
             {
                title: '1.3.2 - Value-added courses imparting transferable and life skills offered during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ValueAddedCource', userType: 'director'
                },
                component: isDirector ?
                    <ValueAddedCource filterByAcademicYear={true} academicYear={academicYear} /> : <AdminMasterTable model="ValueAddedCource" customParams={{ model: "ValueAddedCource", module: "Admin", filter: { Academic_year: academicYear } }} heading='Value Added Courses' serviceName="director" proof= "Upload_Proof" />,
            },
            {
                title: '1.3.3 - Field Projects / Internships under taken during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ProjectsInternships', userType: 'director'
                },
                component: isDirector ?
                    <ProjectsInternships filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ProjectsInternships" customParams={{ model: "ProjectsInternships", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Projects / Internships' serviceName="director" proof= "Upload_Proof" />,
            },
            // todo 1.4 
                // ? 1.4.1
                // ? 1.4.2 student/teacher/employee/alumni/parent feedback

        ],
        "criterion-2": [
            // ?   2.1
            {
                title: '2.1.1 - Demand Ratio during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'DemandRatio', userType: 'director'
                },
                component: isDirector ?
                    <DemandRatio filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="DemandRatio" customParams={{ model: "DemandRatio", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Demand Ratio' serviceName="director" proof="Upload_Proof" />,
            },
            {
                title: '2.1.2 - Total number of seats filled against reserved categories (SC, ST, OBC, Divyangjan, etc.) as per applicable reservation policy during the year (Excluding Supernumerary Seats)',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ReservedSeats', userType: 'director'
                },
                component: isDirector ?
                    <ReservedSeats filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ReservedSeats" customParams={{ model: "ReservedSeats", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Seats reserved for various categories as per applicable reservation policy' serviceName="director" proof= "Upload_Proof" />,
            },

            // todo 2.2 
                // ? textarea  title - 2.2.1 - The institution assesses the learning levels of the studentsand organises special Programmes for advanced learners and slow learners
                // ? ????? title - 2.2.2 - Student - Full time teacher ratio during the year

            // todo 2.3 
                // ? textarea title - 2.3.1 - Student centric methods, such as experiential learning, participative learning and problem-solving methodologies are used for enhancing learning experiences
                // ? textarea title - 2.3.2 - Teachers use ICT enabled tools including online resources for effective teaching and learning processes during the year 
                // ? ????? title - 2.3.3 - Ratio of students to mentor for academic and other related issues during the year
                
            // todo 2.4
            {
                title: '2.4.1 - Total Number of full time teachers against sanctioned posts during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'EsttFullTimeTeacherAgainstSanctioned', userType: 'estt'
                },
                component: !isDirector&&<AdminMasterTable model="EsttFullTimeTeacherAgainstSanctioned" customParams={{ model: "EsttFullTimeTeacherAgainstSanctioned", module: "Admin", filter: { academicYear } }} heading='Full Time Teachers Against Sanctioned Posts' serviceName="estt" />
            },
                // ? table title - 2.4.2 - Total Number of full time teachers withPh.D./D.M/M.Ch./D.N.B Superspeciality/D.Sc./D’Lit. during the year 
            {
                title: '2.4.3 - Total teaching experience of full time teachers in the same institution during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'EsttFullTimeTeacherAgainstSanctioned', userType: 'estt'
                },
                component: !isDirector&&<AdminMasterTable model="EsttFullTimeTeacherAgainstSanctioned" customParams={{ model: "EsttFullTimeTeacherAgainstSanctioned", module: "Admin", filter: { academicYear } }} heading='Full Time Teachers Against Sanctioned Posts' serviceName="estt" />
            },
            {
                title: '2.4.4 - Total number of full time teachers who received awards, recognition, fellowships at State, National, International level from Government/Govt. recognised bodies during the year ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'AwardRecognition', userType: 'faculty'
                },
                component: <AdminMasterTable model="AwardRecognition" academicYear={academicYear} school={school} heading='Award Recognition' serviceName="faculty" proof="proof" />
            },
            // todo 2.5
            {
                title: '2.5.1 - Number of days from the date of last semester-end/ year- end examination till the declaration of results during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'DateOfResultDiclaration', userType: 'faculty'
                },
                component: <AdminMasterTable model="DateOfResultDiclaration" customParams={{ model: "DateOfResultDiclaration", module: "Admin", filter: { academicYear } }} heading='Date Of Result Declaration' serviceName="exam" />
            },
            {
                title: '2.5.2 - Total number of student complaints/grievances about evaluation against total number appeared in the examinations during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'StudentComplaintsGrievances', userType: 'faculty'
                },
                component: <AdminMasterTable model="StudentComplaintsGrievances" customParams={{ model: "StudentComplaintsGrievances", module: "Admin", filter: { academicYear } }} heading='Student Complaints Grievances' serviceName="exam"/>
            },
                // ? textarea title - 2.5.3 - IT integration and reforms in the examination procedures and processes (continuous internal assessment and end-semester assessment) have brought in considerable improvement in examination management system of the institution
                // ? table title - 2.5.4 - Status of automation of Examination division along with approved Examination Manual
            // todo 2.6
                // ? textarea title - 2.6.1 - The institution has stated learning outcomes (generic and programme specific)/graduate attributes which are integrated into the assessment process and widely publicized through the website and other documents 
                // ? textarea title - 2.6.2 - Attainment of Programme outcomes, Programme specific outcomes and course outcomes are evaluated by the institution during the year
                {
                    title: '2.6.3 - Number of students passed during the year',
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: 'ExamPassedDuringYear', userType: 'faculty'
                    },
                    component: <AdminMasterTable model="ExamPassedDuringYear" customParams={{ model: "ExamPassedDuringYear", module: "Admin", filter: { academicYear } }} heading='Students passed during the year' serviceName="exam"/>
                },
            // todo 2.7
                // ? 2.7.1 - Student Satisfaction Survey (SSS) on overall institutional performance (Institution may design its own questionnaire) (results and details need to be provided as a web link)

        ],
        "criterion-3": [
            // todo 3.1
                // ? textarea  title - 3.1.1 - The institution Research facilities are frequently updated and there is well defined policy for promotion of research which is uploaded on the institutional website and implemented
                // ? table  title - 3.1.2 - The institution provides seed money to its teachers for research (amount INR in Lakhs)
            {
                title: '3.1.3 - Teachers awarded National/International fellowship for advanced studies/ research during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Fellowship', userType: 'faculty'
                },
                component: <AdminMasterTable model="Fellowship" academicYear={academicYear} school={school} heading='Fellowships' serviceName="faculty" proof="proof" />
            },
            {
                title: '3.1.4 - Number of JRFs, SRFs, Post Doctoral Fellows, Research Associates and other fellows in the Institution enrolled during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'JrfSrf', userType: 'faculty'
                },
                component: <AdminMasterTable model="JrfSrf" academicYear={academicYear} school={school} heading='JRFs, SRFs, PDF, Research Associates' serviceName="faculty" proof="proof" />
            },
                // ? ????? 3.1.5 - Institution has the following facilities to support research
            {
                title: '3.1.6 - Number of departments with UGC-SAP, CAS, DST-FIST, DBT, ICSSR and other recognitions by national and international agencies during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'UgcSapCasDstFistDBTICSSR', userType: 'director'
                },
                component: isDirector ?
                    <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="UgcSapCasDstFistDBTICSSR" customParams={{ model: "UgcSapCasDstFistDBTICSSR", module: "Admin", filter: { Year_of_Award: academicYear } }} heading='UGC-SAP, CAS, DST-FIST, DBT, ICSSR' serviceName="director" proof= "Upload_Proof" />,
            },
            // * 3.2
            {
                title: '3.2.1 - Extramural funding for Research (Grants sponsored by the non-government sources such as industry, corporate houses, international bodies for research projects) endowments, Chairs in the University during the year (INR in Lakhs)',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'UgcSapCasDstFistDBTICSSR', userType: 'director'
                },
                component: isDirector ?
                    <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="UgcSapCasDstFistDBTICSSR" customParams={{ model: "UgcSapCasDstFistDBTICSSR", module: "Admin", filter: { Year_of_Award: academicYear } }} heading='UGC-SAP, CAS, DST-FIST, DBT, ICSSR' serviceName="director" proof= "Upload_Proof" />,
            },
            {
                title: '3.2.2 - Grants for research projects sponsored by the government agencies during the year (INR in Lakhs)',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'UgcSapCasDstFistDBTICSSR', userType: 'director'
                },
                component: isDirector ?
                    <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="UgcSapCasDstFistDBTICSSR" customParams={{ model: "UgcSapCasDstFistDBTICSSR", module: "Admin", filter: { Year_of_Award: academicYear } }} heading='UGC-SAP, CAS, DST-FIST, DBT, ICSSR' serviceName="director" proof= "Upload_Proof" />,
            },
            {
                title: '3.2.3 - Number of research projects per teacher funded by government and non-government agencies during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'UgcSapCasDstFistDBTICSSR', userType: 'director'
                },
                component: isDirector ?
                    <UgcSapCasDstFistDbtICssr filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="UgcSapCasDstFistDBTICSSR" customParams={{ model: "UgcSapCasDstFistDBTICSSR", module: "Admin", filter: { Year_of_Award: academicYear } }} heading='UGC-SAP, CAS, DST-FIST, DBT, ICSSR' serviceName="director" proof= "Upload_Proof" />,
            },
            // todo 3.3
                // ? textarea title - 3.3.1 - Institution has created an eco-system for innovations including Incubation centre and other initiatives for creation and transfer of knowledge
            {
                title: '3.3.2 - Number of workshops/seminars conducted on Research Methodology, Intellectual Property Rights (IPR), Entrepreneurship and Skill Development during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ResearchMethodologyWorkshops', userType: 'director'
                },
                component: isDirector ?
                    <ResearchMethodologyWorkshops filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ResearchMethodologyWorkshops" customParams={{ model: "ResearchMethodologyWorkshops", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Research Methodology Workshops' serviceName="director" proof= "Upload_Proof" />,
            },
            {
                title: '3.3.3 - Number of awards / recognitions received for research/innovations by the institution/teachers/research scholars/students during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Award', userType: 'director'
                },
                component: isDirector ?
                    <Awards filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="Award" customParams={{ model: "Award", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Awards' serviceName="director" proof= "Upload_Proof" />,
            },
            // todo 3.4
                // ? ????? title - 3.4.1 - The institution ensures implementation of its stated Code of Ethics for research
            {
                title: '3.4.2 - The institution provides incentives to teachers who receive state, national and international recognitions/awards',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'AwardRecognition', userType: 'faculty'
                },
                component: <AdminMasterTable model="AwardRecognition" academicYear={academicYear} school={school} heading='Award Recognition' serviceName="faculty" proof="proof" />
            },
            {
                title: '3.4.3 - Number of Patents published/awarded during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Patent', userType: 'faculty'
                },
                component: <AdminMasterTable model="Patent" academicYear={academicYear} school={school} heading='Patents' serviceName="faculty" proof="proof" />
            },
            {
                title: '3.4.4 - Number of Ph.D’s awarded per teacher during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'PhdAwarded', userType: 'faculty'
                },
                component: <AdminMasterTable model="PhdAwarded" customParams={{
                    model: "PhdAwarded", module: "Admin", filter: { year: academicYear, degreeName: "Ph.D.", awardSubmit: 'Awarded' },
                    filterConditios: { school }
                }} heading='Ph.D Awarded' serviceName="faculty" proof="proof" />
            },
            {
                title: '3.4.5 - Number of research papers per teacher in the Journals notified on UGC website during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ResearchPapers', userType: 'faculty'
                },
                component: <AdminMasterTable model="ResearchPapers" academicYear={academicYear} school={school} heading='Research papers' serviceName="faculty" proof="proof" />
            },
            {
                title: '3.4.6 - Number of books and chapters in edited volumes published per teacher during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'BooksAndChapters', userType: 'faculty'
                },
                component: <AdminMasterTable model="BooksAndChapters" academicYear={academicYear} school={school} heading='Books and  Chapters' serviceName="faculty" proof="proof" />
            },
            {
                title: '3.4.7 - E-content is developed by teachers',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'EContentDeveloped', userType: 'faculty'
                },
                component: <AdminMasterTable model="EContentDeveloped" academicYear={academicYear} school={school} heading='E-content Developed' serviceName="faculty" proof="proof" />
            },
                // ? ????? title - 3.4.8 - Bibliometrics of the publications during the year based on average Citation Index in Scopus/ Web of Science/PubMed
                // ? ????? title - 3.4.9 - Bibliometrics of the publications during the year based on Scopus/ Web of Science – h-Index of the University

            // todo 3.5
                // ? textarea title - 3.5.1 - Institution has a policy on consultancy including revenue sharing between the institution and the individual and encourages its faculty to undertake consultancy
            {
                title: '3.5.2 - Revenue generated from consultancy and corporate training during the year (INR in Lakhs)',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ConsultancyServices', userType: 'faculty'
                },
                component: <AdminMasterTable model="ConsultancyServices" academicYear={academicYear} school={school} heading='Consultancy Services' serviceName="faculty" proof="proof" />
            },
            // todo 3.6
                // ? textarea title - 3.6.1 - Extension activities in the neighbourhood community in terms of impact and  sensitising students to social issues and holistic development during the year
                // ? table title - 3.6.2 - Number of awards received by the Institution, its teachers and students from Government /Government recognised bodies in recognition of the extension activities carried out  during the year
            {
                title: '3.6.3 - Number of extension and outreach programs conducted by the institution including those through NSS/NCC/Red cross/YRC during the year(including Government initiated programs such as Swachh Bharat, Aids Awareness, Gender Issue, etc. and those organised in collaboration with industry, community and NGOs)',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ExtensionActivities', userType: 'director'
                },
                component: isDirector ?
                    <ExtensionActivities filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ExtensionActivities" customParams={{ model: "ExtensionActivities", module: "Admin", filter: { Year_of_activity: academicYear } }} heading='Extension Activities' serviceName="director" proof= "Upload_Proof" />,
            },
            {
                title: '3.6.4 - Total number of students participating in extension activities listed at 3.6.3 above during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ExtensionActivities', userType: 'director'
                },
                component: isDirector ?
                    <ExtensionActivities filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ExtensionActivities" customParams={{ model: "ExtensionActivities", module: "Admin", filter: { Year_of_activity: academicYear } }} heading='Extension Activities' serviceName="director" proof= "Upload_Proof" />,
            },
            // ? 3.7
            {
                title: '3.7.1 - Number of collaborative activities with other institutions/ research establishment/industry for research and academic development of faculty and students during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Collaboration', userType: 'faculty'
                },
                component: <AdminMasterTable model="Collaboration" academicYear={academicYear} school={school} heading='Collaborations' serviceName="faculty" proof="proof" />
            },
            {
                title: '3.7.2 - Number of functional MoUs with institutions/ industries in India and abroad for internship, on-the-job training, project work, student / faculty exchange and collaborative research during the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'MoUs', userType: 'director'
                },
                component: isDirector ?
                    <MoUs filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="MoUs" customParams={{ model: "MoUs", module: "Admin", filter: { Academic_Year: academicYear } }} heading='MoUs' serviceName="director" proof= "Upload_Proof" />,
            },
        ],
        "criterion-4": [
            // todo 4.1
                 // ? textarea  title - 4.1.1 - The institution has adequate facilities for teaching - learning. viz., classrooms, laboratories, computing equipment, etc. 
                 // ? textarea  title - 4.1.2 - The institution has adequate facilities for cultural activities, yoga, games (indoor, outdoor) and sports. (gymnasium, yoga centre, auditorium, etc.)
                 // ? textarea  title - 4.1.3 - Availability of general campus facilities and overall ambience
            {
               title: '4.1.4 - Total expenditure excluding salary for infrastructure augmentation during the year (INR in Lakhs)',
               hasSupportingDocument: true,
               proofData: {
                   academicYear, proofType: 'TotalExpenditure', userType: 'other'
               },
               component: !isDirector&&<AdminMasterTable model="TotalExpenditure" customParams={{ model: "TotalExpenditure", module: "Admin", filter: { academicYear } }} heading='Total Expenditure (FAO)' serviceName="other" />
            },
            // todo 4.2
                // ? textarea  title - 4.2.1 - Library is automated using Integrated Library Management System (ILMS) and has digitisation facility
                // ? ????? title - 4.2.2 - Institution has subscription for e-Library resources Library has regular subscription for the following: e – journals, e-books, e-ShodhSindhu, Shodhganga, Databases
            {
                title: '4.2.3 - Annual expenditure for purchase of books/ e-books and subscription to journals/e-journals during the year (INR in Lakhs)',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'SubscriptionForKRC', userType: 'krc'
                },
                component: !isDirector&&<AdminMasterTable model="SubscriptionForKRC" customParams={{ model: "SubscriptionForKRC", module: "Admin", filter: { academicYear } }} heading='Institution has subscription for KRC' serviceName="krc" proof="proof" />
            },
        ],
        "criterion-5": [
            {
                title: '5.1.2 - Counseling and Guidance ',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'CounselingAndGuidance', userType: 'director'
                },
                component: isDirector ?
                    <CounselingAndGuidance filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="CounselingAndGuidance" customParams={{ model: "CounselingAndGuidance", module: "Admin", filter: { Year_of_Activity: academicYear } }} heading='Counseling and Guidance' serviceName="director" proof= "Upload_Proof" />,
            },
            {
                title: '5.1.3 - Skills Enhancement Initiatives',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'SkillsEnhancementInitiatives', userType: 'director'
                },
                component: isDirector ?
                    <SkillsEnhancementInitiatives filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="SkillsEnhancementInitiatives" customParams={{ model: "SkillsEnhancementInitiatives", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Skills Enhancement Initiatives' serviceName="director" proof= "Upload_Proof" />,
            },
            {
                title: '5.2.1 - Qualified Exams',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'QualifiedExams', userType: 'director'
                },
                component: isDirector ?
                    <QualifiedExams filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="QualifiedExams" customParams={{ model: "QualifiedExams", module: "Admin", filter: { Acadmic_year: academicYear } }} heading='Qualified Exams' serviceName="director" proof= "Upload_Proof" />,
            },
            {
                title: '5.2.2 - Placements',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Placement', userType: 'director'
                },
                component: isDirector ?
                    <Placements filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="Placement" customParams={{ model: "Placement", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Placements' serviceName="director" proof= "Upload_Proof" />,
            },
            {
                title: '5.2.3 - Progression to Higher Education',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'ProgressionToHE', userType: 'director'
                },
                component: isDirector ?
                    <ProgressionToHE filterByAcademicYear={true} academicYear={academicYear} /> :
                    <AdminMasterTable model="ProgressionToHE" customParams={{ model: "ProgressionToHE", module: "Admin", filter: { Academic_Year: academicYear } }} heading='Progression to Higher Education' serviceName="director" proof= "Upload_Proof" />,
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
                    <AdminMasterTable model="TrainingProgramsOrganized" customParams={{ model: "TrainingProgramsOrganized", module: "Admin", filter: { Year: academicYear } }} heading='Professional Development / Administrative Training Programs Organized' serviceName="director" proof= "Upload_Proof" />,
            },
            {
                title: '6.3.4 - Teachers undergoing online/ face-to-face  Faculty Development Programmes (FDP)during  the year',
                hasSupportingDocument: true,
                proofData: {
                    academicYear, proofType: 'Online', userType: 'faculty'
                },
                component: <AdminMasterTable model="Online" academicYear={academicYear} school={school} heading='Orientation / Refresher Course (FDP)' serviceName="faculty" proof="proof" />
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