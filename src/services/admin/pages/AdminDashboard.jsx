import React, { useEffect, useState } from 'react'

import { Chart as ChartJs, ArcElement, Title, Legend, Tooltip } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
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
  const studentDPartObj = { compCount: 0, chemiCount: 0, managementCount: 0, eduCount: 0, mathCount: 0, phyCount: 0, socialCount: 0, socialLaturCount: 0, earthCount: 0, lifeCount: 0, mediaCount: 0, pharmaCount: 0, fineCount: 0, langCount: 0, managementLaturCount: 0, techLaturCount: 0, }

  const [departmentWiseStudentCount, setDepartmentWiseStudentCount] = useState(studentDPartObj);

  const { compCount, chemiCount, managementCount, eduCount, mathCount, phyCount, socialCount, socialLaturCount, earthCount, lifeCount, mediaCount, pharmaCount, fineCount, langCount, managementLaturCount, techLaturCount, } = departmentWiseStudentCount

  const [activeButton, setActiveButton] = useState("faculty");
  const [activeModel, setActiveModel] = useState("User");
  const [activeProperty, setActiveProperty] = useState("department");
  const [activeName, setActiveName] = useState("Faculties");

  const categories = [
    { Icon: <PersonRoundedIcon style={{ fontSize: '35px', }} />, name: "Faculties", Count: facltyCount, active: "faculty", model: "User", property: "department" },
    { Icon: <LocalLibraryRoundedIcon style={{ fontSize: '35px', }} />, name: "Directors", Count: directorCount, active: "director", model: "DirectorUser", property: "department" },
    { Icon: <BoyRoundedIcon style={{ fontSize: '35px', }} />, name: "Alumnis", Count: alumniCount, active: "alumni", model: "AlumniUser", property: "schoolName" },
    { Icon: <SchoolRoundedIcon style={{ fontSize: '35px', }} />, name: "Students", Count: studentCount, active: "student", model: "StudentUser", property: "schoolName" }
  ]

  const SubMenuCards = [
    { Icon: <AutoStoriesRoundedIcon style={{ fontSize: "35px" }} />, name: "Book & Chapters", Count: booksAndChaptersCount, active: "bookchapters", model: "BooksAndChapters", property: "userId.department" },
    { Icon: <StickyNote2RoundedIcon style={{ fontSize: "35px" }} />, name: "Reserch Papers", Count: researchPapersCount, active: "reserchpapers", model: "ResearchPaper", property: "userId.department" },
    { Icon: <ScienceRoundedIcon style={{ fontSize: "35px" }} />, name: "Reserch Projects", Count: researchProjectsCount, active: "reserchprojects", model: "ResearchProject", property: "userId.department" },
    { Icon: <LanguageRoundedIcon style={{ fontSize: "35px" }} />, name: "Econtent Developed", Count: eContentDevelopedCount, active: "econtentdeveloped", model: "EContentDeveloped", property: "userId.department" },
    { Icon: <BookmarkAddedRoundedIcon style={{ fontSize: "35px" }} />, name: "Petants Published", Count: petantCount, active: "petantspublished", model: "Patent", property: "userId.department" },
    { Icon: <VideoChatRoundedIcon style={{ fontSize: "35px" }} />, name: "Conference Organized", Count: conferenceOrganizedCount, active: "conferenceorganized", model: "ConferenceOrganized", property: "userId.department" },
    { Icon: <LightbulbRoundedIcon style={{ fontSize: "35px" }} />, name: "Invited Talks", Count: invitedTalkCount, active: "invitedtalks", model: "InvitedTalk", property: "userId.department" },
    { Icon: <CardMembershipRoundedIcon style={{ fontSize: "35px" }} />, name: "Reserch Guidence", Count: researchGuidanceCount, active: "reserchguidence", model: "ResearchGuidance", property: "userId.department" },
    { Icon: <AttachMoneyRoundedIcon style={{ fontSize: "35px" }} />, name: "Fellowships", Count: fellowshipCount, active: "fellowships", model: "Fellowship", property: "userId.department" },
  ]

  const data = {
    labels: Object.keys(SchoolsProgram),
    datasets: [
      {
        label: `${activeName}`,
        data: [
          compCount, chemiCount, managementCount, eduCount, mathCount, phyCount, socialCount, earthCount, lifeCount, pharmaCount, mediaCount, fineCount, langCount, managementLaturCount, techLaturCount, socialLaturCount,
        ],
        backgroundColor: ["#FADADD", "#F08080", "#FFDAB9", "#FFFACD", "#FFFFE0", "#98FB98", "#B0E0E6", "#87CEEB", "#E6E6FA", "#D8BFD8", "#FFE4E1", "#FDF5E6", "#FAEBD7", "#FFFFF0", "#F5F5DC", "#D3D3D3",],
        borderColor: ["#F5A3AC", "#CD5C5C", "#FFC58A", "#F0E68C", "#EEDC82", "#9ACD32", "#ADD8E6", "#6495ED", "#BA55D3", "#B57EDC", "#FFC0CB", "#ECD5C5", "#FFE4B5", "#F0E68C", "#F5DEB3", "#C0C0C0",],
        hoverOffset: 5,
        borderWidth: 2,
        cutout: "75%",
        borderRadius: 15,
        offset: 8,
      },
    ],
  };

  const options = {
    layout: { padding: 30 },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        // position: 'right',
      },
      title: {
        display: false,
        // text: `${activeName}`,
      },
    },
  };

  const DoughnutLabelsLine = {
    id: "doughnutLabelsLine",
    afterDraw(chart, args, options) {
      const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
      const a = chart.getDatasetMeta(0).data[0].x
      const b = chart.getDatasetMeta(0).data[0].y
      ctx.fillText(chart.data.datasets[0].label, a, b)
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '12px Arial';
      ctx.fillStyle = "gray";
      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index) => {

          if (window.innerWidth >= 1000) {
            if (dataset.data[index] !== 0) {
              //line
              const { x, y } = datapoint.tooltipPosition();
              const halfWidth = width / 2;
              const halfHeight = height / 2;
              const xLine = x >= halfWidth ? x + 40 : x - 40;
              const yLine = y >= halfHeight ? y + 40 : y - 40;
              const extraLine = x >= halfWidth ? 20 : -20;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(xLine, yLine);
              ctx.lineTo(xLine + extraLine, yLine);
              ctx.strokeStyle = "gray";
              ctx.stroke();
              //labels
              const halfTextWidth = ctx.measureText(chart.data.labels[index]).width / 2;
              const extraPadding = x >= halfWidth ? halfTextWidth + 5 : -(halfTextWidth + 5);

              ctx.fillText(chart.data.labels[index], xLine + extraLine + extraPadding, yLine);
            }
          }
        })
      });
    }
  }

  const plugins = [DoughnutLabelsLine];

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
    getDepartmentWiseDocumentCount({ model: activeModel, setState: setDepartmentWiseStudentCount, property: activeProperty })

  }, [activeModel, activeProperty]);

  return (
    <AdminDrower>
      <div style={{ width: "100%", overflow: "hidden", background: "#b5968575" }} >
        <div className='table-responsive p-3' style={{ display: "flex", gap: "15px" }}>
          {
            categories?.map((item, index) => <button onClick={() => { setActiveButton(item.active); setActiveModel(item.model); setActiveProperty(item.property); setActiveName(item.name) }} key={index} className={`adminDashbordCard ${activeButton === item.active ? 'active-dashbord-card' : ''}`}  >

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

            <div style={{ minWidth: "782px", padding: "10px 20px", background: "#e3e3e3", borderRadius: "20px", display: "flex", gap: "13px", flexWrap: "wrap" }}>
              {
                SubMenuCards?.map(ItemCards => <button onClick={() => { setActiveButton(ItemCards.active); setActiveModel(ItemCards.model); setActiveProperty(ItemCards.property); setActiveName(ItemCards.name) }} className={`sub-menu-card ${activeButton === ItemCards.active ? 'sub-menu-card-active' : ''}`}>
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
            <Doughnut data={data} options={options} plugins={plugins} style={{ maxHeight: "550px" }} />
          </div>
        </section>




      </div>
    </AdminDrower>
  )
}

export default AdminDashboard