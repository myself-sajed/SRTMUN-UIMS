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
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Note from '../../director/reports/academic-audit/components/Note'
import ShowIndividualCompetitions from './ShowIndividualCompetitions'

const StudentSelection = ({ filterByAcademicYear, isGroup = false }) => {
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
        addCompetition({ college: user, selectedStudents, competitionName, academicYear: filterByAcademicYear, isGroup, clearFunction: clearState })
    }

    const clearState = () => {
        setCompDetails(initialState)
        setSelectedStudents([])
    }


    return (
        <div>

            <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="col-span-2 border rounded-md p-3">
                    <p className="text-center pb-2 border-b flex items-center justify-center gap-2 text-blue-700 font-bold"> {isGroup ? <><GroupsRoundedIcon />स्पर्धेत गट सहभागासाठी विद्यार्थी व्यवस्थापन</> : <><PersonRoundedIcon />स्पर्धेत वैयक्तिक सहभागासाठी विद्यार्थी व्यवस्थापन</>}  </p>

                    {
                        isGroup ? <Note title="ही प्रणाली स्पर्धांमध्ये गट सहभागाचे व्यवस्थापन सुलभ करते. प्रारंभ करण्यासाठी, स्पर्धेचे नाव निवडा, त्यानंतर तुम्हाला त्या स्पर्धेत समाविष्ट करायचे असलेले विद्यार्थी निवडा. त्या स्पर्धेसाठी निवडलेल्या सर्व विद्यार्थ्यांना एक युनिट म्हणून एकत्र केले जाईल. गट जतन करण्यासाठी सबमिट क्लिक करा करा आणि तुम्ही ही प्रक्रिया इतर कोणत्याही गटांसाठी देखील पुनरावृत्त करू शकता." classes="mt-3" /> : <Note title="स्पर्धांमध्ये वैयक्तिक सहभाग व्यवस्थापित करण्यासाठी ही एक प्रणाली आहे. कृपया स्पर्धेचे नाव निवडा, निवडलेल्या स्पर्धेत सहभागी होऊ इच्छिणाऱ्या विद्यार्थ्यांची संख्या निवडा आणि फॉर्म सबमिट करा. त्याचप्रमाणे, लागू असल्यास, इतर कोणत्याही स्पर्धांसाठी प्रक्रिया पुन्हा करा." classes="mt-3" />
                    }

                    <div className='mt-3'>
                        <Select className="col-md-5" id="competitionName" value={competitionName} label="स्पर्धेचे नाव निवडा" setState={setCompDetails} options={isGroup ? Lists.yfGgroup : Lists.yfIndividual} />
                    </div>

                    <div className='mt-3'>
                        <ShowIndividualCompetitions />
                    </div>

                </div>
                <div>
                    <YFStudentsList students={data?.data} />
                </div>
            </div>

            <SelectStudents setSelectedStudents={setSelectedStudents} selectedStudents={selectedStudents} students={data?.data} isModalOpen={open} setIsModalOpen={setOpen} compDetails={compDetails} setCompDetails={setCompDetails} onSubmit={onSubmit} onCancel={clearState} />
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


