import React from 'react'

const TeachingAndActivities = ({ forPrintOut }) => {
    return (
        <div className="academic-start">
            <p className="academic-start"></p>
            <p className={`text-center ${forPrintOut === 'false' && 'bg-[#00987936] text-[#009879]'} p-2`}>
                <span className="font-bold">Teaching and Related Activities</span>
            </p>

            <div className="mt-3">

            </div>
        </div>
    )
}

export default TeachingAndActivities
