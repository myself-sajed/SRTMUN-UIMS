import Axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const useOtherServiceAuth = ({ shouldNavigate = true, tokenName, model, setUser, navigationHomeLink, navigationLoginLink, usingInIsUserLoggedInHook = false }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const token = localStorage.getItem(tokenName)

        if (token) {

            Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/user/authentication`,
                { token: token, model, filterName: 'email' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setUser(res.data.user))
                        if (!usingInIsUserLoggedInHook) {
                            if (shouldNavigate) navigate(navigationHomeLink, { replace: true })
                        }
                    }
                    else {
                        if (!usingInIsUserLoggedInHook) {
                            navigate(`/load/${navigationLoginLink}`, { replace: true })
                        }
                        dispatch(setUser(null))
                        localStorage.removeItem(tokenName)
                    }
                })
                .catch(err => {
                    if (!usingInIsUserLoggedInHook) {
                        navigate(navigationLoginLink, { replace: true })
                    }
                    dispatch(setUser(null))
                    localStorage.removeItem(tokenName)
                })
        }
        else {
            if (!usingInIsUserLoggedInHook) {
                navigate(navigationLoginLink, { replace: true })
            }
            dispatch(setUser(null))
            localStorage.removeItem(tokenName)
        }
    }, [])

}

export default useOtherServiceAuth