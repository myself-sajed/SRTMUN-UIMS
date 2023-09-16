
const addCompetition = async ({ college, selectedStudents, competitionName, academicYear, isGroup, clearFunction, isLoading }) => {
    const link = `${process.env.REACT_APP_MAIN_URL}/youthfestival/competition/add`
    console.log({ college, selectedStudents, competitionName, academicYear, isGroup })
    // Axios.post(link, { college, selectedStudents, competitionName, academicYear, isGroup })
}

export { addCompetition }