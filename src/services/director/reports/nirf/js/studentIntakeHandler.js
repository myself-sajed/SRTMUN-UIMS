import Axios from 'axios'
import toast from 'react-hot-toast'

const saveStudentIntake = async (programId, programData, schoolName) => {
    const link = `${process.env.REACT_APP_MAIN_URL}/NIRF/saveStudentIntake`

    try {
        const res = await Axios.post(link, { programId, programData, schoolName })

        if (res.data.status === 'success') {
            toast.success('Intake Saved Successfully')
        } else {
            toast.error('Could not save student intake')
        }
    } catch (error) {
        console.log('Error in save intake count', error)
        toast.error('Could not save intake count')
    }

}

async function fetchStudentIntake(schoolName) {
    const link = `${process.env.REACT_APP_MAIN_URL}/NIRF/getStudentIntake`
    return await Axios.post(link, { schoolName })
}


export { saveStudentIntake, fetchStudentIntake }