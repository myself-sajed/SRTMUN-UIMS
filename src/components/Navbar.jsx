import React, { useEffect } from 'react'

const Navbar = () => {

    return (
        <>
            <div className='border-b'>
                <img src="/assets/logo.jpg" className='h-16 mx-auto mt-2 block sm:hidden ' alt="" />
                <div className="sm:flex items-center justify-between m-2 gap-3">
                    <img src="/assets/swami.png" alt="" className="hidden sm:block" />

                    <div className="sm:flex flex-col items-center justify-center">
                        <p className="text-md font-bold text-center sm:text-2xl md:text-3xl">SWAMI RAMANAND TEERTH MARATHWADA UNIVERSITY</p>
                        <p className="text-gray-500 text-center sm:text-base text-xs">Nanded- 431 606, Maharashtra State, India</p>
                        <p className='text-center mt-2 p-1 rounded-full hidden sm:block sm:text-sm md:text-base'>Established on 17th September 1994, Recognized by UGC U/s 2(f) and 12(B) NAAC Re-accredited with 'B++' grade</p>
                    </div>
                    <img src="/assets/logo.jpg" className='h-24 hidden sm:block md:block lg:block xl:block 2xl:block' alt="" />
                </div>

            </div>
            {/* <hr /> */}
        </>
    )
}

export default Navbar