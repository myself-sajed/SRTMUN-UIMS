import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import LocalPoliceRoundedIcon from '@mui/icons-material/LocalPoliceRounded';
import IndexNavbar from '../../../components/IndexNavbar';
import { setAdminUser } from '../../../redux/slices/UserSlice';
import useAdminAuth from '../../../hooks/useAdminAuth';
import Footer from '../../../components/Footer';
import useScroll from '../../../hooks/useScroll';
import Bred from '../../../components/Bred';
import CredInput from '../../../inputs/CredInput';
import CredSkeleton from '../../../components/CredSkeleton';
import CredButton from '../../../inputs/CredButton';
import CredHeading from '../../../inputs/CredHeading';
import title from '../../../js/title';


const AdminLogin = () => {
    title("Admin Login")
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useScroll()
    let links = [{ name: 'Welcome', link: '/' }, { name: 'Admin Login', link: '/admin-login' },]

    useAdminAuth(false)

    // handle submit
    function handleSubmit(e) {
        e.preventDefault()

        Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/auth/admin/login`, { username, password }).then(function (res) {
            if (res.data.status === 'ok') {
                dispatch(setAdminUser(res.data.adminUser))
                localStorage.setItem('admin-token', res.data.token)
                navigate('/admin/dashboard')
                toast.success('Logged in successfully')
            }
            else if (res.data.status === 'notok') {
                toast.error('Username or password is incorrect')
            }
            else {
                toast.error('Username or password is incorrect')
            }
        }).catch(function (err) {
            toast.error('Something went wrong')
        })

    }

    return (
        <>

            <CredSkeleton bred={links} onSubmit={handleSubmit} head={<CredHeading spacing="mb-3 mt-6" icon={<LocalPoliceRoundedIcon className='text-orange-700' />} title="Admin Login" />}>

                <CredInput state={username} setState={setUsername} placeholder="Enter Username" type="text" spacing="mb-2" />

                <CredInput state={password} size="40" setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" />

            </CredSkeleton>



        </>
    )
}

export default AdminLogin