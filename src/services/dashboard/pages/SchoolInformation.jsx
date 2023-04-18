import React, { useEffect, useState } from 'react'
import GoBack from '../../../components/GoBack'
import { useParams } from 'react-router-dom'
import title from '../../../js/title'


const SchoolInformation = () => {
    const { schoolName } = useParams()
    title(`${schoolName} Details`)

    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <div>
            <GoBack pageTitle={`Details about ${schoolName}`} />

            <div
                className={`relative h-screen bg-cover bg-center flex items-center justify-center 
                transition duration-1000 ease-in-out mt-3 rounded-md
                ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                style={{
                    backgroundImage: `url('/assets/heroImage.jpg')`,
                    filter: 'brightness(0.8) contrast(1.2)',
                }}
            >
                <h1 className="text-white text-4xl font-bold text-center relative z-10">{schoolName}</h1>
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black rounded-md"></div>
                </div>
            </div>

            <div className='my-10'>
                Other information about the department
            </div>
        </div>
    )
}

export default SchoolInformation