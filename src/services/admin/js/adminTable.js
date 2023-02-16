import Dashboard from "../tables/Dashboard"
import AdminTeacherDetails from "../tables/AdminTeacherDetails"
import LineAxisRoundedIcon from '@mui/icons-material/LineAxisRounded';
import DisplaySettingsRoundedIcon from '@mui/icons-material/DisplaySettingsRounded';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import Degrees from "../tables/Degrees";
import AwardRecognition from "../tables/AwardRecognition";
import AppointmentsHeldPrior from "../tables/AppointmentsHeldPrior";
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import BooksAndChapters from "../tables/BooksAndChapters";
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import AirlineSeatReclineNormalRoundedIcon from '@mui/icons-material/AirlineSeatReclineNormalRounded';
import PostHeldAppointment from "../tables/PostHeldAppointment";
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import Lectures from "../tables/Lectures";
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';
import OnlineFDP from "../tables/OnlineFDP";
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import ResearchProjects from "../tables/ResearchProjects";
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import ResearchPaper from "../tables/ResearchPapers";
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ResearchGuidance from "../tables/ResearchGuidance";
import PhdAwarded from "../tables/PhdAwarded";
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import JRFSRF from "../tables/JRFSRF";
import Fellowship from "../tables/Fellowship";
import DocumentScannerRoundedIcon from '@mui/icons-material/DocumentScannerRounded';
import Patents from "../tables/Patents";
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded';
import Consultancy from "../tables/Consultancy";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import Collaboration from "../tables/Collaboration";
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import InvitedTalk from "../tables/InvitedTalk";
import DuoRoundedIcon from '@mui/icons-material/DuoRounded';
import Conference from "../tables/Conference";
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import EContentDeveloped from "../tables/EContentDeveloped";
import CloudIcon from '@mui/icons-material/Cloud';







const adminTable = [
    {
        path: "/admin/dashboard",
        name: 'dashboard',
        component: <Dashboard />,
        logo: <LineAxisRoundedIcon />,
        title: 'Dashboard'
    },
    {
        path: "/admin/teacher-details",
        name: 'details',
        component: <AdminTeacherDetails />,
        logo: <DisplaySettingsRoundedIcon />,
        title: 'Teacher Details'
    },
    {
        path: "/admin/research-degrees",
        name: 'degree',
        component: <Degrees />,
        logo: <CardMembershipRoundedIcon />,
        title: 'Research Degrees'
    },
    {
        path: "/admin/appointments-held-prior",
        name: 'appointments',
        component: <AppointmentsHeldPrior />,
        logo: <CoPresentRoundedIcon />,
        title: 'Appointments held prior'
    },
    {
        path: "/admin/post-held",
        name: 'postheld',
        component: <PostHeldAppointment />,
        logo: <AirlineSeatReclineNormalRoundedIcon />,
        title: 'Posts held after appointments'
    },
    {
        path: "/admin/lectures",
        name: 'lectures',
        component: <Lectures />,
        logo: <TvRoundedIcon />,
        title: 'Lectures, Seminars, Tutorials and Practicals'
    },
    {
        path: "/admin/online-fdp",
        name: 'online',
        component: <OnlineFDP />,
        logo: <SentimentVerySatisfiedRoundedIcon />,
        title: 'Online FDP'
    },
    {
        path: "/admin/research-projects",
        name: 'research',
        component: <ResearchProjects />,
        logo: <ScienceRoundedIcon />,
        title: 'Research Projects',
    },
    {
        path: "/admin/research-papers",
        name: 'papers',
        component: <ResearchPaper />,
        logo: <FindInPageRoundedIcon />,
        title: 'Research Papers',
    },
    {
        path: "/admin/books-and-chapters",
        name: 'books',
        component: <BooksAndChapters />,
        logo: <MenuBookRoundedIcon />,
        title: 'Published Books and Chapters '
    },
    {
        path: "/admin/research-guidance",
        name: 'guidance',
        component: <ResearchGuidance />,
        logo: <SchoolRoundedIcon />,
        title: 'Research Guidance',
    },
    {
        path: "/admin/award-and-recognition",
        name: 'award',
        component: <AwardRecognition />,
        logo: <EmojiEventsRoundedIcon />,
        title: 'Awards and Recognitions'
    },
    {
        path: "/admin/phd-awarded",
        name: 'phd',
        component: <PhdAwarded />,
        logo: <CardMembershipRoundedIcon />,
        title: 'Ph.D. Awarded',
    },
    {
        path: "/admin/jrf-other-fellowships",
        name: 'jrf',
        component: <JRFSRF />,
        logo: <PersonSearchRoundedIcon />,
        title: 'JRF, SRF, Post Doctoral Fellows',
    },
    {
        path: "/admin/fellowships",
        name: 'fellowships',
        component: <Fellowship />,
        logo: <AttachMoneyRoundedIcon />,
        title: 'Fellowship/Financial assitance for studies',
    },
    {
        path: "/admin/published-patents",
        name: 'patents',
        component: <Patents />,
        logo: <DocumentScannerRoundedIcon />,
        title: 'Patents Published/Awarded',
    },
    {
        path: "/admin/consultancy-services",
        name: 'consultancy',
        component: <Consultancy />,
        logo: <ConnectWithoutContactRoundedIcon />,
        title: 'Consultancy Services',
    },
    {
        path: "/admin/collaborations",
        name: 'collaborations',
        component: <Collaboration />,
        logo: <GroupRoundedIcon />,
        title: 'Collaborations',
    },
    {
        path: "/admin/invited-talk",
        name: 'talk',
        component: <InvitedTalk />,
        logo: <HeadsetMicRoundedIcon />,
        title: 'Invited Talk/Resources Person',
    },
    {
        path: "/admin/conference-organized",
        name: 'conference',
        component: <Conference />,
        logo: <DuoRoundedIcon />,
        title: 'Conference / Workshop / Seminar Organized',
    },
    {
        path: "/admin/e-content-developed",
        name: 'econtentdeveloped',
        component: <EContentDeveloped />,
        logo: <CloudIcon />,
        title: 'E-Content Developed',
    },


]

export default adminTable