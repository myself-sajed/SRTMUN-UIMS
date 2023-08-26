import React from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import { useNavigate } from 'react-router-dom'

const WorkshopHome = () => {
    let bredLinks = [siteLinks.welcome, siteLinks.workshop]
    const navigate = useNavigate()
    return (
        <div>
            <GoBack backUrl={-1} pageTitle="Workshop / Event" bredLinks={bredLinks} />
            <div className="animate-fade-up animate-once">
                <section>
                    <div className="pt-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
                        <div className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full ">
                            <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">Event / Workshop of Swami Ramanand Teerth Marathwada University</span>
                        </div>
                        <h1 className="mb-2 text-xl font-extrabold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-3xl ">One Day Workshop on MOOCs Development for SWAYAM</h1>
                        <p className="mb-8 text-base font-normal text-gray-500 lg:text-lg sm:px-16 lg:px-48 ">"Participate in our comprehensive one-day workshop focused on MOOCs development for SWAYAM, empowering online education effectively."</p>
                        <button onClick={() => navigate("/workshop/registration-form")} class="inline-flex justify-center items-center py-2 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                            Register Now
                            <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    </div>

                </section>
            </div>

        </div>
    )
}

export default WorkshopHome
