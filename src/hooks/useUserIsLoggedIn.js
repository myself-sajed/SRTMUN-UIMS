import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Axios from 'axios'
import { setAdminUser, setDirectorUser, setUser, setAlumniUser, setStudentUser, setProUser, setYouthUser } from "../redux/slices/UserSlice"
import useYouthAuth from "./useYouthAuth"
import useOtherServiceAuth from "./useOtherServiceAuth"
import { dsdAuthParams } from "../services/dsd/pages/DSDHome"
import { krcAuthParams } from "../services/krc/pages/KRCHome"
import { sportsAuthParams } from "../services/sports/pages/SportsHome"
import { nssAuthParams } from "../services/nss/pages/NSSHome"
import { examAuthParams } from "../services/exam/pages/ExamHome"
import { placementAuthParams } from "../services/placement/pages/PlacementHome"
import { iilAuthParams } from "../services/iil/pages/IILHome"
import { skillsAuthParams } from "../services/skilldevelopment/pages/SkillsHome"
import { pgAuthParams } from "../services/pgsection/pages/PGHome"
import { apdsAuthParams } from "../services/apds/pages/APDSHome"
import { swayamAuthParams } from "../services/swayam/pages/SwayamHome"


const useUserIsLoggedIn = () => {

    const dispatch = useDispatch()
    useYouthAuth(false, true)
    useOtherServiceAuth({ ...dsdAuthParams, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...krcAuthParams, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...sportsAuthParams, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...nssAuthParams, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...examAuthParams, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...placementAuthParams, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...iilAuthParams, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...skillsAuthParams, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...pgAuthParams, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...apdsAuthParams, usingInIsUserLoggedInHook: true })
    useOtherServiceAuth({ ...swayamAuthParams, usingInIsUserLoggedInHook: true })


    useEffect(() => {

        // admin
        const admin_token = localStorage.getItem('admin-token')
        if (admin_token) {

            Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/auth/admin`, { admin_token })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setAdminUser(res.data.admin))
                    }
                    else {
                        dispatch(setAdminUser(null))
                        localStorage.removeItem('admin-token')

                    }
                })
                .catch(err => {
                    dispatch(setAdminUser(null))
                    localStorage.removeItem('admin-token')

                })
        }
        else {
            dispatch(setAdminUser(null))
            localStorage.removeItem('admin-token')

        }

        // faculty
        const faculty_token = localStorage.getItem('faculty-token')
        if (faculty_token) {

            Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/user/authentication`, { token: faculty_token, model: 'FacultyUser', filterName: 'username' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setUser(res.data.user))
                    }
                    else {
                        dispatch(setUser(null))
                        localStorage.removeItem('faculty-token')
                    }
                })
                .catch(err => {
                    dispatch(setUser(null))
                    localStorage.removeItem('faculty-token')

                })
        }
        else {
            dispatch(setUser(null))
            localStorage.removeItem('faculty-token')

        }

        // director
        const director_token = localStorage.getItem('director-token')
        if (director_token) {

            Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/user/authentication`, { token: director_token, model: 'DirectorUser', filterName: 'department' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setDirectorUser(res.data.user))
                    }
                    else {
                        dispatch(setDirectorUser(null))
                        localStorage.removeItem('director-token')

                    }
                })
                .catch(err => {
                    dispatch(setDirectorUser(null))
                    localStorage.removeItem('director-token')

                })
        }
        else {
            dispatch(setDirectorUser(null))
            localStorage.removeItem('director-token')
        }

        // student
        const student_token = localStorage.getItem('student-token')
        if (student_token) {

            Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/user/authentication`, { token: student_token, model: 'StudentUser', filterName: 'email' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setStudentUser(res.data.user))
                    }
                    else {
                        dispatch(setStudentUser(null))
                        localStorage.removeItem('student-token')
                    }
                })
                .catch(err => {
                    dispatch(setStudentUser(null))
                    localStorage.removeItem('student-token')

                })
        }
        else {
            dispatch(setStudentUser(null))
            localStorage.removeItem('student-token')

        }

        // alumni
        const alumni_token = localStorage.getItem('alumni-token')
        if (alumni_token) {

            Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/user/authentication`, { token: alumni_token, model: 'StudentUser', filterName: 'email' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setAlumniUser(res.data.user))
                    }
                    else {
                        dispatch(setAlumniUser(null))
                        localStorage.removeItem('alumni-token')
                    }
                })
                .catch(err => {
                    dispatch(setAlumniUser(null))
                    localStorage.removeItem('alumni-token')

                })
        }
        else {
            dispatch(setAlumniUser(null))
            localStorage.removeItem('alumni-token')

        }


        // pro
        const pro_token = localStorage.getItem('pro-token')
        if (pro_token) {

            Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/user/authentication`, { token: pro_token, model: 'PROUser', filterName: 'username' })
                .then(res => {
                    if (res.data.status === 'authenticated') {
                        dispatch(setProUser(res.data.user))
                    }
                    else {
                        dispatch(setProUser(null))
                        localStorage.removeItem('pro-token')
                    }
                })
                .catch(err => {
                    dispatch(setProUser(null))
                    localStorage.removeItem('pro-token')

                })
        }
        else {
            dispatch(setProUser(null))
            localStorage.removeItem('pro-token')
        }


    }, [])
}

export default useUserIsLoggedIn