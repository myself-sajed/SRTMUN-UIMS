import React, { useEffect, useState } from 'react'
import { Submit, Text, privYear } from './PlacemntAndHEForPriv3Year';
import { useQuery } from 'react-query';
import getReq from '../../../../../components/requestComponents/getReq';
import UserLoading from '../../../../../pages/UserLoading';
import { useParams } from 'react-router-dom';

const tableHead = { noOfpublished: "No of Patents Published", noOfGranted: "No of Patents" }

const PatentNirf = ({ school, program }) => {

  const { academicYear } = useParams()
  const model = "PatentNirf";
  const module = "nirf"
  const privYearby1 = privYear(academicYear, 1);
  const privYearby2 = privYear(academicYear, 2);
  let filter = { academicYear: { $in: [academicYear, privYearby1, privYearby2] }, school }
  const params = { model, module, filter }
  const { data, isLoading, refetch } = useQuery(`${model}-${params}`, () => getReq(params), { refetchOnWindowFocus: false })


  const preInitialState = { school, noOfpublished: null, noOfGranted: null }

  const initialstate = { [academicYear]: preInitialState, [privYearby1]: preInitialState, [privYearby2]: preInitialState }

  const [values, setValues] = useState(initialstate);

  const [btnLoading, setBtnLoading] = useState({ [privYearby2]: false, [privYearby1]: false, [academicYear]: false })
  const yearArray = [privYearby2, privYearby1, academicYear]


  useEffect(() => {
    if (initialstate) {
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
                <th>Calendar Year</th>
                {Object.values(tableHead)?.map((e, i) => <th key={`head${i}`}>{e}</th>)}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                yearArray.map((e, i) => {
                  return (<tr key={`tr-${i}`}>
                    <th>{e}</th>
                    <td><Text type="number" name="noOfpublished" fieldName={e} setValues={setValues} value={values[e]?.noOfpublished} /></td>
                    <td><Text type="number" name="noOfGranted" fieldName={e} setValues={setValues} value={values[e]?.noOfGranted} /></td>
                    <td><Submit values={values[e]} model={model} module={module} academicYear={e} refetch={refetch} setBtnLoading={setBtnLoading} btnLoading={btnLoading} setValues={setValues} valdateArr={Object.keys(tableHead)} /></td>

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

export default PatentNirf
