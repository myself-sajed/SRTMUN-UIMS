import React, { useEffect, useState } from 'react'
import { Text, privYear, Submit } from './PlacemntAndHEForPriv3Year';
import { useQuery } from 'react-query';
import getReq from '../../../../../components/requestComponents/getReq';
import UserLoading from '../../../../../pages/UserLoading';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const tableHead = {
  PatentNirf: { noOfpublished: "No of Patents Published", noOfGranted: "No of Patents" },
  ConsultancyNirf: { Consultancy: "Total no of Consultancy", clientOrganization: "Total no of Client Organization", amountReceived: "Total Amount Received (in INR)", amountInWords: "Amount Received in Words" },
  DevelopmentProgramNirf: { NoOfEDPMDP: "No of Executive Development Programs/ Management Development Programs", participants: "Total no Of Participants", earnings: "Total Annnual Earnings (Excluding Lodging & Boarding Charges) in INR", earningsInWords: "Total Annnual Earnings in Words" }
}
const CombineComponentNirf = ({ model, program }) => {
  /* PatentNirf, ConsultancyNirf, DevelopmentProgramNirf  */

  const user = useSelector((state) => state?.user?.directorUser)
  const school = user?.department
  const { academicYear } = useParams()
  const textFilds = ["amountInWords", "earningsInWords"]
  const module = "nirf"
  const privYearby1 = privYear(academicYear, 1);
  const privYearby2 = privYear(academicYear, 2);
  let filter = { academicYear: { $in: [academicYear, privYearby1, privYearby2] }, school }
  const params = { model, module, filter }
  const { data, isLoading, refetch } = useQuery(`${model}-${params}`, () => getReq(params), { refetchOnWindowFocus: false })

  // console.log(school, model, 'NIRF:', data?.data)

  const keysOfModel = Object.keys(tableHead[model])
  const preInitialState = {}
  keysOfModel.forEach((key) => {
    preInitialState[key] = null;
  })
  preInitialState.school= school
  const initialstate = { [academicYear]: preInitialState, [privYearby1]: preInitialState, [privYearby2]: preInitialState }
  const [values, setValues] = useState(initialstate);

  const [btnLoading, setBtnLoading] = useState({ [privYearby2]: false, [privYearby1]: false, [academicYear]: false })
  const yearArray = [privYearby2, privYearby1, academicYear]

  useEffect(() => {
    if (school) {
      setValues(initialstate)
    }
  }, [school])
  useEffect(() => {
    data?.data.map((e) => {
      setValues(prev => {
        return { ...prev, [e.academicYear]: { ...e, school: school } }
      })
    })
  }, [data])

  return (
    <div>
      {isLoading ? <div className='w-full flex justify-center'><UserLoading title="Fetching Placement and HE Content" /></div> : <div className="my-3 border-2 rounded-md p-2">
        <p className="my-3 font-medium">{program}</p>

        <div className="table-responsive">
          <table className="table table-bordered" >
            <thead className='bg-primary text-light'>
              <tr>
                <th>{model === "PatentNirf" ? "Calendar Year" : "Financial Year"}</th>
                {Object.values(tableHead[model])?.map((e, i) => <th key={`head${i}`}>{e}</th>)}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                yearArray.map((e, i) => {
                  return (<tr key={`tr-${i}`}>
                    <th>{e}</th>
                    {
                      keysOfModel.map((key) => <td><Text type={textFilds.includes(key) ? "text" : "number"} name={key} fieldName={e} setValues={setValues} value={values[e]?.[key]} /></td>)
                    }
                    <td><Submit values={values[e]} model={model} module={module} academicYear={e} refetch={refetch} setBtnLoading={setBtnLoading} btnLoading={btnLoading} setValues={setValues} valdateArr={keysOfModel} /></td>

                  </tr>)
                })
              }
            </tbody>
          </table>
        </div>

      </div>
      }
    </div>
  )
}

export default CombineComponentNirf
