import { Link } from 'react-router-dom'
import React from 'react'
import siteLinks from './siteLinks'

const Service = () => {
    return (
        <div>
            <section >

                <div className="flex flex-col lg:flex-row items-center justify-between flex-wrap">


                    <div className="p-3 flex-auto w-full lg:w-fit">
                        <div className="wrap-price">
                            <div className="price-innerdetail h-[100%] text-center flex flex-col items-center justify-between">
                                <div>
                                    <h5>Career Advancement Scheme</h5>
                                    <p className="prices">CAS Report</p>
                                </div>

                                <div className='flex items-center justify-center gap-2'>
                                    <Link to={siteLinks.cas.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none">Fill Form</Link>
                                    <Link to={siteLinks.casReport.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none">Generate Report</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 flex-auto w-full lg:w-fit">
                        <div className="wrap-price">
                            <div className="price-innerdetail h-[100%] text-center flex flex-col items-center justify-between">
                                <div>
                                    <h5>Performance Based Appraisal System</h5>
                                    <p className="prices">PBAS Report</p>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                    <Link to={siteLinks.pbas.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> Fill Form</Link>
                                    <Link to={siteLinks.pbasReport.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> Generate Report</Link>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="p-3 flex-auto w-full lg:w-fit">
                        <div className="wrap-price">
                            <div className="price-innerdetail h-[100%] text-center flex flex-col items-center justify-between">
                                <div>
                                    <h5>Annual Quality Assurance Report</h5>
                                    <p className="prices">AQAR</p>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                    <Link to={siteLinks.aqar.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> Fill Form</Link>
                                    <Link to={siteLinks.aqarReport.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> Download AQAR Data </Link>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="p-3 flex-auto w-full lg:w-fit">
                        <div className="wrap-price">
                            <div className="price-innerdetail h-[100%] text-center flex flex-col items-center justify-between">
                                <div>
                                    <h5>All Academic Details</h5>
                                    <p className="prices">Faculty Profile</p>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                    <Link to={siteLinks.facultyProfile.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> Profile</Link>
                                    <Link to={siteLinks.facultyReport.link} className="duration-200 bg-blue-900 text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none"> Generate Report</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Service


const ServiceTile = ({ fullForm, title, link1, link1Title, link2, link2Title, icon }) => {
    return (
        <div className="mb-5">
            {/* <Service /> */}
            <div className="col w-full sm:w-[400px]">
                <div className={`card radius-10 border-start border-0 border-3 border-success h-52`}>
                    <div className="card-body ">
                        <div className="d-flex align-items-start h-[100%]">
                            <div className='flex flex-col items-start justify-between h-[100%]'>
                                <div>
                                    <p className="mb-0 text-secondary">{fullForm}</p>
                                    <h4 className={`my-1 text-success text-[40px]`}>{title}</h4>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                    <Link to={`${link1}`} className="duration-200 bg-success text-white hover:bg-blue-800 p-2 rounded-lg ease-in-out mt-5 text-decoration-none">{link1Title}</Link>
                                    <Link to={`${link2}`} className="duration-200 bg-success text-white hover:bg-success p-2 rounded-lg ease-in-out mt-5 text-decoration-none">{link2Title}</Link>
                                </div>
                            </div>
                            <div className={`widgets-icons-2 mt-4 rounded-circle bg-gradient-ohhappiness text-white ms-auto`}>{icon}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ServiceTile }