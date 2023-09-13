import Axios from 'axios'
import toast from 'react-hot-toast'

function saveGeneralInfo(info, academicYear) {
    console.log(info, academicYear)
    const link = `${process.env.REACT_APP_MAIN_URL}/youth/saveInfo`
    Axios.post(link, { info, academicYear }).then((res) => {
        if (res.data.status === 'success') {
            toast.success('Data saved successfully')
        } else {
            toast.error('Error saving data')
        }
    }).catch((err) => {
        toast.error('Error saving data')
        console.log(err)
    })

}

function fetchInfo(filter) {
    const link = `${process.env.REACT_APP_MAIN_URL}/youth/fetchInfo`
    return Axios.post(link, { filter })
}


export { saveGeneralInfo, fetchInfo }