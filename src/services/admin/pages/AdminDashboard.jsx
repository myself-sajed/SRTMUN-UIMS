import React, { useEffect, useState } from 'react'

import { Chart as ChartJs, ArcElement, Title, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import AdminDrower from './AdminDrower';
import getDocumentCount from '../../../components/requestComponents/getDocumentCount';

///icons
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import VideoChatRoundedIcon from '@mui/icons-material/VideoChatRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BoyRoundedIcon from '@mui/icons-material/BoyRounded';
import SchoolsProgram from '../../../components/SchoolsProgram';
import getDepartmentWiseDocumentCount from '../../../components/requestComponents/getDocumentDepartmentwise';

ChartJs.register(
  ArcElement, Title, Legend, Tooltip
)

const AdminDashboard = () => {

  //main dashboard Count ststes

  const [facltyCount, setFacultyCount] = useState(0);
  const [directorCount, setDirectorCount] = useState(0);
  const [alumniCount, setAlumniCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [booksAndChaptersCount, setBooksAndChaptersCount] = useState(0);
  const [researchProjectsCount, setResearchProjectsCount] = useState(0);
  const [petantCount, setPetantCount] = useState(0);
  const [eContentDevelopedCount, setEContentDevelopedCount] = useState(0);
  const [conferenceOrganizedCount, setConferenceOrganizedCount] = useState(0);
  const [invitedTalkCount, setInvitedTalkCount] = useState(0);
  const [researchGuidanceCount, setResearchGuidanceCount] = useState(0);
  const [researchPapersCount, setResearchPapersCount] = useState(0);
  const [fellowshipCount, setFellowshipCount] = useState(0);

  //student Count States
  const studentDPartObj = { compCount: 0, chemiCount: 0, managementCount: 0, eduCount: 0, mathCount: 0, phyCount: 0, socialCount: 0, socialLaturCount: 0, earthCount: 0, lifeCount: 0, mediaCount: 0, pharmaCount: 0, fineCount: 0, langCount: 0, managementLaturCount: 0, techLaturCount: 0,}

  const [ departmentWiseStudentCount, setDepartmentWiseStudentCount] = useState(studentDPartObj);

  const { compCount, chemiCount, managementCount, eduCount, mathCount, phyCount, socialCount, socialLaturCount, earthCount, lifeCount, mediaCount, pharmaCount, fineCount, langCount, managementLaturCount, techLaturCount,}= departmentWiseStudentCount
  
  const [activeButton, setActiveButton] = useState("faculty");
  const [activeModel, setActiveModel] = useState("User");
  const [activeProperty, setActiveProperty] = useState("department");
  const [activeName, setActiveName] = useState("Faculties");

  const categories = [
    { Icon: <PersonRoundedIcon style={{ fontSize: '35px',  }} />, name: "Faculties", Count: facltyCount, active : "faculty", model: "User", property: "department" },
    { Icon: <LocalLibraryRoundedIcon style={{ fontSize: '35px',  }} />, name: "Directors", Count: directorCount, active : "director", model: "DirectorUser", property: "department" },
    { Icon: <BoyRoundedIcon style={{ fontSize: '35px',  }} />, name: "Alumnis", Count: alumniCount, active : "alumni", model: "AlumniUser", property: "schoolName" },
    { Icon: <SchoolRoundedIcon style={{ fontSize: '35px',   }} />, name: "Students", Count: studentCount, active : "student", model: "StudentUser", property: "schoolName" }
  ]

  const SubMenuCards = [
    { Icon: <AutoStoriesRoundedIcon style={{ fontSize: "35px" }} />, name: "Book & Chapters", Count: booksAndChaptersCount, active : "bookchapters", model: "BooksAndChapters", property: "userId.department" },
    { Icon: <StickyNote2RoundedIcon style={{ fontSize: "35px" }} />, name: "Reserch Papers", Count: researchPapersCount, active : "reserchpapers", model: "ResearchPaper", property: "userId.department" },
    { Icon: <ScienceRoundedIcon style={{ fontSize: "35px" }} />, name: "Reserch Projects", Count: researchProjectsCount, active : "reserchprojects", model: "ResearchProject", property: "userId.department" },
    { Icon: <LanguageRoundedIcon style={{ fontSize: "35px" }} />, name: "Econtent Developed", Count: eContentDevelopedCount, active : "econtentdeveloped", model: "EContentDeveloped", property: "userId.department" },
    { Icon: <BookmarkAddedRoundedIcon style={{ fontSize: "35px" }} />, name: "Petants Published", Count: petantCount, active : "petantspublished", model: "Patent", property: "userId.department" },
    { Icon: <VideoChatRoundedIcon style={{ fontSize: "35px" }} />, name: "Conference Organized", Count: conferenceOrganizedCount, active : "conferenceorganized", model: "ConferenceOrganized", property: "userId.department" },
    { Icon: <LightbulbRoundedIcon style={{ fontSize: "35px" }} />, name: "Invited Talks", Count: invitedTalkCount, active : "invitedtalks", model: "InvitedTalk", property: "userId.department" },
    { Icon: <CardMembershipRoundedIcon style={{ fontSize: "35px" }} />, name: "Reserch Guidence", Count: researchGuidanceCount, active : "reserchguidence", model: "ResearchGuidance", property: "userId.department" },
    { Icon: <AttachMoneyRoundedIcon style={{ fontSize: "35px" }} />, name: "Fellowships", Count: fellowshipCount, active : "fellowships", model: "Fellowship", property: "userId.department" },
  ]
  // const combinedArray = [...SubMenuCards, ...categories];


  const data = {
    labels: Object.keys(SchoolsProgram),
    datasets: [
        {
          label: `${activeName}`,
          data: [
            compCount, chemiCount, managementCount, eduCount, mathCount, phyCount, socialCount, earthCount, lifeCount, pharmaCount, mediaCount, fineCount, langCount, managementLaturCount, techLaturCount, socialLaturCount,
          ],
          backgroundColor: ["#ea5545","#f46a9b","#ef9b20","#edbf33","#ede15b","#bdcf32","#87bc45","#27aeef","#b33dc6","#e60049","#0bb4ff","#50e991","#e6d800","#9b19f5","#ffa300","#dc0ab4",],
          hoverOffset: 4,
        },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: `${activeName}`,
      },
    },
  };

  useEffect(() => {
    getDocumentCount({ model: 'User', setState: setFacultyCount })
    getDocumentCount({ model: 'DirectorUser', setState: setDirectorCount })
    getDocumentCount({ model: 'AlumniUser', setState: setAlumniCount })
    getDocumentCount({ model: 'StudentUser', setState: setStudentCount })
    getDocumentCount({ model: 'BooksAndChapters', setState: setBooksAndChaptersCount })
    getDocumentCount({ model: 'ResearchProjects', setState: setResearchProjectsCount })
    getDocumentCount({ model: 'EContentDeveloped', setState: setEContentDevelopedCount })
    getDocumentCount({ model: 'Petant', setState: setPetantCount })
    getDocumentCount({ model: 'ConferenceOrganized', setState: setConferenceOrganizedCount })
    getDocumentCount({ model: 'InvitedTalk', setState: setInvitedTalkCount })
    getDocumentCount({ model: 'ResearchGuidance', setState: setResearchGuidanceCount })
    getDocumentCount({ model: 'ResearchPapers', setState: setResearchPapersCount })
    getDocumentCount({ model: 'Fellowship', setState: setFellowshipCount })
    

  }, []);
      
  useEffect(() => {
    getDepartmentWiseDocumentCount({ model: activeModel, setState: setDepartmentWiseStudentCount , property: activeProperty})

  },[activeModel, activeProperty]);

  return (
    <AdminDrower>
      <div style={{ width: "100%", overflow: "hidden", background: "#b5968575" }} >
        <div className='table-responsive p-3' style={{ display: "flex", gap: "15px" }}>
          {
            categories?.map((item, index) => <button  onClick={() => {setActiveButton(item.active); setActiveModel(item.model); setActiveProperty(item.property); setActiveName(item.name)}} key={index} className={`adminDashbordCard ${activeButton === item.active  ? 'active-dashbord-card' : ''}`}  >

              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px" }}>
                <div style={{ paddingLeft: "30PX", }}>{item.Icon}</div>
                <div style={{ paddingRight: "40PX", fontSize: "25px", fontWeight: 500, }}>{item.Count}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div></div>
                <div style={{ paddingRight: "40PX", fontSize: "15px", fontWeight: 500, }}>
                  {item.name}
                </div>
              </div>
            </button>)
          }
        </div>
        <div>
          <div className='table-responsive' style={{ width: "100%", padding: "5px 20px 15px 20px", display: "flex" }}>

            <div style={{ minWidth:"782px", padding: "10px 20px", background: "#e3e3e3", borderRadius: "20px", display: "flex", gap: "13px", flexWrap: "wrap" }}>
              {
                SubMenuCards?.map(ItemCards => <button onClick={()=>{setActiveButton(ItemCards.active); setActiveModel(ItemCards.model); setActiveProperty(ItemCards.property); setActiveName(ItemCards.name)}} className={`sub-menu-card ${activeButton === ItemCards.active  ? 'sub-menu-card-active' : ''}`}>
                  <div style={{ fontSize: "20px", fontWeight: 800, padding: "10px 20px", display: "flex", justifyContent: "space-between" }}>{ItemCards.Icon}<div>{ItemCards.Count}</div></div>
                  <div className='flex justify-center'><div>{ItemCards.name}</div></div>
                </button>
                )
              }

            </div>
          </div>
        </div>

        <section className='section-pie'>
        <div >
         <Pie data={data} options={options} style={{maxHeight:"550px"}} />
         </div>
        </section>


        

      </div>
    </AdminDrower>
  )
}

export default AdminDashboard