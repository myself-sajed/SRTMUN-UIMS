import React from 'react'
import { Link } from 'react-router-dom'
import Bred from '../components/Bred'
import Footer from '../components/Footer'
import siteLinks from '../components/siteLinks'
import title from '../js/title'
const PageNotFound = () => {
    let links = 
    title("Page Not Found")
    return (
        <div>
            <div className='mt-3'>
                <Bred links={[siteLinks.welcome, { title: 'Page Not Found', link: '/*' }]} />
            </div>

            <div className='h-screen'>
                <img src="/assets/pagenotfound.svg" alt="pagenotfound" className="w-[85%] md:w-[40%] sm:w-[70%] mt-5 mx-auto" />
                <p className="text-xl my-5 text-center"><Link to='/' className='text-blue-500 underline-none bg-blue-50 rounded-full p-2'>Take me Home</Link> </p>
            </div>

            <Footer />
        </div>
    )
}

export default PageNotFound