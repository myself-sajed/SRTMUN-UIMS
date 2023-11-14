import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const navbarLinks = {
    'extended-profile': {
        title: 'Extended Profile',
        abbv: 'extended-profile',
    },
    'criterion-1': {
        title: 'Criterion 1',
        abbv: 'criterion-1',
    },
    'criterion-2': {
        title: 'Criterion 2',
        abbv: 'criterion-2',
    },
    'criterion-3': {
        title: 'Criterion 3',
        abbv: 'criterion-3',
    },
    'criterion-4': {
        title: 'Criterion 4',
        abbv: 'criterion-4',
    },
    'criterion-5': {
        title: 'Criterion 5',
        abbv: 'criterion-5',
    },
    'criterion-6': {
        title: 'Criterion 6',
        abbv: 'criterion-6',
    },
    'criterion-7': {
        title: 'Criterion 7',
        abbv: 'criterion-7',
    },
}

const AQARNavbar = () => {

    const navigate = useNavigate()
    const { stageName, academicYear, userType } = useParams();


    return (
        <div>
            <div className="bg-gray-100 rounded-lg p-2 flex items-center justify-between gap-2">
                {
                    Object.keys(navbarLinks).map((item, index) => {
                        return <span onClick={() => navigate(`/${userType}/aqar/${academicYear}/${navbarLinks[item].abbv}`)} className={`${item === stageName && 'border-b-2 text-blue-600 border-b-blue-600'}  hover:bg-gray-50 p-2 cursor-pointer text-sm font-medium select-none`} key={index}>{navbarLinks[item].title}</span>
                    })
                }
            </div>
        </div>
    )
}

export default AQARNavbar

export { navbarLinks }
