//Icons
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

//components
import SyllabusRevision from '../../pages/SyllabusRevision';
import Employability from "../../pages/Employability";
import ValueAddedCource from "../../pages/ValueAddedCource";
import ProjectsInternships from "../../pages/ProjectsInternships";
import DemandRatio from "../../pages/DemandRatio";
import ReservedSeats from "../../pages/ReservedSeats";
import StudentSatisfactionSurvey from "../../pages/StudentSatisfactionSurvey";
import UgcSapCasDstFistDbtICssr from "../../pages/UgcSapCasDstFistDBTICSSR";
import ResearchMethodologyWorkshops from "../../pages/ResearchMethodologyWorkshops";
import Awards from "../../pages/Awards";
import ExtensionActivities from "../../pages/ExtensionActivities"
import MoUs from "../../pages/MoUs";
import IctClassrooms from "../../pages/IctClassrooms";
import CounselingAndGuidance from "../../pages/CounselingAndGuidance";
import SkillsEnhancementInitiatives from "../../pages/SkillsEnhancementInitiatives";
import QualifiedExams from "../../pages/QualifiedExams";
import Placements from "../../pages/Placements";
import ProgressionToHE from "../../pages/ProgressionToHE";
import TrainingProgramsOrganized from "../../pages/TrainingProgramsOrganized";
import AlumniContribution from "../../pages/AlumniContribution";
import ConferencesSemiWorkshopOrganized from '../../pages/ConferencesSemiWorkshopOrganized';



