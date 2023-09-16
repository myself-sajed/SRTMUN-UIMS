import React, { useEffect, useState } from 'react'
import YFStudentsList from '../components/YFStudentsList'
import Lists from '../../../components/tableComponents/Lists'
import Select from '../../../components/formComponents/Select'
import SelectStudents from '../components/SelectStudents'
import useScroll from '../../../hooks/useScroll'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import { useSelector } from 'react-redux'
import { addCompetition } from '../js/competitionHandler'

const StudentSelection = ({ filterByAcademicYear }) => {
    const initialState = { competitionName: null }
    const [compDetails, setCompDetails] = useState(initialState)
    const { competitionName } = compDetails
    const [selectedStudents, setSelectedStudents] = useState([])
    const [open, setOpen] = useState(false)
    const [isLoad, setIsAdding] = useState(false)

    useScroll()

    const user = useSelector((state) => state.user?.youthUser)
    let filter = { college: user?._id }
    if (filterByAcademicYear) {
        filter.academicYear = filterByAcademicYear
    }
    const params = { model: "YfStudents", id: '', module: "youth", filter }
    const { data, isLoading, isError, error, refetch } = useQuery("YfStudents", () => getReq(params))

    useEffect(() => {
        if (competitionName) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [competitionName])

    const onSubmit = (e) => {
        e.preventDefault()
        addCompetition({ college: user, selectedStudents, competitionName, academicYear: filterByAcademicYear, isGroup: false, clearFunction: clearState })
    }

    const clearState = () => {
        setCompDetails(initialState)
        setSelectedStudents([])
    }


    return (
        <div>
            <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="col-span-2 border rounded-md p-3">
                    <div>
                        <Select className="col-md-5" id="competitionName" value={competitionName} label="स्पर्धेचे नाव निवडा" setState={setCompDetails} options={Lists.yfIndividual} />
                    </div>
                    <SelectStudents setSelectedStudents={setSelectedStudents} selectedStudents={selectedStudents} students={data?.data} isModalOpen={open} setIsModalOpen={setOpen} compDetails={compDetails} setCompDetails={setCompDetails} onSubmit={onSubmit} onCancel={clearState} />

                </div>
                <div>
                    <YFStudentsList students={data?.data} />
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


