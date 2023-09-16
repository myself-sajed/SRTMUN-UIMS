import Axios from 'axios'

const addCompetition = async ({ college, selectedStudents, competitionName, academicYear, isGroup, clearFunction, isLoading }) => {
    const link = `${process.env.REACT_APP_MAIN_URL}/youthfestival/competition/add`
    Axios.post(link, { college, selectedStudents, competitionName, academicYear, isGroup, clearFunction })
}

export { addCompetition }