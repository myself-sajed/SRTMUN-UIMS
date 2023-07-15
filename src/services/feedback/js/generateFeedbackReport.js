import axios from 'axios'
import { toast } from 'react-hot-toast'

const downloadAnalysisPDF = async ({ schoolName, feedbackUser, academicYear }) => {
    const link = `${process.env.REACT_APP_MAIN_URL}/feedback/generateReport`

    try {
        const res = await axios.post(link, { schoolName, feedbackUser, academicYear })
        if (res.data.status == 'success') {
            toast.success(`${feedbackUser} Report Generated Successfully`)
        } else if (res.data.status == 'error') {
            toast.error(res.data.message)
        }
    } catch (error) {
        toast.error('Error generating report', error)
    }


}



export { downloadAnalysisPDF }