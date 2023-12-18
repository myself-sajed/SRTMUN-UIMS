import Axios from 'axios'
import toast from 'react-hot-toast'

async function savePrograms(schoolName, programs, dispatch, setData) {
    const link = `${process.env.REACT_APP_MAIN_URL}/NIRF/savePrograms`
    try {
        const res = await Axios.post(link, { schoolName, programs })

        if (res.data.status === 'success') {
            dispatch(setData(res.data?.data || []))
            toast.success('Program(s) Saved Successfully')
        } else {
            toast.error('Could not save program(s)')
        }
    } catch (error) {
        console.log('Error in save programs', error)
        toast.error('Could not save program(s)')
    }
}

async function fetchPrograms(schoolName) {
    const link = `${process.env.REACT_APP_MAIN_URL}/NIRF/getPrograms`
    return await Axios.post(link, { schoolName })
}

export { savePrograms, fetchPrograms }