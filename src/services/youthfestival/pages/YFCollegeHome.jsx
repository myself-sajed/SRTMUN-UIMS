import React from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import useYouthAuth from '../../../hooks/useYouthAuth'
import title from '../../../js/title'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setYouthUser } from '../../../redux/slices/UserSlice'
import DomainAddRoundedIcon from '@mui/icons-material/DomainAddRounded';
import Footer from '../../../components/Footer'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ArrowButton from '../../../components/ArrowButton'



const YFCollegeHome = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useYouthAuth(true)
    const bredLinks = [siteLinks.welcome, siteLinks.yfCollegeHome]
    title(siteLinks.yfCollegeHome.title)
    const user = useSelector((state) => state.user.youthUser)

    return (
        <div>
            <GoBack pageTitle="Youth Festival College" bredLinks={bredLinks} >
                <button onClick={() => { logout(navigate, dispatch) }} className="bg-red-700 hover:bg-red-600 p-2 rounded-md text-white">Logout</button>
            </GoBack>

            <div className='my-3 border rounded-xl bg-gradient-to-t from-blue-50 via-blue-100 to-blue-200 animate-fade-up animate-once h-screen'>
                <div className='p-3'>
                    <div class="flex items-center justify-between p-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 " role="alert">
                        <div className="flex items-center flex-auto">
                            <DomainAddRoundedIcon />
                            <span class="sr-only">Info</span>
                            <div>
                                <span class="font-medium text-xl ml-3">{user?.collegeName}</span>
                            </div>
                        </div>
                        <div>
                            <ArrowButton onClickFunction={() => { navigate(siteLinks.yfCollegeReport.link) }} title="Generate PDF Report" colorClasses='text-white bg-green-700 hover:bg-green-800' />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="bg-blue-50 p-3 rounded-lg grid grid-rows-4 gap-2">
                            <p className='font-medium'>College Details</p>
                            <InfoTile icon={<PersonRoundedIcon />} value={user?.principalName} />
                            <InfoTile icon={<MailRoundedIcon />} value={user?.email} />
                            <InfoTile icon={<LocalPhoneRoundedIcon />} value={user?.mobile} />
                            <InfoTile icon={<LocationOnRoundedIcon />} value={user?.address} />

                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                            <p className='font-medium'>Instructions to fill Youth Festival Form</p>
                            <div className="text-sm mt-2">
                                <p>Step 1: Choose Academic Year of which Youth Festival Form is to be submitted</p>
                                <p>Step 2: Fill Basic Form for Youth Festival</p>
                                <p>Step 3: Add Individual Student Information</p>
                                <p>Step 3: Add Group Performance Information</p>
                                <p>Step 4: After filling all the details, click on Generate Report to generate the PDF of all the data you have filled.</p>

                                <ArrowButton onClickFunction={() => { navigate(siteLinks.yfCollegeYouthForm.link) }} title="Fill Form" className="mt-3" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <Footer />
            </div>


        </div>
    )
}

export default YFCollegeHome

const logout = (navigate, dispatch) => {
    localStorage.removeItem('youthfestival-token')
    dispatch(setYouthUser(null))
    navigate('/')
}

const InfoTile = ({ icon, value }) => {
    return <p className="flex items-center gap-3">
        <span>{icon} </span> <span>{value}</span>
    </p>
}