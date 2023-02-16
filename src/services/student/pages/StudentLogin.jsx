import Axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setStudentUser } from '../../../redux/slices/UserSlice';
import CredSkeleton from '../../../components/CredSkeleton'
import siteLinks from '../../../components/siteLinks'
import useStudentAuth from '../../../hooks/useStudentAuth'
import CredButton from '../../../inputs/CredButton'
import CredHeading from '../../../inputs/CredHeading'
import CredInput from '../../../inputs/CredInput'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import title from '../../../js/title'

const StudentLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    useStudentAuth()
    title("Student Login")
    const [isLoading, setIsLoading] = useState(false)

    const linkLine = <p className='text-center'>Don't have an account? <Link to={siteLinks.studentRegistration.link} className='cursor-pointer hover:text-blue-900 text-blue-600'>Register Now</Link> | <Link to={siteLinks.studentPasswordReset.link} className='cursor-pointer hover:text-blue-900 text-blue-600'>Forgot Password</Link> </p>

    // handle submit
    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/auth/student-login`, { username, password }).then(function (res) {
            if (res.data.status === 'ok') {
                dispatch(setStudentUser(res.data.user))
                localStorage.setItem('student-token', res.data.token)
                // dispatch(setActive('profile'));
                // dispatch(setPage('profile'));
                navigate(siteLinks.studentHome.link)
                toast.success('Logged in successfully')
                setIsLoading(false)
            }
            else if (res.data.status === 'notok') {
                toast.error('Username or password is incorrect')
                setIsLoading(false)
            }
            else {
                toast.error('Username or password is incorrect')
                setIsLoading(false)
            }
        }).catch(function (err) {
            toast.error('Something went wrong')
            setIsLoading(false)
        })

    }

    return (

        <CredSkeleton bred={[siteLinks.welcome, siteLinks.studentLogin]} onSubmit={handleSubmit} linkLine={linkLine} head={<CredHeading spacing="mb-3 mt-6" icon={<PersonRoundedIcon className='text-orange-700' />} title="Student Login" />}>

            <CredInput state={username} setState={setUsername} placeholder="Enter Email ID" type="text" spacing="mb-2" size={39} />

            <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

            <CredButton title="Login" isLoading={isLoading} />

        </CredSkeleton>

    )
}

export default StudentLogin;
