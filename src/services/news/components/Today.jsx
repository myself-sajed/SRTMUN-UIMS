import moment from 'moment'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FileViewer from '../../../components/FileViewer'
import serverLinks from '../../../js/serverLinks'
import Actions from './Actions'

const Today = ({ news, proUser, refetch, index }) => {

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{moment(news?.createdAt).format('DD/MM/YYYY')}</td>
            <td><FileViewer fileName={news?.photoURL} serviceName="news" >
                <img src={serverLinks.showFile(news?.photoURL, 'news')}
                    className='object-cover cursor-pointer w-20 hover:brightness-75 ease-in-out duration-200 ' />
            </FileViewer></td>
            <td >
                <Link to={`/news/${news?.slug}`} className='text-blue-500' >{news?.headline}</Link>
            </td>
            <td>{news.desc ?
                news.desc.length > 80 ?
                    news.desc.slice(0, 80) : news.desc
                : '--'} {news.desc.length > 80 && <span className='text-xs'><Link to={`/news/${news?.slug}`} className='text-blue-500' >...Read More</Link></span>} </td>

            {
                proUser && <td><Actions news={news} refetch={refetch} /></td>
            }
        </tr>
    )
}

export default Today