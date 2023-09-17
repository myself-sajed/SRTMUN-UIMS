import Axios from 'axios'
import toast from 'react-hot-toast'

const addCompetition = async ({
    college, selectedStudents, competitionName, academicYear, isGroup, clearFunction, setIsLoading, refetch, isEdit, alreadySelectedStudents, edit, compId
}) => {

    setIsLoading(true)
    const link = `${process.env.REACT_APP_MAIN_URL}/youthfestival/competition/add`
    Axios.post(link, { college, selectedStudents, competitionName, academicYear, isGroup, isEdit, alreadySelectedStudents, edit, compId })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success(res.data.message)
                clearFunction()
                refetch()
                setIsLoading(false)
            } else {
                toast.error(res.data.message)
                clearFunction()
                setIsLoading(false)
            }
        }).catch((err) => {
            console.log(err)
            console.log("Something went wrong")
            clearFunction()
            setIsLoading(false)
        })
}

const deleteCompetitions = (compId, refresh) => {
    const link = `${process.env.REACT_APP_MAIN_URL}/youtfestival/delete/competition`
    Axios.post(link, { compId }).then((res) => {
        if (res.data.status === 'success') {
            toast.success('स्पर्धा यशस्वीरित्या डिलीट करण्यात आली आहे')
            refresh();
        } else {
            toast.error('स्पर्धा डिलिट नाही होऊ शकली')
            refresh();
        }
    }).catch((err) => {
        console.log(err)
        refresh();
        toast.error('स्पर्धा डिलिट नाही होऊ शकली')
    })
}


const fetchYouthData = ({ model, filter }) => {
    const url = `${process.env.REACT_APP_MAIN_URL}/youthfestival/get/competitionData`
    return Axios.post(url, { model, filter })
}

const fetchStudentsData = ({ model, filter }) => {
    const url = `${process.env.REACT_APP_MAIN_URL}/youthfestival/get/student/select`
    return Axios.post(url, { model, filter })
}

export { addCompetition, fetchYouthData, fetchStudentsData, deleteCompetitions }