import React, { useEffect, useState } from 'react'
import YFStudentsList from '../components/YFStudentsList'
import Lists from '../../../components/tableComponents/Lists'
import Select from '../../../components/formComponents/Select'
import SelectStudents from '../components/SelectStudents'

const StudentSelection = () => {
    const initialState = { competitionName: null, selectedStudents: [] }
    const [compDetails, setCompDetails] = useState(initialState)
    const { competitionName, selectedStudents } = compDetails
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (competitionName) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [competitionName])

    const onSubmit = (e) => {
        e.preventDefault()
        setCompDetails(initialState)
    }
    const onCancel = () => {
        setCompDetails(initialState)
    }


    return (
        <div>
            <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="col-span-2 border rounded-md p-3">
                    <div>
                        <Select className="col-md-5" id="competitionName" value={competitionName} label="स्पर्धेचे नाव निवडा" setState={setCompDetails} options={Lists.yfIndividual} />
                    </div>
                    <SelectStudents students={students} isModalOpen={open} setIsModalOpen={setOpen} compDetails={compDetails} setCompDetails={setCompDetails} onSubmit={onSubmit} onCancel={onCancel} />

                </div>
                <div>
                    <YFStudentsList students={students} />
                </div>
            </div>
        </div>
    )
}

export default StudentSelection

const students = [
    {
        _id: 1,
        name: 'John Smith',
        photoURL: 'https://randomuser.me/api/portraits/men/1.jpg',
        counter: 0,
    },
    {
        _id: 2,
        name: 'Emily Johnson',
        photoURL: 'https://randomuser.me/api/portraits/women/2.jpg',
        counter: 0,
    },
    {
        _id: 3,
        name: 'Michael Brown',
        photoURL: 'https://randomuser.me/api/portraits/men/3.jpg',
        counter: 0,
    },
    {
        _id: 4,
        name: 'Sarah Davis',
        photoURL: 'https://randomuser.me/api/portraits/women/4.jpg',
        counter: 0,
    },
    {
        _id: 5,
        name: 'Robert Wilson',
        photoURL: 'https://randomuser.me/api/portraits/men/5.jpg',
        counter: 0,
    },
    {
        _id: 6,
        name: 'Jennifer Martinez',
        photoURL: 'https://randomuser.me/api/portraits/women/6.jpg',
        counter: 0,
    },
    {
        _id: 7,
        name: 'David Anderson',
        photoURL: 'https://randomuser.me/api/portraits/men/7.jpg',
        counter: 0,
    },
    {
        _id: 8,
        name: 'Linda Taylor',
        photoURL: 'https://randomuser.me/api/portraits/women/8.jpg',
        counter: 0,
    },
    {
        _id: 9,
        name: 'William Harris',
        photoURL: 'https://randomuser.me/api/portraits/men/9.jpg',
        counter: 0,
    },
    {
        _id: 10,
        name: 'Karen Clark',
        photoURL: 'https://randomuser.me/api/portraits/women/10.jpg',
        counter: 0,
    },
];

export { students };


