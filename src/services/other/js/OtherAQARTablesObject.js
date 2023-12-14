import AQARCheckRadio from "../../aqar-naac/components/AQARCheckRadio";
import AQARTablesObject from "../../aqar-naac/js/AQARTablesObject";
import IQACInstitutionQualityAssurance from "../pages/IQACInstitutionQualityAssurance";
import MaintenanceAndInfrastructure from "../pages/MaintenanceAndInfrastructure";
import OtherDemandRatio from "../pages/OtherDemandRatio";
import Scholarship from "../pages/Scholarship";
import TotalExpenditure from "../pages/TotalExpenditure";

function otherAQARTablesObject(academicYear) {
    return {
        "Finance Department": {
            title: "Finance Department",
            components: [
                {
                    title: "2.1.1 - Demand Ratio",
                    component: <OtherDemandRatio filterByAcademicYear={academicYear} />
                },
                {
                    title: "4.1.4 - Total Expenditure (FAO)",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '4.1.4', userType: 'other', school: "Finance"
                    },
                    component: <TotalExpenditure filterByAcademicYear={academicYear} />
                },

                {
                    title: "6.4.2 - Infrastructure and Maintenance Fundings",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '6.4.2', userType: 'other', school: "Finance"
                    },
                    component: <MaintenanceAndInfrastructure />
                },

            ]
        },
        "IQAC": {
            title: "IQAC",
            components: [
                {
                    title: "6.5.2 - Institution adopted Quality assurance",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '6.5.2', userType: 'other', school: "IQAC"
                    },
                    component: <>
                        <AQARCheckRadio
                            options={["Academic Administrative Audit (AAA) and follow up action taken", "Confernces, Seminars, Workshops on quality conducted", "Collaborative quality initiatives with other institution(s)", "Orientation programme on quality issues for teachers and students", "Participation in NIRF", "Any other quality audit recognized by state, national or international agencies (ISO Certification, NBA)"]}
                            academicYear={academicYear} radioId={"6.5.2"} school="IQAC"
                        /> <IQACInstitutionQualityAssurance />
                    </>
                },
            ]
        },
        "Scholarship": {
            title: "Scholarship",
            components: [
                {
                    title: "5.1.1 - Students receiving scholarships",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '5.1.1', userType: 'other', school: "Scholarship Section"
                    },
                    component: <Scholarship />
                },
            ]
        }
    }
}


export default otherAQARTablesObject