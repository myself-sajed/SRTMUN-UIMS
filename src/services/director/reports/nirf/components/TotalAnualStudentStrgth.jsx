import React from 'react'
import Lists from '../../../../../components/tableComponents/Lists';

const tableHead = {males:"No. of Male Students", females:"No. of Female Students", total:"Total Students", outSideState:"Outside State (Including male & female)", outSideCountry:"Outside Country (Including male & female)", economicallyBackward:"Economically Backward (Including male & female)", sociallyChallenged:"Socially Challenged (SC+ST+OBC Including male & female)", fullFeeGovernment:"No. of students receiving full tuition fee reimbursement from the State and Central Government", fullFeeInstitution:"No. of students receiving full tuition fee reimbursement from Institution Funds", fullFeePrivateBodies:"No. of students receiving full tuition fee reimbursement from the Private Bodies", notReceivingfullFee:"No. of students who are not receiving full tuition fee reimbursement"}

const TotalAnualStudentStrength = ({programTypes = Lists.programType }) => {
  
  let model = "TotalAnualStudentStrength";
  let module = "nirf";
  let arr ={
    UG3:{males:12, females:34, total:46, outSideState:11, outSideCountry:3, economicallyBackward:4, sociallyChallenged:5, fullFeeGovernment:6, fullFeeInstitution:5, fullFeePrivateBodies:4, notReceivingfullFee:30},
    UG4:{males:12, females:34, total:46, outSideState:11, outSideCountry:3, economicallyBackward:4, sociallyChallenged:5, fullFeeGovernment:6, fullFeeInstitution:5, fullFeePrivateBodies:4, notReceivingfullFee:30},
    UG5:{males:12, females:34, total:46, outSideState:11, outSideCountry:3, economicallyBackward:4, sociallyChallenged:5, fullFeeGovernment:6, fullFeeInstitution:5, fullFeePrivateBodies:4, notReceivingfullFee:30},
    UG6:{males:12, females:34, total:46, outSideState:11, outSideCountry:3, economicallyBackward:4, sociallyChallenged:5, fullFeeGovernment:6, fullFeeInstitution:5, fullFeePrivateBodies:4, notReceivingfullFee:30},
    PG1:{males:12, females:34, total:46, outSideState:11, outSideCountry:3, economicallyBackward:4, sociallyChallenged:5, fullFeeGovernment:6, fullFeeInstitution:5, fullFeePrivateBodies:4, notReceivingfullFee:30},
    PG2:{males:12, females:34, total:46, outSideState:11, outSideCountry:3, economicallyBackward:4, sociallyChallenged:5, fullFeeGovernment:6, fullFeeInstitution:5, fullFeePrivateBodies:4, notReceivingfullFee:30}
  }
  return (
    <div>
      <table style={{border:"solid black 1px"}}>
        <thead>
          <tr><th>column Name</th>{Object.keys(tableHead).map((e)=>{
            return<th style={{border:"solid black 1px"}}>{tableHead[e]}</th>
          })}</tr>
        </thead>
        <tbody>
          {
            Object.keys(programTypes).map((e)=>{
              console.log(e);
            return<tr>
              {/* <th style={{border:"solid black 1px"}}>{programTypes[e].name}</th>
              <td style={{border:"solid black 1px"}}>{arr[e].males}</td>
              <td style={{border:"solid black 1px"}}>{arr[e].females}</td>
              <td style={{border:"solid black 1px"}}>{arr[e].total}</td>
              <td style={{border:"solid black 1px"}}>{arr[e].outSideState}</td>
              <td style={{border:"solid black 1px"}}>{arr[e].outSideCountry}</td>
              <td style={{border:"solid black 1px"}}>{arr[e].economicallyBackward}</td>
              <td style={{border:"solid black 1px"}}>{arr[e].sociallyChallenged}</td>
              <td style={{border:"solid black 1px"}}>{arr[e].fullFeeGovernment}</td>
              <td style={{border:"solid black 1px"}}>{arr[e].fullFeeInstitution}</td>
              <td style={{border:"solid black 1px"}}>{arr[e].fullFeePrivateBodies}</td>
              <td style={{border:"solid black 1px"}}>{arr[e].notReceivingfullFee}</td> */}
            </tr>}
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default TotalAnualStudentStrength
