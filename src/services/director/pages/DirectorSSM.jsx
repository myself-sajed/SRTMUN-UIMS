import { Box, Button, Drawer, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import PersonAddDisabledRoundedIcon from '@mui/icons-material/PersonAddDisabledRounded';
import BoyIcon from '@mui/icons-material/Boy';
import { useSelector } from 'react-redux'
import { styled } from '@mui/system';
import Bred from '../../../components/Bred'
import OnlyNav from '../../../components/OnlyNav'
import siteLinks from '../../../components/siteLinks'
import NewStudent from './NewStudent';
import InActiveStudent from './InActiveStudent';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import LogoutIcon from '@mui/icons-material/Logout';
import ActiveStudent from './ActiveStudent';
import StudentToAlumni from './StudentToAlumni';
import Alumni from './Alumni';
import useDirectorAuth from '../../../hooks/useDirectorAuth';

const Btn = styled(Button)({
  textTransform: 'none'
});

const DirectorSSM = () => {
  useDirectorAuth()

  const [ssmBtn, setSsmBtn] = useState({ name:"newStudent", value: "New student", element: <NewStudent/> })
  const [isDrowerOpen, setIsDrowerOpen] = useState(false)
  
  const user = useSelector(state => state.user.directorUser)
  let nevigate = useNavigate()

  const ButtonObject = [
    {
      name: "newStudent", icon: <PersonAddAltRoundedIcon />, element: <NewStudent />,value: "New student"
    },{
      name: "InactiveStudent", icon: <PersonAddDisabledRoundedIcon />, element: <InActiveStudent />,value: "Inactive student"
    },{
      name: "activeStudent", icon: <SchoolRoundedIcon />, element: <ActiveStudent />,value: "Activated student"
    },{
      name: "studentAlumni", icon: <ManageAccountsRoundedIcon />, element: <StudentToAlumni />,value: "Student to Alumni"
    },{
      name: "alumni", icon: <BoyIcon />, element: <Alumni/>,value: "Alumni"
    },
  ]
  
  return (
    <div>
      <OnlyNav user={user} logout={{ token: 'director-token', link: siteLinks.welcome.link }}
                heading={{ title: 'Back to Director Home', link: siteLinks.directorHome.link }}
                li={[siteLinks.directorHome, siteLinks.sdm, siteLinks.aaa]} userType="director"
            />
      <div className='mt-2'>
        <Bred links={[siteLinks.welcome, siteLinks.directorHome, siteLinks.ssm, { title: ssmBtn.value, link: '' }]} />
      </div>
      

      <div className='w-full mt-2 hidden sm:block' id="accordionNav">
        <div className="accordion" id="accordionExample" style={{ border: "solid #60a5fa 2px", borderRadius: "10px" }}>
            <div className="accordion-item" style={{ borderRadius: "10px" }} >
              <h2 className="accordion-header" id="headingOne" style={{ background: "#e7f1ff", borderRadius: "10px" }}>
                 <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{ color: "#60a5fa", borderRadius: "10px" }} >
                    Student Management
                 </button>
              </h2>

              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <div className='flex items-center justify-center gap-2 flex-wrap'>

                   <div style={{ width: '100%', display: 'flex', flexFlow: 'row wrap', justifyContent: "center" }}>
                   {ButtonObject.map((e, index) => {
                      const {element, value, icon, name } = e;
                      return<div onClick={()=>{setSsmBtn({name,value,element})}} key={index} className={`flex items-center duration-200 ease-in-out cursor-pointer hover:bg-blue-200 justify-start gap-2 px-2 py-2 text-sm rounded-full mx-1 my-1 ${ssmBtn.name === name ? 'bg-blue-200' : 'bg-blue-100'}`}>
                        <div className='text-blue-900' >{icon}</div>
                        <p className='text-blue-900'>{value}</p>
                      </div>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 

            {/* drower */}

      <div id='drowerNav'  >
        <div style={{ backgroundColor: '#e7f1ff', display: 'flex', padding: '7px', border: "solid #60a5fa 2px", borderRadius: "10px", marginTop: "8px" }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: "flex-start" }}>
            <IconButton>
            <MenuIcon sx={{ color: '#60a5fa' }} onClick={() => setIsDrowerOpen(true)} />

            </IconButton>
            <h3 style={{ color: "#60a5fa", alignItems: "center", display: "flex", fontSize: "17px", paddingLeft: "12px", fontWeight: "400" }}>Student Managment</h3>
        </div>
          </div>
            <Drawer anchor='left' open={isDrowerOpen} onClose={() => setIsDrowerOpen(false)}>
              <Box width='335px' textAlign='center' role='presentation' >
                  <div style={{ display: 'flex', justifyContent: "space-between", padding: '20px' }}>
                    <Tooltip title="Logout" placement="top">
                      <IconButton onClick={() => { localStorage.removeItem('director-token'); nevigate(siteLinks.welcome.link) }} sx={{ color: "#c75d5d" }} >
                        <LogoutIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Close Menu" placement="top">
                      <IconButton color="primary" onClick={() => setIsDrowerOpen(false)}>
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  {ButtonObject.map((e, index) => {
                    const {name,value,element, icon } =e
                    return<Button key={index}
                      startIcon={icon}
                      value={value}
                      size="large"
                      sx={{ mx: "5px", my: "4px" }}
                      variant="contained"
                      onClick={() => { setSsmBtn({name,value,element })}}
                      style={{
                        borderRadius: 30,
                        backgroundColor: `${ssmBtn.name === name ? '#7ca6f8' : '#c2d7ff'}`,
                        color: "#1e3a8a",
                        fontSize: 12,
                        textDecoration: "none",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: 7,
                        width: "325px",
                        height: "50px"
                      }}>
                        {e.value}
                    </Button>
                    })}
                        <div style={{ padding: '15px' }}></div>
              </Box>
            </Drawer>
          </div>
          {/* <div className='flex justify-center w-full'><img src='/website-under-maintenance.webp' /></div> */}
          <div>{ssmBtn.element}</div>

    </div>
  )
}

export default DirectorSSM