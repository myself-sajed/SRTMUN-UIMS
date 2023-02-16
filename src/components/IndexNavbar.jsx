import { Avatar } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useUserIsLoggedIn from '../hooks/useUserIsLoggedIn';
import useScroll from '../hooks/useScroll';

const IndexNavbar = () => {

    const user = useSelector(state => state.user.user)
    const adminUser = useSelector(state => state.user.adminUser)
    const directorUser = useSelector(state => state.user.directorUser)
    const navigate = useNavigate()
    useScroll()

    useEffect(() => {
        console.log('dir', directorUser);
    }, [directorUser])

    useUserIsLoggedIn()

    return <>


    </>
}

export default IndexNavbar


const IndexNavs = ({ url, title, name }) => {

    const navigate = useNavigate()
    const pathName = window.location.pathname

    return (
        <li className={` hover:bg-gray-300 py-1 px-2 hover:rounded-xl
        ${pathName === name ? 'text-black bg-gray-300 py-1 px-2 rounded-xl font-bold' : 'text-black'} text-sm sm:text-base`}
            onClick={() => { navigate(`${url}`) }}>
            {title}
        </li>


    )
}