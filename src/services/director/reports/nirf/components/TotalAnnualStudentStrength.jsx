import React, { useEffect, useState } from 'react'
import programsByNIRF from '../js/programsByNIRF';
import { useQuery } from 'react-query';
import getReq from '../../../../../components/requestComponents/getReq';
import { Text } from './PlacemntAndHEForPriv3Year';
import { CircularProgress } from '@mui/material';

const tableHead = { males: "No. of Male Students", females: "No. of Female Students", total: "Total Students", outSideState: "Outside State (Including male & female)", outSideCountry: "Outside Country (Including male & female)", economicallyBackward: "Economically Backward (Including male & female)", sociallyChallenged: "Socially Challenged (SC+ST+OBC Including male & female)", fullFeeGovernment: "No. of students receiving full tuition fee reimbursement from the State and Central Government", fullFeeInstitution: "No. of students receiving full tuition fee reimbursement from Institution Funds", fullFeePrivateBodies: "No. of students receiving full tuition fee reimbursement from the Private Bodies", notReceivingfullFee: "No. of students who are not receiving full tuition fee reimbursement" }

const TotalAnnualStudentStrength = ({ programTypes = Object.keys(programsByNIRF), academicYear = "2022-23", school= "School of Computational Sciences" }) => {

  let model = "TotalAnnualStudentStrength";
  let module = "nirf";
  let filter = { academicYear, school}
    const params = { model, module, filter }
    const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))
  let initialstate ={};
  programTypes.map((e)=>{
    initialstate[e]={
      males: null, females: null, total: null, outSideState: null, outSideCountry: null, economicallyBackward: null, sociallyChallenged: null, fullFeeGovernment: null, fullFeeInstitution: null, fullFeePrivateBodies: null, notReceivingfullFee: null
    }
  })
  initialstate.academicYear=academicYear
  initialstate.school=school
  
  const [values, setValues] = useState(initialstate)

  useEffect(() => {
    if (data?.data?.[0]) {
      const firstItem = data.data[0];
      Object.keys(firstItem).forEach((key) => {
        setValues((prev)=>({
          ...prev, [key]: firstItem[key]
        }))
      });
    }
  }, [data]);

  useEffect(()=>{
    console.log(values);
  },[values])
 
  return (
    isLoading?<div className='w-full flex justify-center'><CircularProgress /></div>:<div>
      <table style={{ border: "solid black 1px" }}>
        <thead>
          <tr><th></th>{Object.keys(tableHead).map((e) => {
            return <th style={{ border: "solid black 1px" }}>{tableHead[e]}</th>
          })}</tr>
        </thead>
        <tbody>
          {
           programTypes.map((e) => {
              return <tr>
                <th style={{border:"solid black 1px"}}>{programsByNIRF[e].name}</th>
                <td style={{border:"solid black 1px"}}><Text type="number" name="males" academicYear={e} setValues={setValues} value={values[e].males} /></td>
                <td style={{border:"solid black 1px"}}><Text type="number" name="females" academicYear={e} setValues={setValues} value={values[e].females} /></td>
                <td style={{border:"solid black 1px"}}><Text type="number" name="total" academicYear={e} setValues={setValues} value={values[e].total} /></td>
                <td style={{border:"solid black 1px"}}><Text type="number" name="outSideState" academicYear={e} setValues={setValues} value={values[e].outSideState} /></td>
                <td style={{border:"solid black 1px"}}><Text type="number" name="outSideCountry" academicYear={e} setValues={setValues} value={values[e].outSideCountry} /></td>
                <td style={{border:"solid black 1px"}}><Text type="number" name="economicallyBackward" academicYear={e} setValues={setValues} value={values[e].economicallyBackward} /></td>
                <td style={{border:"solid black 1px"}}><Text type="number" name="sociallyChallenged" academicYear={e} setValues={setValues} value={values[e].sociallyChallenged} /></td>
                <td style={{border:"solid black 1px"}}><Text type="number" name="fullFeeGovernment" academicYear={e} setValues={setValues} value={values[e].fullFeeGovernment} /></td>
                <td style={{border:"solid black 1px"}}><Text type="number" name="fullFeeInstitution" academicYear={e} setValues={setValues} value={values[e].fullFeeInstitution} /></td>
                <td style={{border:"solid black 1px"}}><Text type="number" name="fullFeePrivateBodies" academicYear={e} setValues={setValues} value={values[e].fullFeePrivateBodies} /></td>
                <td style={{border:"solid black 1px"}}><Text type="number" name="notReceivingfullFee" academicYear={e} setValues={setValues} value={values[e].notReceivingfullFee} /></td>
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
