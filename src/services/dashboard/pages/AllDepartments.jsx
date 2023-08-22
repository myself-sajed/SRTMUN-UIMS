import { IconButton } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useQuery } from 'react-query';
import refresh from '../../faculty/js/refresh';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import GoBack from '../../../components/GoBack';
import title from '../../../js/title';
import { countData } from '../js/fetchData';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import SchoolsProgram from '../../../components/SchoolsProgram';
import { Note } from '@mui/icons-material';
import AllStudents from './AllStudents';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AllFaculties from './AllFaculties';
import AllAlumni from './AllAlumni';
import OtherDashboardData from './OtherDashboardData';
import DirectorDashboardData from './DirectorDashboardData';
import AlumniAnalytics from '../components/AlumniAnalytics';

const AllDepartments = () => {

    title("University Schools / Departments")
    const navigate = useNavigate()
    const { serviceName } = useParams()

    const serviceMap = {
        schoolInformation: {
            model: 'User',
            select: 'department',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Faculty', 'Faculties']
        },
        info: {
            model: 'User',
            select: 'department',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Faculty', 'Faculties']
        },
        students: {
            model: 'Student',
            select: 'schoolName',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Student', 'Students']
        },
        alumni: {
            model: 'Alumni',
            select: 'schoolName',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Alumnus/Alumna', 'Alumni']
        },
        placements: {
            model: 'Placement',
            select: 'SchoolName',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Placements', 'Placements']
        },
        qualifiedExams: {
            model: 'QualifiedExams',
            select: 'SchoolName',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['QualifiedExams', 'Qualified Exams']
        },
        progessionToHigherEducation: {
            model: 'ProgressionToHE',
            select: 'SchoolName',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['ProgressionToHE', 'Students Progressed to Higher Education']
        },
        BookAndChapter: {
            model: 'BookAndChapter',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Book And Chapter', 'Book And Chapters'],
            title: 'Books & Chapters'
        },
        ResearchPaper: {
            model: 'ResearchPaper',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Research Paper', 'Research Paper'],
            title: 'Research Papers'
        },
        ResearchProject: {
            model: 'ResearchProject',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Research Projects', 'Research Project'],
            title: 'Research Projects'
        },
        EContentDeveloped: {
            model: 'EContentDeveloped',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['E-content', 'E-contents'],
            title: 'E-content Developed'
        },
        Patent: {
            model: 'Patent',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Patent Published', 'Patents Published'],
            title: 'Patents Published'
        },
        ConferenceOrganized: {
            model: 'ConferenceOrganized',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Conference Organized', 'Conference Organized'],
            title: 'Conference Organized'
        },
        InvitedTalk: {
            model: 'InvitedTalk',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Invited Talk', 'Invited Talks'],
            title: 'Total Invited Talks'
        },
        PhdAwarded: {
            model: 'PhdAwarded',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Research Guidance', 'Research Guidance'],
            title: 'Research Guidance'
        },
        Fellowship: {
            model: 'Fellowship',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Fellowship', 'Fellowships'],
            title: 'Fellowships'
        },
        Online: {
            model: 'Online',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#1d4ed8' }} />,
            fieldName: ['Online FDPs', 'Online/Face-to-Face Faculty Development Programmes (FDP)'],
            title: 'Online / Face-to-Face Faculty Development Programmes(FDP)'
        },
    }

    const Field = serviceMap[serviceName].fieldName[1]

    const param = { model: serviceMap[serviceName].model, select: serviceMap[serviceName].select, type: serviceMap[serviceName]?.type ? serviceMap[serviceName].type : null }
    const { data } = useQuery(["DashboardAnalysis", param.model], () => countData(param), { staleTime: 600000 })


    //scroll up to Top functions
    function scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    // call function on on scroll
    window.onscroll = function () {
        toggleScrollUpButton();
    };
    function toggleScrollUpButton() {
        const scrollUpButton = document.getElementById('scrollUpButton');
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollUpButton['style']['display'] = 'block';
        } else {
            scrollUpButton['style']['display'] = 'none';
        }
    }

    return (
        <>
            <div style={{ borderBottom: "solid 1px #e5e7eb" }}>
                <GoBack backUrl="/" pageTitle={Field} />
                <div>
                    {
                        serviceName === 'schoolInformation' && <div className="w-full mt-3">
                            <p className="my-2 text-muted">Note: Scroll down for more detailed information about each School.</p>

                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.6308259466323!2d77.28688624745851!3d19.100828732039695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce298abb43ab1d%3A0x4f9b6277bce2a8e1!2sSwami%20Ramanand%20Teerth%20Marathwada%20University%2C%20Nanded!5e0!3m2!1sen!2sin!4v1686661784605!5m2!1sen!2sin" width="100%" height="300" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    }
                </div>

                {
                    window.location.pathname === '/dashboard/select-department/alumni' &&
                    <div className="my-2">
                        <AlumniAnalytics stats={{ PlacementCount: data?.data?.data.placement, QualifiedExamCount: data?.data?.data.QualifiedExam, ProgressionToHECount: data?.data?.data.ProgressionToHE }} />
                    </div>

                }

                <div>
                    <div className='lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid gap-2 my-4'>
                        {Object.keys(SchoolsProgram).map((nameOfTheSchool, i) => (
                            <div className="border rounded-md p-2 duration-200 ease-in-out cursor-pointer bg-[#dbeafe] hover:bg-[#84adf2]" onClick={() => { scrollToSection(`${i}`) }}>
                                <div>
                                    <div className='flex items-start justify-start gap-1'>
                                        <div style={{ fontSize: '10px' }}>{serviceMap[serviceName].icon}</div>
                                        <div className='flex flex-col justify-start '>
                                            <p className='text-sm text-[#1d4ed8] '>{nameOfTheSchool.replace('School of', '').length < 24 ? nameOfTheSchool.replace('School of', '') : nameOfTheSchool.replace('School of', '').slice(0, 22) + "..."}{
                                                serviceMap[serviceName].model !== null && (serviceMap[serviceName]?.type !== 'faculty' && data?.data?.data) ?
                                                    <span style={{ marginLeft: "10px", background: "#1d4ed8", border: "solid #1d4ed8 1px", borderRadius: "3px", color: "#fff", }} className='px-1' >
                                                        {serviceName == "alumni" ? (data?.data?.data.alumni.filter((el) => el[serviceMap[serviceName].select] === nameOfTheSchool)).length : (data?.data?.data.filter((el) => el[serviceMap[serviceName].select] === nameOfTheSchool)).length}
                                                    </span>

                                                    :
                                                    <span style={{ marginLeft: "10px", background: "#1d4ed8", border: "solid #1d4ed8 1px", borderRadius: "3px", color: "#fff", }} className='px-1' >
                                                        {data?.data?.data.filter((el) => el.userId?.department === nameOfTheSchool).length}
                                                    </span>
                                            }</p>

                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>



            {

                Object.keys(SchoolsProgram).map((School, i) => <section id={`${i}`} style={{ border: "solid 1px #b8b4b4", borderRadius: "10px", padding: "5px", marginBottom: "15px", marginTop: "15px" }}>
                    {
                        Field === 'Faculties' ? <AllFaculties school={School} /> :
                            Field === 'Students' ? <AllStudents school={School} /> :
                                Field === 'Alumni' ? <AllAlumni school={School} /> :
                                    (Field === 'Placements' || Field === 'Qualified Exams' || Field === 'Students Progressed to Higher Education') ? <DirectorDashboardData school={School} model={serviceMap[serviceName].model} filter={{ [`${serviceMap[serviceName].select}`]: School }} /> :
                                        <OtherDashboardData school={School} model={serviceMap[serviceName].model} />

                    }
                </section>)

            }

            <div id="scrollUpButton" className="fixed hover:shadow-2xl hover:bg-blue-500 bottom-[20px] right-[20px] bg-blue-800 text-white cursor-pointer p-2 rounded-xl" onClick={() => { scrollToTop() }}> <span className='flex flex-col items-center'><span><ArrowUpwardIcon /></span> <span className="text-xs">Top</span></span> </div>

        </>
    )
}
//scroll up to section functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

export default AllDepartments
export { scrollToSection }