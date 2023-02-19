import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
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



const AdminDashboard = () => {

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
  const [researchGuidanceCount,  setResearchGuidanceCount] = useState(0);
  const [researchPapersCount,  setResearchPapersCount] = useState(0);
  const [fellowshipCount,  setFellowshipCount] = useState(0);

  const categories = [
    {name: "Faculties",title:`Faculties ${facltyCount}`,value: facltyCount, color: "#9185b5", icon: <PersonRoundedIcon style={{ fontSize: '35px', color:"#4B0082", name:"Facultys", }}/>}, 
    {name: "Directors",title:`Directors ${directorCount}`,value: directorCount, color: "#c2bdd1", icon: <LocalLibraryRoundedIcon style={{ fontSize: '35px', color:"#4B0082", name:"Directors", }}/>}, 
    {name: "Alumnis",title:`Alumnis ${alumniCount}`,value: alumniCount, color: "#6e44d1", icon: <BoyRoundedIcon style={{ fontSize: '35px', color:"#4B0082", name:"Alumnis", }}/>}, 
    {name: "Students",title:`Students ${studentCount}`,value: studentCount, color: "#765fac", icon: <SchoolRoundedIcon style={{ fontSize: '35px', color:"#4B0082", name:"Students", }}/>}
  ]
 


  useEffect(() =>{
    getDocumentCount({ model: 'User',setState: setFacultyCount})
    getDocumentCount({ model: 'DirectorUser',setState: setDirectorCount})
    getDocumentCount({ model: 'AlumniUser',setState: setAlumniCount})
    getDocumentCount({ model: 'StudentUser',setState: setStudentCount})
    getDocumentCount({ model: 'BooksAndChapters',setState: setBooksAndChaptersCount})
    getDocumentCount({ model: 'ResearchProjects',setState: setResearchProjectsCount})
    getDocumentCount({ model: 'EContentDeveloped',setState: setEContentDevelopedCount})
    getDocumentCount({ model: 'Petant',setState: setPetantCount})
    getDocumentCount({ model: 'ConferenceOrganized',setState: setConferenceOrganizedCount})
    getDocumentCount({ model: 'InvitedTalk',setState: setInvitedTalkCount})
    getDocumentCount({ model: 'ResearchGuidance',setState: setResearchGuidanceCount})
    getDocumentCount({ model: 'ResearchPapers',setState: setResearchPapersCount})
    getDocumentCount({ model: 'Fellowship',setState: setFellowshipCount})

  },[]);

  const SubMenuCards = [
      {Icon:<AutoStoriesRoundedIcon style={{fontSize: "45px"}} />,name: "Book & Chapters",Count: booksAndChaptersCount },
      {Icon:<StickyNote2RoundedIcon style={{fontSize: "45px"}} />,name: "Reserch Papers",Count: researchPapersCount },
      {Icon:<ScienceRoundedIcon style={{fontSize: "45px"}} />,name: "Reserch Projects",Count: researchProjectsCount },
      {Icon:<LanguageRoundedIcon style={{fontSize: "45px"}} />,name: "Econtent Developed",Count: eContentDevelopedCount },
      {Icon:<BookmarkAddedRoundedIcon style={{fontSize: "45px"}} />,name: "Petants Published",Count: petantCount },
      {Icon:<VideoChatRoundedIcon style={{fontSize: "45px"}} />,name: "Conference Organized",Count: conferenceOrganizedCount },
      {Icon:<LightbulbRoundedIcon style={{fontSize: "45px"}} />,name: "Invited Talks",Count: invitedTalkCount },
      {Icon:<CardMembershipRoundedIcon style={{fontSize: "45px"}} />,name: "Reserch Guidence",Count: researchGuidanceCount },
      {Icon:<AttachMoneyRoundedIcon style={{fontSize: "45px"}} />,name: "Fellowships",Count: fellowshipCount },
  ]

  return (
    <AdminDrower>
      <div style={{borderRadius: "0 0 10px 0 ", width: "100%",overflow: "hidden", background: "#9185b575"}} >
        <div className='table-responsive p-3' style={{display: "flex", gap: "15px"}}>
          {
            categories?.map(item => <div className='adminDashbordCard' >
              
              <div style={{display: "flex", justifyContent: "space-between", paddingTop: "10px"}}>
                <div style={{paddingLeft: "30PX", }}>{item.icon}</div>
                <div style={{paddingRight: "40PX", fontSize: "25px", fontWeight: 500,}}>{item.value}</div>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <div></div>
                <div style={{paddingRight: "40PX", fontSize: "15px", fontWeight: 500,}}>
                {item.name}
              </div>
              </div>
            </div>)
          }
        </div>
      <div>
        <div className='table-responsive' style={{width: "100%", padding: "20px", display: "flex"}}>
          
          <div style={{minWidth: "650px", padding: "10px 20px", background: "#dddddd", borderRadius: "20px", boxShadow: "10px 10px 7px #9185b5",display: "flex", gap: "13px", flexWrap: "wrap"}}>
            {
              SubMenuCards?.map(ItemCards=><div className='abc'>
              <div style={{fontSize: "30px", fontWeight: 800, padding: "10px 20px", display: "flex", justifyContent: "space-between"}}>{ItemCards.Icon}<div>{ItemCards.Count}</div></div>
              <div className='flex justify-center'><div>{ItemCards.name}</div></div>
            </div>
            )
            }
            {/* <div className='abc'>
              <div style={{fontSize: "30px", fontWeight: 800, padding: "10px 20px", display: "flex", justifyContent: "space-between"}}><Icon/><div>21</div></div>
              <div className='flex justify-center'><div>name</div></div>
            </div>
            <div className='abc'>
              <div style={{fontSize: "30px", fontWeight: 800, padding: "10px 20px", display: "flex", justifyContent: "space-between"}}><Icon/><div>22</div></div>
              <div className='flex justify-center'><div>name</div></div>
            </div>
            <div className='abc'>
              <div style={{fontSize: "30px", fontWeight: 800, padding: "10px 20px", display: "flex", justifyContent: "space-between"}}><Icon/><div>23</div></div>
              <div className='flex justify-center'><div>name</div></div>
            </div>
            <div className='abc'>
              <div style={{fontSize: "30px", fontWeight: 800, padding: "10px 20px", display: "flex", justifyContent: "space-between"}}><Icon/><div>24</div></div>
              <div className='flex justify-center'><div>name</div></div>
            </div>
            <div className='abc'>
              <div style={{fontSize: "30px", fontWeight: 800, padding: "10px 20px", display: "flex", justifyContent: "space-between"}}><Icon/><div>25</div></div>
              <div className='flex justify-center'><div>name</div></div>
            </div>
            <div className='abc'>
              <div style={{fontSize: "30px", fontWeight: 800, padding: "10px 20px", display: "flex", justifyContent: "space-between"}}><Icon/><div>26</div></div>
              <div className='flex justify-center'><div>name</div></div>
            </div>
            <div className='abc'>
              <div style={{fontSize: "30px", fontWeight: 800, padding: "10px 20px", display: "flex", justifyContent: "space-between"}}><Icon/><div>27</div></div>
              <div className='flex justify-center'><div>name</div></div>
            </div>
            <div className='abc'>
              <div style={{fontSize: "30px", fontWeight: 800, padding: "10px 20px", display: "flex", justifyContent: "space-between"}}><Icon/><div>28</div></div>
              <div className='flex justify-center'><div>name</div></div>
            </div> */}
          </div>
        </div>
      </div>
      <section className='section-pie table-responsive'>
        <div className='pie-main-card' >
            <div className='pie-card-heding' >
              Users Pie Diagram
            </div>
            <div className='p-2'>
              <PieChart data={categories  }/>
            </div>
            <div className='flex justify-between gap-2 py-5 px-2 text-sm'>
              { 
                categories.map(item => <div onClick={()=>{}} className='category-diclaration' ><span style={{background: `${item.color}`, padding: "0 6px", marginRight: "1px"}}></span>{item.name}</div>)
              }
            </div>
          </div>
          <div className='pie-main-card' >
            <div className='pie-card-heding' >
              Users Pie Diagram
            </div>
            <div className='p-2'>
              <PieChart data={categories  }/>
            </div>
            <div className='flex justify-between gap-2 py-5 px-2 text-sm'>
              { 
                categories.map(item => <div onClick={()=>{}} className='category-diclaration' ><span style={{background: `${item.color}`, padding: "0 6px", marginRight: "1px"}}></span>{item.name}</div>)
              }
            </div>
          </div>
          <div className='pie-main-card' >
            <div className='pie-card-heding' >
              Users Pie Diagram
            </div>
            <div className='p-2'>
              <PieChart data={categories  }/>
            </div>
            <div className='flex justify-between gap-2 py-5 px-2 text-sm'>
              { 
                categories.map(item => <div onClick={()=>{}} className='category-diclaration' ><span style={{background: `${item.color}`, padding: "0 6px", marginRight: "1px"}}></span>{item.name}</div>)
              }
            </div>
          </div>
      </section>
        
    </div>
    </AdminDrower>
  )
}

export default AdminDashboard