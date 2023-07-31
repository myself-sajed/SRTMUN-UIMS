import React from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import GoBack from '../../../components/GoBack'
import TableComponent from '../../../components/TableComponent'
import sortByAcademicYear from '../../../js/sortByAcademicYear'
import UserLoading from '../../../pages/UserLoading'
import CASDataTable from '../../faculty/reports/cas/components/CASDataTable'
import fetchData, { departmentWiseFetching } from '../js/fetchData'

const OtherDashboardData = ({ model, school }) => {


    // const { model, title: pageTitle, school } = useParams()
    const param = { model, school, userType: 'faculty' }
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => departmentWiseFetching(param))

    return (
        <div>
            <div className="sticky-top bg-white text-[19px] font-bold pt-2 flex justify-center">
                {school}
            </div>

            <div className='mt-3'>

                {
                    isLoading ? <UserLoading title="Fetching data" /> : <TableComponent model={model && model} data={sortByAcademicYear(data?.data?.data, 'year')} takeFromModal={true} />
                }

            </div>
        </div>
    )
}

export default OtherDashboardData