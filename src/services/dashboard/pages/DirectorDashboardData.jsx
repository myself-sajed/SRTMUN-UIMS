import React from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import fetchData, { departmentWiseFetching } from '../js/fetchData'
import UserLoading from '../../../pages/UserLoading'
import DirectorTableComponent from '../../../components/DirectorTableComponent'

const DirectorDashboardData = ({ model, filter, school }) => {

    console.log(school)

    const param = { model, filter }

    console.log(model, filter)

    const { data, isLoading, isError, error, refetch } = useQuery(["DirectorDasboardData", school], () => fetchData(param))

    useEffect(() => {
        console.log(data?.data?.data)
    }, [data])


    return (
        <div>
            <div className="sticky-top bg-white text-[19px] font-bold pt-2 flex justify-center">
                {school}
            </div>

            <div className='mt-3'>

                {
                    isLoading ? <UserLoading title="Fetching data" /> : <DirectorTableComponent model={model && model} data={data?.data?.data} />
                }

            </div>
        </div>
    )
}

export default DirectorDashboardData