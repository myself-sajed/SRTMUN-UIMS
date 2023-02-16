// this function will access the database and get the information from the model received from the arguments

import Axios from 'axios';
import toast from 'react-hot-toast';


const refresh = async (model, setState, academicYear) => {
    console.log('Academic Year', academicYear)
    const res = await Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/getDataForAdmin`,
        { model, academicYear })
    if (res) {
        if (res.data.status === 'fetched') {
            setState(res.data.data)
        }
        else if (res.data.status === 'null') {
        }
        else {
            toast.error('Unable to fetch data from server')
        }
    } else {
        toast.error('Unable to fetch data from server')
    }

}

export default refresh