import React from "react";
import { useState, useEffect } from "react";
import navcom from "./navcom";
import { useDispatch, useSelector } from 'react-redux'
import { Button, Link, IconButton, Tooltip, Drawer, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate, useParams } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import useAlumniAuth from "../../../hooks/useAlumniAuth";
import Bred from "../../../components/Bred";
import OnlyNav from "../../../components/OnlyNav";
import siteLinks from "../../../components/siteLinks";
import { setAlumniActive } from "../../../redux/slices/AlumniActiveSlice";
import title from "../../../js/title";

export default function Header() {

    const [currentPage, setcurrentPage] = useState('')
    let nevigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.alumniUser)
    const alumniActive = useSelector(state => state.alumniActive.alumniActive)

    const [data, setData] = useState(null)
    const [isDrowerOpen, setIsDrowerOpen] = useState(false)
    title("Alumni")
    useAlumniAuth(false)

    useEffect(() => {
        // get current url
        navcom.forEach((item) => {
            if (item.name === alumniActive) {
                setcurrentPage(item.value)
                setData(item)
            }
        })
    }, [alumniActive])

    return (
        <div>
            <OnlyNav user={user} logout={{token:'alumni-token', link:siteLinks.welcome.link}}
                    heading={{title:'Back to Alumni Home', link:siteLinks.alumniHome.link}} 
                    li={[siteLinks.alumniHome]}  
                />
            <div className='mt-2'>
                <Bred links={[siteLinks.welcome, siteLinks.alumniHome, { title: currentPage, link: '' }]} />
            </div>

            <div className='w-full mt-2 hidden sm:block' id="accordionNav">
                <div className="accordion" id="accordionExample" style={{ border: "solid #60a5fa 2px", borderRadius: "10px" }}>
                    <div className="accordion-item" style={{ borderRadius: "10px" }} >
                        <h2 className="accordion-header" id="headingOne" style={{ background: "#e7f1ff", borderRadius: "10px" }}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{ color: "#60a5fa", borderRadius: "10px" }} >
                                Alumni Profile
                            </button>
                        </h2>

                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className='flex items-center justify-center gap-2 flex-wrap'>

                                    <div style={{ width: '100%', display: 'flex', flexFlow: 'row wrap', justifyContent: "center" }}>
                                        {navcom.map((e, index) => (

                                            <div onClick={() => { dispatch(setAlumniActive(e.name)) }} key={index} className={`flex items-center duration-200 ease-in-out cursor-pointer hover:bg-blue-200 justify-start gap-2 px-2 py-2 text-sm rounded-full mx-1 my-1 ${alumniActive === e.name ? 'bg-blue-200' : 'bg-blue-100'}`}>
                                                {e.icon}
                                                <p className='text-blue-900'>{e.value}</p>
                                            </div>
                                        ))}
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
                        <h3 style={{ color: "#60a5fa", alignItems: "center", display: "flex", fontSize: "17px", paddingLeft: "12px", fontWeight: "400" }}> Alumni profile</h3>
                    </div>
                </div>
                <Drawer anchor='left' open={isDrowerOpen} onClose={() => setIsDrowerOpen(false)}>
                    <Box width='335px' textAlign='center' role='presentation' >
                        <div style={{ display: 'flex', justifyContent: "space-between", padding: '20px' }}>
                            <Tooltip title="Logout" placement="top">
                                <IconButton onClick={() => { localStorage.removeItem('alumni-token'); nevigate(siteLinks.welcome.link) }} sx={{ color: "#c75d5d" }} >
                                    <LogoutIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Close Menu" placement="top">
                                <IconButton color="primary" onClick={() => setIsDrowerOpen(false)}>
                                    <ClearIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                        {navcom.map((e, index) => (
                            <Button key={index}
                                startIcon={e.icon}
                                as={Link} to={e.path}
                                name={e.path}
                                value={e.value}
                                size="large"
                                sx={{ mx: "5px", my: "4px" }}
                                variant="contained"
                                onClick={() => { dispatch(setAlumniActive(e.name)); setIsDrowerOpen(false); }}
                                style={{
                                    borderRadius: 30,
                                    backgroundColor: `${alumniActive === e.name ? '#7ca6f8' : '#c2d7ff'}`,
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


                        ))}
                        <div style={{ padding: '15px' }}></div>
                    </Box>
                </Drawer>
            </div>
        </div>
    );
}