import React from 'react'
import Footer from '../../../components/Footer'
import Header from '../components/Header'
import Old from '../components/Old'
import Today from '../components/Today'
import Week from '../components/Week'

const NewsPage = () => {
    return (
        <div>
            <Header />

            <div className='my-2 rounded-md p-2 bg-blue-100'>
                <p className='font-bold ml-2'>Today</p>
                <div className='flex md:flex-row flex-col flex-wrap h-full gap-2 p-2 w-full'>
                    <Today className="flex-auto w-full md:w-[40%] " />
                    <Today className="flex-auto w-full md:w-[40%] " />
                    <Today className="flex-auto w-full md:w-[40%] " />
                    <Today className="flex-auto w-full md:w-[40%] " />
                </div>
            </div>
            <div className='my-2 rounded-md p-2 bg-gray-100'>
                <p className='font-bold ml-2'>Earlier this week</p>
                <div className='flex md:flex-row flex-col flex-wrap h-full gap-2 p-2'>
                    <Today className="flex-auto w-full md:w-[40%]" />
                    <Today className="flex-auto w-full md:w-[40%]" />
                    <Today className="flex-auto w-full md:w-[40%]" />
                    <Today className="flex-auto w-full md:w-[40%]" />
                </div>
            </div>
            <div className='my-2 rounded-md p-2 bg-gray-100'>
                <p className='font-bold ml-2'>Older</p>
                <div className='flex flex-wrap h-full gap-2 p-2'>
                    <Old className="flex-auto" />
                    <Old className="flex-auto" />
                    <Old className="flex-auto" />
                    <Old className="flex-auto" />
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default NewsPage