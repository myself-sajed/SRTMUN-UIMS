import axios from 'axios'

// you will find all these routes in /Server/utility/dashboard

const fetchData = ({ model, filter }) => {
    const url = `${process.env.REACT_APP_MAIN_URL}/api/get/dashboardData`
    return axios.post(url, { model, filter })
}

const fetchAlumniData = ({ school }) => {
    const url = `${process.env.REACT_APP_MAIN_URL}/api/get/alumniData`
    return axios.post(url, { school })
}

// /dashboard.jsx
const departmentWiseFetching = ({ school, model, userType }) => {
    const url = `${process.env.REACT_APP_MAIN_URL}/api/get/modelData/departmentWise`
    return axios.post(url, { school, model, userType })
}

const fetchSchoolData = ({ school }) => {
    const url = `${process.env.REACT_APP_MAIN_URL}/api/get/allSchoolData`
    return axios.post(url, { school })
}

const countData = ({ model, select, type }) => {
    console.log('Function is called')
    const url = `${process.env.REACT_APP_MAIN_URL}/api/get/dashboardCount`
    return axios.post(url, { model, select, type })
}

export default fetchData
export { fetchSchoolData, fetchAlumniData, countData, departmentWiseFetching }