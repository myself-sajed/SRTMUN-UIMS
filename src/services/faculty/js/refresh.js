// this function will access the database and get the information from the model received from the arguments

import axios from 'axios';
import toast from 'react-hot-toast';


const getData = async ({ model, userId, year }) => {
    return await axios.post(`${process.env.REACT_APP_MAIN_URL}/api/getData`, { model, userId, year })
}

const refresh = ({ model, userId, year, dataFilter = null }) => {

    if (model.includes('Book')) {
        console.log('Book filter in refresh :', dataFilter)
    }

    return axios.post(`${process.env.REACT_APP_MAIN_URL}/api/getData`, { model, userId, year, dataFilter })
}

export default refresh
export { getData }