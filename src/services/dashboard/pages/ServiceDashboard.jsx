
import React from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import GoBack from '../../../components/GoBack'
import fetchData, { fetchdata } from '../js/fetchData'
import UserLoading from '../../../pages/UserLoading'
import { iconDataObj } from '../../../templates/faculty/cas-report/Header'
import { useState } from 'react'
import EmptyBox from '../../../components/EmptyBox'

const ServiceDashboard = ({ data, iconDataObj, isLoading }) => {

    const [isAnalytics, setIsAnalytics] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('data :', data)
        let emptyCount = 0
        iconDataObj.forEach((item) => {
            data?.data?.data?.[item.model]?.length === 0 && emptyCount++;
        })

        if (emptyCount === iconDataObj.length) {
            setIsAnalytics(false)
        }

    }, [data])

    return (
        <div>


            <div>

                <div className='w-full'>
                    <ServiceDashboardHeading title="1. Analytics" />
                    {isLoading ? <UserLoading title="Getting the School Analytics" /> :
                        isAnalytics ? <div className='flex items-center justify-center flex-wrap gap-4'>
                            {
                                data?.data?.data && iconDataObj.map((item, index) => {
                                    return data?.data?.data?.[item.model]?.length > 0 && <div key={index} className='bg-blue-700 p-2 border border-blue-100 rounded-md px-3 hover:bg-blue-600 text-white' onClick={() => { item?.url && navigate(item.url) }}>
                                        <div className='flex items-center justify-start gap-2'>
                                            {item.icon} <span className='font-bold text-xl'>{data?.data?.data?.[item.model].length}</span>
                                        </div>
                                        <p>{item.title}</p>
                                    </div>
                                })
                            }
                        </div> : <EmptyBox />
                    }
                </div>

            </div>

        </div>
    )
}

export default ServiceDashboard


const ServiceDashboardHeading = ({ title }) => {
    return <p className='mb-3 mt-3 text-lg bg-blue-100 text-blue-700 border-blue-700 border-2 p-2 rounded-md'>{title}</p>
}

export { ServiceDashboardHeading }