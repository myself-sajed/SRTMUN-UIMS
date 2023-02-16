import Axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setStudentUser } from '../redux/slices/UserSlice';
import siteLinks from '../components/siteLinks';

const useStudentAuth = (shouldNavigate = true) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const student_token = localStorage.getItem('student-token')

        if (student_token) {

            Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/user/authentication`, { token:student_token, model:'StudentUser', filterName : 'email' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setStudentUser(res.data.user))
                        if (shouldNavigate) navigate(siteLinks.studentHome.link)
                    }
                    else {
                        navigate('/load/student-login')
                        dispatch(setStudentUser(null))
                        localStorage.removeItem('student-token')
                    }
                })
                .catch(err => {
                    navigate(siteLinks.studentLogin.link)
                    dispatch(setStudentUser(null))
                    localStorage.removeItem('student-token')
                })
        }
        else {
            navigate(siteLinks.studentLogin.link)
            dispatch(setStudentUser(null))
            localStorage.removeItem('student-token')
        }


    }, [])

}

export default useStudentAuth