import React from 'react'
import AdminTable from './AdminTable'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import { tableHead } from '../pages/AdminNumaricalData'
import AdminExcelExoprt from './AdminExcelExoprt'

//Extra tableHeads
import { tableHead as OnlineTableHead}  from '../tables_faculty/OrientationRefresherCourse'
import { tableHead as DemandRatioTableHead}  from '../tables_director/DemandRatio'
import { tableHead as ReservedSeatsTableHead}  from '../tables_director/ReservedSeats'

const updatedTableHead = {...tableHead, Online: OnlineTableHead, DemandRatio: DemandRatioTableHead, ReservedSeats: ReservedSeatsTableHead }

const AdminMasterTable = ({module="Admin", proof="proof", color="#3d3dff", model, academicYear, heading, school, serviceName, costomParams}) => {

    const params = costomParams || { model, module, filter: academicYear && { year: { $in: academicYear } },
    filterConditios: school && { department: school }}
  
  const { data, isLoading } = useQuery(`${model} ${params}`, () => getReq(params))

  return (
    <div>
        <div className='mr-4 my-3'>
          <div className='flex w-full justify-end'>
            <p className={'px-2 mx-2'} style={{border: `1px solid ${color}`, color: `${color}`, borderRadius: "5px"}}>{data?.data.length}</p>
            <div className='flex items-center' style={{border:`solid 1px ${color}`, borderRadius: "3px" }}>
              <p style={{fontSize:"15px"}} className='px-3 text-[#2f9163]'>Download Excel</p>
              <AdminExcelExoprt data={data?.data} fileTitle={heading} SendReq={model} module={module} proof={proof} />
            </div>
          </div>
        </div>
      <AdminTable data={data?.data} tableHead={updatedTableHead[model]} proof={proof} serviceName={serviceName} Heading={heading} SendReq={model} isLoading={isLoading} headColor={color} tableHeight='90vh' />
    </div>
  )
}

export default AdminMasterTable
