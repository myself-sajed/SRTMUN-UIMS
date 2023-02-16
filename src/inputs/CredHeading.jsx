import React from 'react'

const CredHeading = ({ title, icon, spacing }) => {
    return (
        <div className={`flex items-center justify-center gap-2 mx-auto ${spacing}`}>
            {icon}
            <p className='text-orange-700 font-bold text-xl'>{title}</p>
        </div>
    )
}

export default CredHeading