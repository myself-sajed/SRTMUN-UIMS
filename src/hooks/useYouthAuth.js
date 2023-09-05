import Axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setYouthUser } from '../redux/slices/UserSlice';
import siteLinks from '../components/siteLinks';

const useYouthAuth = (shouldNavigate = true) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const youth_token = localStorage.getItem('youthfestival-token')

        if (youth_token) {

            Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/user/authentication`, { token: youth_token, model: 'YFCollege', filterName: 'email' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setYouthUser(res.data.user))
                        if (shouldNavigate) navigate(siteLinks.yfCollegeHome.link)
                    }
                    else {
                        navigate('/load/youth-login')
                        dispatch(setYouthUser(null))
                        localStorage.removeItem('youthfestival-token')
                    }
                })
                .catch(err => {
                    navigate(siteLinks.yfCollegeLogin.link)
                    dispatch(setYouthUser(null))
                    localStorage.removeItem('youthfestival-token')
                })
        }
        else {
            navigate(siteLinks.yfCollegeLogin.link)
            dispatch(setYouthUser(null))
            localStorage.removeItem('youthfestival-token')
        }


    }, [])

}

export default useYouthAuth