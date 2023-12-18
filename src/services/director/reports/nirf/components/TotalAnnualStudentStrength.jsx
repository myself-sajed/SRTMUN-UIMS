import React, { useState } from 'react'
import nirfPrograms from '../js/nirfPrograms';
import { useQuery } from 'react-query';
import getReq from '../../../../../components/requestComponents/getReq';

const tableHead = { males: "No. of Male Students", females: "No. of Female Students", total: "Total Students", outSideState: "Outside State (Including male & female)", outSideCountry: "Outside Country (Including male & female)", economicallyBackward: "Economically Backward (Including male & female)", sociallyChallenged: "Socially Challenged (SC+ST+OBC Including male & female)", fullFeeGovernment: "No. of students receiving full tuition fee reimbursement from the State and Central Government", fullFeeInstitution: "No. of students receiving full tuition fee reimbursement from Institution Funds", fullFeePrivateBodies: "No. of students receiving full tuition fee reimbursement from the Private Bodies", notReceivingfullFee: "No. of students who are not receiving full tuition fee reimbursement" }

const TotalAnnualStudentStrength = ({ programTypes = nirfPrograms.programType, academicYear = "2022-23", school= "School of Computational Sciences" }) => {

  let model = "TotalAnualStudentStrength";
  let module = "nirf";
  let filter = { academicYear, school}
    const params = { model, module, filter }
    const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))
  let initialstate ={};
  Object.keys(programTypes).map((e)=>{
    initialstate[e]={
      males: null, females: null, total: null, outSideState: null, outSideCountry: null, economicallyBackward: null, sociallyChallenged: null, fullFeeGovernment: null, fullFeeInstitution: null, fullFeePrivateBodies: null, notReceivingfullFee: null
    }
  })
  initialstate.academicYear=academicYear
  initialstate.school=school
  
  const [values, setValues] = useState(initialstate)

  // let data = {
  //   UG3: { males: 12, females: 34, total: 46, outSideState: 11, outSideCountry: 3, economicallyBackward: 4, sociallyChallenged: 5, fullFeeGovernment: 6, fullFeeInstitution: 5, fullFeePrivateBodies: 4, notReceivingfullFee: 30 },
  //   UG4: { males: 12, females: 34, total: 46, outSideState: 11, outSideCountry: 3, economicallyBackward: 4, sociallyChallenged: 5, fullFeeGovernment: 6, fullFeeInstitution: 5, fullFeePrivateBodies: 4, notReceivingfullFee: 30 },
  //   UG5: { males: 12, females: 34, total: 46, outSideState: 11, outSideCountry: 3, economicallyBackward: 4, sociallyChallenged: 5, fullFeeGovernment: 6, fullFeeInstitution: 5, fullFeePrivateBodies: 4, notReceivingfullFee: 30 },
  //   UG6: { males: 12, females: 34, total: 46, outSideState: 11, outSideCountry: 3, economicallyBackward: 4, sociallyChallenged: 5, fullFeeGovernment: 6, fullFeeInstitution: 5, fullFeePrivateBodies: 4, notReceivingfullFee: 30 },
  //   PG1: { males: 12, females: 34, total: 46, outSideState: 11, outSideCountry: 3, economicallyBackward: 4, sociallyChallenged: 5, fullFeeGovernment: 6, fullFeeInstitution: 5, fullFeePrivateBodies: 4, notReceivingfullFee: 30 },
  //   PG2: { males: 12, females: 34, total: 46, outSideState: 11, outSideCountry: 3, economicallyBackward: 4, sociallyChallenged: 5, fullFeeGovernment: 6, fullFeeInstitution: 5, fullFeePrivateBodies: 4, notReceivingfullFee: 30 }
  // }
  return (
    <div>
      <table style={{ border: "solid black 1px" }}>
        <thead>
          <tr><th>column Name</th>{Object.keys(tableHead).map((e) => {
            return <th style={{ border: "solid black 1px" }}>{tableHead[e]}</th>
          })}</tr>
        </thead>
        <tbody>
          {
            Object.keys(programTypes).map((e) => {
              return <tr>
                <th style={{border:"solid black 1px"}}>{programTypes[e].name}</th>
                <td style={{border:"solid black 1px"}}>{values[e].males}</td>
                <td style={{border:"solid black 1px"}}>{values[e].females}</td>
                <td style={{border:"solid black 1px"}}>{values[e].total}</td>
                <td style={{border:"solid black 1px"}}>{values[e].outSideState}</td>
                <td style={{border:"solid black 1px"}}>{values[e].outSideCountry}</td>
                <td style={{border:"solid black 1px"}}>{values[e].economicallyBackward}</td>
                <td style={{border:"solid black 1px"}}>{values[e].sociallyChallenged}</td>
                <td style={{border:"solid black 1px"}}>{values[e].fullFeeGovernment}</td>
                <td style={{border:"solid black 1px"}}>{values[e].fullFeeInstitution}</td>
                <td style={{border:"solid black 1px"}}>{values[e].fullFeePrivateBodies}</td>
                <td style={{border:"solid black 1px"}}>{values[e].notReceivingfullFee}</td>
              </tr>
            }
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default TotalAnnualStudentStrength
