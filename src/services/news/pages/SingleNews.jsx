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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';

const SingleNews = () => {

    const { slug } = useParams()

    let param = { slug }
    const { data, isLoading, isError, error, refetch } = useQuery([param.slug, param], () => fetchSingleItem(param))

    title(data?.data?.data ? data?.data?.data.headline : 'News Viewer')
    const [copied, setCopied] = useState(false)

    const copyNews = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('News URL copied successfully')
        setCopied(true)

    }

    return (
        <div>
            {
                !isLoading ? data?.data?.data && <div>
                    <Header showSearch={false} title={null} />

                    <div className='my-3 w-full'>
                        <div>
                            <div className='mt-3 bg-gray-100 p-2 border rounded-md'>
                                <div>
                                    <p className="text-base font-semibold text-start lg:text-2xl md:text-xl sm:text-md">{data?.data?.data.headline}</p>
                                    <div className='flex items-start gap-2 justitfy-start mt-3'>
                                        <span className='bg-orange-100 border rounded-md text-orange-900 flex items-center justify-start gap-1 whitespace-nowrap md:text-sm text-xs px-1'>
                                            <InsertInvitationRoundedIcon sx={{ fontSize: '15px' }} /> <div><span>{moment(data?.data?.data?.date, "YYYY-MM-DD").format("DD/MM/YYYY")}</span>
                                            </div>
                                        </span>
                                        <span onClick={copyNews} className='flex items-center justify-start gap-1 bg-green-100 border rounded-md hover:bg-green-200 text-green-900 cursor-pointer md:text-sm text-xs px-1'>
                                            {
                                                !copied ? <ContentCopyIcon sx={{ fontSize: '15px' }} /> :
                                                    <AssignmentTurnedInIcon sx={{ fontSize: '15px' }} />
                                            }

                                            Copy News link</span>
                                    </div>
                                </div>

                                <div className='flex md:flex-row flex-col items-start justify-center gap-4 my-5 w-full'>
                                    <div className='md:w-[40%] w-full'>
                                        <FileViewer fileName={data?.data?.data?.photoURL} serviceName="news" >
                                            <img src={serverLinks.showFile(data?.data?.data?.photoURL, 'news')}
                                                className='w-full object-cover cursor-pointer hover:brightness-75 ease-in-out duration-200 ' />
                                        </FileViewer>
                                    </div>
                                    <p className="md:text-base text-sm text-start md:w-[40%] w-full">{data?.data?.data.desc}</p>
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