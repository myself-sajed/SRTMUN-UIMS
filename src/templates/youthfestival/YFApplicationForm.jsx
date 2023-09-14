import React from 'react'
import { useParams } from 'react-router-dom'
import title from '../../js/title'
import { getYFApplicationData } from '../../services/youthfestival/js/yfGeneratePDF'
import { useQuery } from 'react-query'
import InfoPage from './InfoPage'
import ParticipantDetails from './ParticipantDetails'

const YFApplicationForm = () => {
    const { collegeId, academicYear } = useParams()
    title('Youth Festival Application Form')

    const { data, isLoading } = useQuery('YFData', () => getYFApplicationData(collegeId, academicYear))

    return (
        <div className="my-3">
            {!isLoading &&
                <div>
                    <div className='p-5 border-2 rounded-md border-gray-500'>
                        <InfoPage info={data?.data?.data?.info} college={data?.data?.data?.college} />
                    </div>
                    <div className='p-5 border-2 rounded-md border-gray-500 academic-start mt-5'>
                        <ParticipantDetails info={data?.data?.data?.info} college={data?.data?.data?.college} />
                    </div>

                </div>
            }
        </div>
    )
}

export default YFApplicationForm
