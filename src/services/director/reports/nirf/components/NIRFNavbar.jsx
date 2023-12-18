import { Drawer } from 'antd';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowButton from '../../../../../components/ArrowButton';


const NIRFNavbar = () => {

    const navigate = useNavigate()
    const { module, academicYear } = useParams();

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <div className="bg-gray-100 rounded-lg p-2">
                <div className="hidden md:flex items-center justify-between gap-2 text-center">
                    {
                        Object.keys(navbarLinks).map((item, index) => {
                            return <span onClick={() => navigate(`/director/nirf/${academicYear}/${navbarLinks[item].abbv}`)} className={`${item === module && 'border-b-2 text-blue-600 border-b-blue-600'}  hover:bg-gray-50 p-2 cursor-pointer text-xs md:text-sm text-center font-medium select-none`} key={index}>{navbarLinks[item].title}</span>
                        })
                    }
                </div>
                <div>
                    <div className="block md:hidden">
                        <ArrowButton title="Show Criteria List" onClickFunction={showDrawer} showArrow={false} />
                    </div>

                    <Drawer title="AQAR Criteria" placement="right" onClose={onClose} open={open}>
                        <div className="flex flex-col gap-3">
                            {
                                Object.keys(navbarLinks).map((item, index) => {
                                    return <span onClick={() => {
                                        navigate(`/director/nirf/${academicYear}/${navbarLinks[item].abbv}`);
                                        onClose();
                                    }} className={`${item === module && 'border-b-2 text-blue-600 border-b-blue-600'}  hover:bg-gray-50 p-2 cursor-pointer text-xs md:text-sm font-medium select-none`} key={index}>{navbarLinks[item].title}</span>
                                })
                            }
                        </div>
                    </Drawer>

                </div>
            </div>
        </div>
    )
}

export default NIRFNavbar

const navbarLinks = {
    'programs': {
        title: 'Sanctioned Intake',
        abbv: 'programs'
    },
    'sanctioned-intake': {
        title: 'Criterion 1',
        subtitle: "Curricular Aspects",
        abbv: 'sanctioned-intake',
    },
    'student-strength': {
        title: 'Criterion 2',
        subtitle: "Teaching, Learning & Evaluation",
        abbv: 'student-strength',
    },
    'placement-and-higher-education': {
        title: 'Criterion 3',
        subtitle: "Research, Innovations and Extension",
        abbv: 'placement-and-higher-education',
    },
    'patents': {
        title: 'Criterion 4',
        subtitle: "Infrastructure & Learning Resources",
        abbv: 'patents',
    },
    'consultancy': {
        title: 'Criterion 5',
        subtitle: "Student Support & Progression",
        abbv: 'consultancy',
    },
    'programs-organized': {
        title: 'Criterion 6',
        subtitle: "Governance, Leadership & Management",
        abbv: 'programs-organized',
    },
}

export { navbarLinks }
