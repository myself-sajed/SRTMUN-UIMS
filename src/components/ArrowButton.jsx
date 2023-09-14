import React from 'react'

const ArrowButton = ({ title, onClickFunction, className, type = "button", colorClasses = "text-white bg-blue-700 hover:bg-blue-800" }) => {
    return (
        <button onClick={onClickFunction} type={type} className={`${colorClasses} font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ${className}`}>
            {title}
            <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
        </button>
    )
}

export default ArrowButton
