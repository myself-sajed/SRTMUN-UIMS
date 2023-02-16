import React from 'react'
import { useSelector } from 'react-redux'
import Profile from '../services/faculty/tables/Profile'
import Qualification from '../services/faculty/tables/Qualification'
import ResearchDegrees from '../services/faculty/tables/ResearchDegrees'
import AppointmentsHeldPrior from '../services/faculty/tables/AppointmentsHeldPrior'
import PostHeldAppointment from '../services/faculty/tables/PostHeldAppointment'
import OnlineFDP from '../services/faculty/tables/OnlineFDP'
import ResearchProject from '../services/faculty/tables/ResearchProjects'
import ResearchPapersUGC from '../services/faculty/tables/ResearchPapersUGC'
import BooksAndChapters from '../services/faculty/tables/BooksAndChapters'
import ResearchGuidance from '../services/faculty/tables/ResearchGuidance'
import PHDAwarded from '../services/faculty/tables/PHDAwarded'
import JRFSRF from '../services/faculty/tables/JRFSRF'
import AwardRecognition from '../services/faculty/tables/AwardRecognition'
import PatentPublished from '../services/faculty/tables/PatentPublished'
import Collaboration from '../services/faculty/tables/Collaboration'
import ConferenceOrganized from '../services/faculty/tables/ConferenceOrganized'
import Fellowship from '../services/faculty/tables/Fellowship'
import Lectures from '../services/faculty/tables/Lectures'
import ConsultancyServices from '../services/faculty/tables/ConsultancyServices'
import InvitedTalk from '../services/faculty/tables/InvitedTalk'
import EContentDeveloped from '../services/faculty/tables/EContentDeveloped'
import ScrollToTopButton from './ScrollToTopButton'
import FinancialSupportToAttendConferences from '../services/faculty/tables/FinancialSupportToAttendConferences'
import Responsibilities from '../services/faculty/tables/Responsibilities'
import ConferenceParticipated from '../services/faculty/tables/ConferenceParticipated'
import ForeignVisits from '../services/faculty/tables/ForeignVisits'
import MoUsFaculty from '../services/faculty/tables/MoUsFaculty'
import ExtensionActivityFaculty from '../services/faculty/tables/ExtensionActivityFaculty'

const Rightbar = () => {

    const page = useSelector(state => state.navbar.page)



    return (
        <div className="mt-2 w-full relative">
            {/* <div className='absolute bottom-0 right-0'>
                <ScrollToTopButton />
            </div> */}
            <div className="h-[75vh]">
                {
                    page === 'profile' ?
                        <Profile /> :
                        page === 'qualification' ?
                            <Qualification /> :
                            page === 'degrees' ?
                                <ResearchDegrees /> :
                                page === 'appointment_held_prior' ?
                                    <AppointmentsHeldPrior /> :
                                    page === 'posts_held_after' ?
                                        <PostHeldAppointment /> :
                                        page === 'online_fdp' ?
                                            <OnlineFDP /> :
                                            page === 'research_projects' ?
                                                <ResearchProject /> :
                                                page === 'research_papers' ?
                                                    <ResearchPapersUGC /> :
                                                    page === 'book_and_chapters' ?
                                                        <BooksAndChapters /> :
                                                        page === 'phd_awarded' ?
                                                            <PHDAwarded /> :
                                                            page === 'jrf_srf' ?
                                                                <JRFSRF /> :
                                                                page === 'award_and_recognition' ?
                                                                    <AwardRecognition /> :
                                                                    page === 'patents' ?
                                                                        <PatentPublished /> :
                                                                        page === 'consultancy' ?
                                                                            <ConsultancyServices /> :
                                                                            page === 'collab' ?
                                                                                <Collaboration /> :
                                                                                page === 'invited_talk' ?
                                                                                    <InvitedTalk /> :
                                                                                    page === 'conference_organized' ?
                                                                                        <ConferenceOrganized /> :
                                                                                        page === 'fellowship' ?
                                                                                            <Fellowship /> :
                                                                                            page === 'lectures_seminars' ?
                                                                                                <Lectures /> :
                                                                                                page === 'e_content_development' ?
                                                                                                    <EContentDeveloped /> :
                                                                                                    page === 'financialsupport' ?
                                                                                                        <FinancialSupportToAttendConferences /> :
                                                                                                        page === 'responsibilities' ?
                                                                                                        <Responsibilities/>:
                                                                                                            page === 'conference_participated'?
                                                                                                            <ConferenceParticipated/>:
                                                                                                                page === 'foreign_visit'?
                                                                                                                <ForeignVisits/>:
                                                                                                                    page === 'mous'? 
                                                                                                                    <MoUsFaculty/>:
                                                                                                                        page === 'extension_activities'?
                                                                                                                        <ExtensionActivityFaculty/> :null
                }
            </div>
        </div>
    )
}

export default Rightbar