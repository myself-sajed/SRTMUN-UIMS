// this function will access the database and get the information from the model received from the arguments

import axios from 'axios';
import toast from 'react-hot-toast';


const getData = async ({ model, userId, year }) => {
    return await axios.post(`${process.env.REACT_APP_MAIN_URL}/api/getData`, { model, userId, year })
}

const refresh = ({ model, userId, year, dataFilter = null }) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/api/getData`, { model, userId, year, dataFilter })
}

const getModelData = ({ model, filter }) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/getModelData`, { model, filter })
}

export default refresh
export { getData, getModelData }