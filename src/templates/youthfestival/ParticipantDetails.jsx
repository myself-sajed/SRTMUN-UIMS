import React from 'react'
import { YFOfficeWork } from './InfoPage'

const ParticipantDetails = () => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-end ">
                <img src="/assets/sajed.jpg" className='w-32 h-32 border-2 border-black' />
            </div>
            <p className="text-xl font-bold text-center my-4">युवक महोत्सव सहभाग -- स्पर्धक योग्यता प्रमाणपत्र</p>

            <div>

            </div>

            <hr className="w-[80%] h-3 mx-auto my-4 bg-gray-800 border-0 rounded md:my-10" />
            <br />
            <div>
                <YFOfficeWork />
            </div>

        </div>
    )
}

export default ParticipantDetails
