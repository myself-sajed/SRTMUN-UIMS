import axios from 'axios'

// you will find all these routes in /Server/utility/dashboard

const fetchData = ({model, filter}) => {
    console.log(model, filter)
    const url = `${process.env.REACT_APP_MAIN_URL}/api/get/dashboardData`
    return axios.post(url, { model, filter })
}

const fetchAlumniData = ({school}) => {
    const url = `${process.env.REACT_APP_MAIN_URL}/api/get/alumniData`
    return axios.post(url, { school })
}

const fetchSchoolData = ({school}) => {
    const url = `${process.env.REACT_APP_MAIN_URL}/api/get/allSchoolData`
    return axios.post(url, { school })
}

const countData = ({model, select}) => {
    const url = `${process.env.REACT_APP_MAIN_URL}/api/get/dashboardCount`
    return axios.post(url, { model, select })
}

export default fetchData
export {fetchSchoolData, fetchAlumniData, countData}