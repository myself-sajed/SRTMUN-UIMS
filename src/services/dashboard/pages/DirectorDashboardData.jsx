import React from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import GoBack from '../../../components/GoBack'
import TableComponent from '../../../components/TableComponent'
import sortByAcademicYear from '../../../js/sortByAcademicYear'
import CASDataTable from '../../faculty/reports/cas/components/CASDataTable'
import fetchData, { departmentWiseFetching } from '../js/fetchData'

const DirectorDashboardData = () => {


    const { model, title: pageTitle, school } = useParams()
    const param = { model, school, userType: "director" }
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => departmentWiseFetching(param))

    useEffect(() => {
        console.log('Data is :', data)
    }, [data])


    return (
        <div>
            <GoBack backUrl={-1} pageTitle={`${school}: ${pageTitle} (${data?.data?.data?.length})`} />
            <div className='mt-5'>

                {/* <TableComponent model={model && model} data={sortByAcademicYear(data?.data?.data, 'year')} takeFromModal={true} /> */}

            </div>
        </div>
    )
}

export default DirectorDashboardData