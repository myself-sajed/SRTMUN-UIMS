import CombineComponentNirf from "../components/CombineComponentNirf"
import PlacementHENIRF from "../components/PlacementHENIRF"
import PlacemntAndHEForPriv3Year from "../components/PlacemntAndHEForPriv3Year"
import SelectPrograms from "../components/SelectPrograms"
import StudentIntake from "../components/StudentIntake"
import TotalAnnualStudentStrength from "../components/TotalAnnualStudentStrength"

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
        },
        'student-strength': {
            id: 'student-strength',
            title: 'Total Actual Student Strength',
            component: <TotalAnnualStudentStrength />
        },
        'placement-and-higher-education': {
            id: 'placement-and-higher-education',
            title: 'Placement & Higher Education',
            component: <PlacementHENIRF />
        },
        'patents': {
            id: 'patents',
            title: 'Patents',
            component: <div className="my-5 text-center">This section is under construction...</div>
            // component: <CombineComponentNirf model="PatentNirf" school={schoolName} program="Patents Published" />
        },
        'consultancy': {
            id: 'consultancy',
            title: 'Consultancy Projects',
            component: <div className="my-5 text-center">This section is under construction...</div>

            // component: <CombineComponentNirf model="ConsultancyNirf" school={schoolName} program="Consultancy Projects" />
        },
        'programs-organized': {
            id: 'programs-organized',
            title: 'Programs Organized',
            component: <div className="my-5 text-center">This section is under construction...</div>

            // component: <CombineComponentNirf model="DevelopmentProgramNirf" school={schoolName} program="Executive development programs / Management programs / Workshop / Training programs" />
        },
    }
}

export default nirfTablesObject