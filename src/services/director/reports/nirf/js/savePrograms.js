import Axios from 'axios'
import toast from 'react-hot-toast'

async function savePrograms(schoolName, academicYear, programs, dispatch, setData, setIsProgramLoading) {
    setIsProgramLoading(true)
    const link = `${process.env.REACT_APP_MAIN_URL}/NIRF/savePrograms`
    try {
        const res = await Axios.post(link, { schoolName, programs, academicYear })

        if (res.data.status === 'success') {
            dispatch(setData(res.data?.data || []))
            toast.success('Program(s) Saved Successfully')
        } else {
            toast.error('Could not save program(s)')
        }
    } catch (error) {
        console.log('Error in save programs', error)
        toast.error('Could not save program(s)')
    } finally {
        setIsProgramLoading(false)
    }
}

async function fetchPrograms(schoolName, academicYear) {
    const link = `${process.env.REACT_APP_MAIN_URL}/NIRF/getPrograms`
    return await Axios.post(link, { schoolName, academicYear })
}

export { savePrograms, fetchPrograms }