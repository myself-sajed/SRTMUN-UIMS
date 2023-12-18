import SelectPrograms from "../components/SelectPrograms"
import StudentIntake from "../components/StudentIntake"

const nirfTablesObject = (schoolName) => {
    return {
        'programs': {
            id: 'programs',
            title: `Programs offered by ${schoolName}`,
            component: <SelectPrograms />
        },
        'sanctioned-intake': {
            id: 'sanctioned-intake',
            title: 'Sanctioned (Approved) Intake',
            component: <StudentIntake />
        }
    }
}

export default nirfTablesObject