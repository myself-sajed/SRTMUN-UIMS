import React from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import useYouthAuth from '../../../hooks/useYouthAuth'
import title from '../../../js/title'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setYouthUser } from '../../../redux/slices/UserSlice'


const YFCollegeHome = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useYouthAuth(true)
    const bredLinks = [siteLinks.welcome, siteLinks.yfCollegeHome]
    title(siteLinks.yfCollegeHome.title)


    return (
        <div>
            <GoBack pageTitle="Youth Festival College" bredLinks={bredLinks} />

            <div className='mt-3'>
                <button onClick={() => { logout(navigate, dispatch) }} className="bg-red-800 p-2 rounded-md text-white">Logout</button>
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
