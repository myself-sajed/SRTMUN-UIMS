import React, { useState } from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import EmptyBox from '../../../components/EmptyBox'
import Footer from '../../../components/Footer'
import Header from '../components/Header'
import Today from '../components/Today'
import fetchAllNews, { searchNews } from '../js/fetchNews'
import moment from "moment";
import { useSelector } from 'react-redux'
import title from '../../../js/title'
import UserLoading from '../../../pages/UserLoading'
import Axios from 'axios'
import { toast } from 'react-hot-toast'
import NewsTableHead from '../components/TableHead'

const NewsPage = () => {

    title('News Bulletin')
    const [search, setSearch] = useState(null)
    const [rangeDate, setRangeDate] = useState(null)

    useEffect(() => {
        console.log('rangeDate :', rangeDate)
    }, [rangeDate])

    return (
        <div>
            <Header search={search} setSearch={setSearch} rangeDate={rangeDate} setRangeDate={setRangeDate} />
            {rangeDate ? <SearchTable search={search} shouldFetchSearchData={false} rangeDate={rangeDate} /> : search ? <SearchTable search={search} shouldFetchSearchData={true} rangeDate={rangeDate} /> : <NewsComponent />}
            <Footer />
        </div>
    )
}

export default NewsPage

const NewsComponent = () => {



    let params = { filter: {} }
    const { data, isLoading, isError, error, refetch } = useQuery([params, params.filter], () => fetchAllNews(params))

    const [today, setToday] = useState([])
    const [week, setWeek] = useState([])
    const [older, setOlder] = useState([])
    const proUser = useSelector((state) => state.user.proUser)

    // sorting of all news data based on today, this week and older
    useEffect(() => {
        if (data?.data?.data) {

            const fetchData = async () => {
                const today = moment().startOf("day");
                const oneWeekAgo = moment().subtract(1, "week").startOf("day");

                const myArray = data?.data?.data
                const todayDocs = myArray.filter(obj => {
                    const createdAt = moment(obj.createdAt);
                    return createdAt.isSameOrAfter(today);
                });
                setToday(todayDocs);

                const weekDocs = myArray.filter(obj => {
                    const createdAt = moment(obj.createdAt);
                    return createdAt.isAfter(oneWeekAgo) && createdAt.isBefore(today);
                });
                setWeek(weekDocs);

                const olderDocs = myArray.filter(obj => {
                    const createdAt = moment(obj.createdAt);
                    return createdAt.isSameOrBefore(oneWeekAgo);
                });
                setOlder(olderDocs);
            };
            fetchData();

        }
    }, [data])

    return <div>
        {
            !isLoading ? <div>
                <div className='my-2 rounded-md p-2'>
                    <span className='font-bold border bg-blue-100 text-blue-700 rounded-lg py-1 px-3 md:text-base text-sm '>Today</span>

                    <div className='table-responsive md:text-base text-sm' >
                        <table className="table mt-3 table-bordered ">
                            <NewsTableHead proUser={proUser} />

                            <tbody>
                                {
                                    today && today.length > 0 && today.sort(function (a, b) {
                                        var rangeDateA = new Date(a.createdAt), rangeDateB = new Date(b.createdAt)
                                        return rangeDateB - rangeDateA;
                                    })?.map((newsItem, index) => {
                                        return <Today index={index} key={index} news={newsItem} refetch={refetch} proUser={proUser} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    {today && today.length === 0 && <div className="mx-auto" > <EmptyBox /> </div>}
                </div>
                <div className='my-2 rounded-md p-2'>
                    <span className='font-bold border bg-gray-100 rounded-lg py-1 px-3'>Earlier this week</span>

                    <div className='table-responsive md:text-base text-sm' >
                        <table className="table mt-3 table-bordered ">
                            <NewsTableHead proUser={proUser} />

                            <tbody>
                                {
                                    week && week.length > 0 && week.sort(function (a, b) {
                                        var rangeDateA = new Date(a.createdAt), rangeDateB = new Date(b.createdAt)
                                        return rangeDateB - rangeDateA;
                                    })?.map((newsItem, index) => {
                                        return <Today index={index} key={index} news={newsItem} refetch={refetch} proUser={proUser} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    {week && week.length === 0 && <div className="mx-auto" > <EmptyBox /> </div>}
                </div>
                <div className='my-2 rounded-md p-2'>
                    <span className='font-bold border bg-gray-100 rounded-lg py-1 px-3'>Older</span>

                    <div className='table-responsive md:text-base text-sm' >
                        <table className="table mt-3 table-bordered ">
                            <NewsTableHead proUser={proUser} />

                            <tbody>
                                {
                                    older && older.length > 0 && older.sort(function (a, b) {
                                        var rangeDateA = new Date(a.createdAt), rangeDateB = new Date(b.createdAt)
                                        return rangeDateB - rangeDateA;
                                    })?.map((newsItem, index) => {
                                        return <Today index={index} key={index} news={newsItem} refetch={refetch} proUser={proUser} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    {older && older.length === 0 && <div className="mx-auto" > <EmptyBox /> </div>}
                </div>
            </div> : <UserLoading title="Getting News for you" />
        }
    </div>
}

const SearchTable = ({ search, rangeDate, shouldFetchSearchData }) => {

    const proUser = useSelector((state) => state.user.proUser)
    let params = { search }
    const [newsLoading, setNewsLoading] = useState(false)
    const [rangeLoading, setRangeLoading] = useState(false)

    const [searchNewsData, setSearchNewsData] = useState(null)

    let { data, isLoading, isError, error, refetch } = useQuery([params, params.search], () => searchNews(params), { enabled: shouldFetchSearchData })

    const [searchNewsDataRange, setSearchNewsDataRange] = useState(null)

    useEffect(() => {
        refetch()
    }, [search])

    useEffect(() => {
        if (shouldFetchSearchData) {
            setSearchNewsData(data?.data?.data)
        } else {
            setSearchNewsData(searchNewsDataRange)
        }
    }, [data, searchNewsDataRange, rangeLoading, isLoading])

    useEffect(() => {
        if (shouldFetchSearchData) {
            setNewsLoading(isLoading)
        } else {
            setNewsLoading(rangeLoading)
        }
    }, [rangeLoading, isLoading])

    useEffect(() => {
        if (rangeDate) {
            console.log('Range date is :', rangeDate)
            const url = `${process.env.REACT_APP_MAIN_URL}/api/news/getDataByDate`

            Axios.post(url, { start: rangeDate.start, end: rangeDate.end })
                .then((res) => {
                    if (res.data.status === 'success') {
                        setSearchNewsDataRange(res.data.data)
                    } else {
                        toast.error(res.data.message)
                    }
                }).catch((err) => {
                    toast.error('Something went wrong...')
                })
        }
    }, [rangeDate])

    return <div className='my-2 rounded-md p-2'>
        <span className='font-bold bg-blue-100 text-blue-700 rounded-lg py-1 px-3 md:text-base text-sm '>Search results {`(${searchNewsData?.length ? searchNewsData?.length : 0})`} </span>

        {
            newsLoading ? <UserLoading title="Getting search results" /> : <div>
                <div className='table-responsive md:text-base text-sm' >
                    <table className="table mt-3 table-bordered ">
                        <NewsTableHead proUser={proUser} />
                        <tbody>
                            {
                                searchNewsData && searchNewsData?.length > 0 && searchNewsData?.sort(function (a, b) {
                                    var rangeDateA = new Date(a.createdAt), rangeDateB = new Date(b.createdAt)
                                    return rangeDateB - rangeDateA;
                                })?.map((newsItem, index) => {
                                    return <Today index={index} key={index} news={newsItem} refetch={refetch} proUser={proUser} />
                                })
                            }
                        </tbody>
                    </table>
                </div>

                {searchNewsData && searchNewsData?.length === 0 && <div className="mx-auto" > <EmptyBox /> </div>}
            </div>
        }
    </div>
}

export { NewsComponent, SearchTable }