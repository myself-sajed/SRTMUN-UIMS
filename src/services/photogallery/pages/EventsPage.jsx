import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import fetchEvents from '../js/fetchEvents'
import serverLinks from '../../../js/serverLinks'
import { useNavigate } from 'react-router-dom'
import GoBack from '../../../components/GoBack'

const EventsPage = () => {
    let params = { filter: {} }
    const { data, isLoading, isError, error, refetch } = useQuery([params, params.filter], () => fetchEvents(params))

    useEffect(() => {
        console.log('Data :', data)
    }, [data])

    const navigate = useNavigate()

    return <div className="w-full">

        <GoBack pageTitle="All events" />

        <div className="flex flex-wrap gap-3 mt-3">
            {
                data?.data?.data?.map((event) => {
                    return event && <div className='bg-gray-200 border hover:bg-gray-100 ease-in-out duration-200 cursor-pointer p-3 rounded-lg flex-auto' onClick={() => navigate(`/event/${event._id}`)}>
                        <p className='font-semibold w-full'>{event.eventTitle}</p>
                        <div className='flex items-center justify-start my-2 gap-3'>
                            {
                                event.photos.map((photo) => {
                                    return <img className="w-1/2 h-1/2 object-cover" style={{ height: '50px', width: '50px' }} src={serverLinks.showFile(photo?.file, 'event')} />
                                })
                            }
                        </div>
                    </div>
                })
            }
        </div>

    </div>
}

export default EventsPage