const navcom = [
    {
        element: <SyllabusRevision />,
        icon: <AutoStoriesIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'SyllabusRevision',
        value: 'Syllabus Revision',
        instruction: [
            "1.1.2 Percentage of programmes where syllabus revision was carried out during the last five years (20)",
            "1.2.2 Percentage of programs in which Choice Based Credit System (CBCS)/elective course system has been implemented (20)"
        ],
    },
    {
        element: <Employability />,
        icon: <AccessibilityIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'Employability',
        value: 'Employability',
        instruction: [
            "1.1.3 Average percentage of courses having focus on employability/ entrepreneurship/ skill development during the last five years (10)",
            "1.2.1 Percentage of new courses introduced of the total number of courses across all programmes offered during the last five years (30)"
        ],
    },
    {
        element: <ValueAddedCource />,
        icon: <WorkspacePremiumIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'ValueAddedCourses',
        value: 'Value Added Courses',
        instruction: [
            "1.3.2 Number of value-added courses for imparting transferable and life skills offered during last five years  (10)",
            "1.3.3 Average Percentage of students enrolled in the courses under 1.3.2 above (10)"
        ],
    },
    {
        element: <ProjectsInternships />,
        icon: <CreateNewFolderIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'ProjectsInternships',
        value: 'Projects / Internships',
        instruction: [
            "1.3.4 Percentage  of students undertaking field projects / research projects / internships (Data for the latest completed  academic year)(5)",
            "1.3.4.1:Number of students undertaking field project or research projects or internships"
        ],
    },
    {
        element: <DemandRatio />,
        icon: <TrendingUpIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'DemandRatio',
        value: 'Demand Ratio',
        instruction: [
            "2.1.1 Demand Ratio  (Average of Last five years) (5)",
            "2.1.1.1: Number of seats available year wise during the last five years"
        ],
    },
    {
        element: <ReservedSeats />,
        icon: <AirlineSeatReclineNormalIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'ReservedSeats',
        value: 'Reserved Seats',
        instruction: [
            "2.1.2 Average percentage of seats filled  against seats reserved for various categories as per applicable  reservation policy during the last five years.(Excluding Supernumerary",
            "2.1.2.1: Number of actual students admitted from the reserved categories year wise during the last five years "
        ],
    },
    {
        element: <StudentSatisfactionSurvey />,
        icon: <SchoolIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'StudentSatisfactionSurvey',
        value: 'Student Satisfaction Survey',
        instruction: [
            "2.7 Student Satisfaction Survey (30)",
            "2.7.1 Online student satisfaction survey regarding teaching learning process. (30)"
        ],
    },
    {
        element: <UgcSapCasDstFistDbtICssr />,
        icon: <ContentPasteIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'UgcSapCasDstFistDbtICssr',
        value: 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR',
        instruction: [
            "3.1.6 Percentage of departments with UGC-SAP, CAS, DST-FIST, DBT, ICSSR  and other recognitions by  national and international  agencies (Data only for the latest completed",
            "3.2.1 Extramural funding for Research (Grants sponsored by the non-government sources such as industry, corporate houses, international bodies for research projects) endowments, Chairs in the University during the last five years (INR in Lakhs) (5)",
            "3.2.2 Grants  for research projects sponsored by the government agencies during the last five years (INR in Lakhs) (10)",
            "3.2.3 Number of research projects per teacher funded by government and  non-government agencies during the last five years (5)"
        ],
    },
    {
        element: <ResearchMethodologyWorkshops />,
        icon: <SearchIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'ResearchMethodologyWorkshops',
        value: 'Research Methodology Workshops',
        instruction: [
            "3.3.2 Number of workshops/seminars conducted on Research methodology, Intellectual Property Rights (IPR),entrepreneurship, skill development during the last five years",
            "3.3.2 Number of workshops/seminars conducted on Research methodology, Intellectual Property Rights (IPR),entrepreneurship, skill development during the last five years(10)"
        ],
    },
    {
        element: <Awards />,
        icon: <EmojiEventsIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'Awards',
        value: 'Awards',
        instruction: [
            "3.3.3 Number of awards / recognitions received for research/innovations  by the institution/teachers/research scholars/students during the last five years (10)",
            "3.3.3.1: Total number of awards / recognitions received for research/ innovations  won by institution/teachers/research scholars/students year wise during the last five years"
        ],
    },
    {
        element: <ExtensionActivities />,
        icon: <AssignmentIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'ExtensionActivities',
        value: 'Extension Activities',
        instruction: [
            "3.6. 3 Number of extension and outreach programs conducted  by the institution through NSS/NCC/Red cross/YRC etc. during the last five years ( including  Government initiated programs such as Swachh Bharat, Aids Awareness, Gender Issue, etc. and those organised in collaboration with industry, community and NGOs) (12)",
            "3.6.4 Average percentage of students participating in extension activities listed at 3.6.3 above during the last five years(12) "
        ],
    },
    {
        element: <MoUs />,
        icon: <Diversity3Icon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'MoUs',
        value: 'MoUs',
        instruction: [
            "3.7.2 Number of functional MoUs with institutions/ industries  in India and abroad for internship, on-the-job training, project work, student / faculty exchange and  collaborative research  during the last five years (10)",
            "3.7.2.1: Number of functional MoUs with institutions/ industries  in India and abroad for internship, on-the-job training, project work, student / faculty exchange and  collaborative research  during the last five years"
        ],
    },
    {
        element: <IctClassrooms />,
        icon: <CoPresentIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'IctClassrooms',
        value: 'ICT Classrooms',
        instruction: [
            "4.3.1 Percentage of classrooms and seminar halls with ICT - enabled facilities  such as  LCD, smart board, Wi-Fi/LAN, audio video recording facilities .(Data only for the latest completed academic year) (5)"
        ],
    },
    {
        element: <CounselingAndGuidance />,
        icon: <Diversity3Icon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'CounselingAndGuidance',
        value: 'Counseling And Guidance',
        instruction: [
            "5.1.2 Average percentage of students benefited by career counseling and guidance for competitive examinations offered by the Institution during the last five years"
        ],
    },
    {
        element: <SkillsEnhancementInitiatives />,
        icon: <WorkspacePremiumIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'SkillsEnhancementInitiatives',
        value: 'Skills Enhancement Initiatives',
        instruction: [
            "5.1.3 Following Capacity  development and skills enhancement initiatives are taken by the institution (5)",
            "1. Soft skills, 2. Language and communication skills, 3. Life skills (Yoga, physical fitness, health and hygiene), 4. Awareness of trends in technology"
        ],
    },
    {
        element: <QualifiedExams />,
        icon: <SchoolIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'QualifiedExams',
        value: 'Qualified Exams',
        instruction: [
            "5.2.1 Average percentage of students qualifying in state/ national/ international level examinations during the last five years (eg:NET/SLET/GATE/GMAT/CAT/GRE/JAM/IELTS/TOEFL/Civil Services/State government examinations)(10)"
        ],
    },
    {
        element: <Placements />,
        icon: <SchoolIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'Placements',
        value: 'Placements',
        instruction: [
            "5.2.2 Average percentage of placement of outgoing students during the last five years (15)"
        ],

    },
    {
        element: <ProgressionToHE />,
        icon: <Diversity3Icon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'ProgressionToHE',
        value: 'Progression To HE',
        instruction: [
            "5.2.3 Percentage of recently graduated students who have progressed to higher education (previous graduating batch)(15)"
        ],

    },
    {
        element: <TrainingProgramsOrganized />,
        icon: <SavedSearchIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'TrainingProgramsConferencesWorkshopsOrganized',
        value: 'Professional Development / Administrative Training Programs Organized',
        instruction: [
            "6.3.3 Average number of professional development / administrative training  programs organized  by the institution for teaching and non teaching staff during the last five years (8)"
        ],

    },
    {
        element: <ConferencesSemiWorkshopOrganized />,
        icon: <SavedSearchIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'conferencesSemiWorkshopOrganized',
        value: 'Conferences / Seminar / Workshop Organized',
        instruction: [
            'Conferences / Seminar / Workshop Organized, State / University level'
        ],

    },
    {
        element: <AlumniContribution />,
        icon: <AccountBalanceWalletIcon style={{ fontSize: '18px', color: "#1E3A8A" }} />,
        name: 'alumniContribution',
        value: 'Alumni Contribution',
        instruction: [
            "Alumni contributions"
        ],

    }
]


export default navcom;
