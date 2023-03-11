import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchSingleItem } from '../js/fetchNews'
import UserLoading from '../../../pages/UserLoading'
import serverLinks from '../../../js/serverLinks'
import Header from '../components/Header'
import moment from 'moment'
import FileViewer from '../../../components/FileViewer'
import title from '../../../js/title'

const SingleNews = () => {

    const { slug } = useParams()

    let param = { slug }
    const { data, isLoading, isError, error, refetch } = useQuery([param.slug, param], () => fetchSingleItem(param))

    title(data?.data?.data ? data?.data?.data.headline : 'News Viewer')

    return (
        <div>
            {
                !isLoading ? data?.data?.data && <div>
                    <Header showSearch={false} title={null} />

                    <div className='my-3 w-full'>
                        <div>
                            <div className='mt-3 bg-gray-100 p-2 border rounded-md'>
                                <div className='flex items-start justify-between'>
                                    <p className="text-2xl font-semibold text-start">{data?.data?.data.headline}</p>
                                    <p className='text-muted text-sm whitespace-nowrap mt-2'> Posted on: <b>{moment(data?.data?.data?.createdAt).format('DD/MM/YYYY')}</b> </p>
                                </div>

                                <div className='flex items-start justify-center gap-4 my-5 w-full'>
                                    <div className='w-[40%]'>
                                        <FileViewer fileName={data?.data?.data?.photoURL} serviceName="news" >
                                            <img src={serverLinks.showFile(data?.data?.data?.photoURL, 'news')}
                                                className='w-full object-cover cursor-pointer hover:brightness-75 ease-in-out duration-200 ' />
                                        </FileViewer>
                                    </div>
                                    <p className="text-base text-start w-[40%]">{data?.data?.data.desc}</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div> : <UserLoading title="Getting news" />
            }
        </div>
    )
}

export default SingleNews