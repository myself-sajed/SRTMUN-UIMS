import React, { useState } from 'react'
import Wrapper from '../../academic-audit/components/Wrapper'
import NumberToTextField from '../../academic-audit/components/NumberToTextField'
import AuditTable from '../../academic-audit/components/AuditTable'
import TableData from '../../academic-audit/components/TableData'
import { useEffect } from 'react'
import Axios from 'axios'
import useDirectorAuth from '../../../../../hooks/useDirectorAuth'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import getAQARData from '../js/getAQARData'
import useScroll from '../../../../../hooks/useScroll'


const ExtendedProfile = ({ aqarYearState }) => {

    useScroll()
    useDirectorAuth()
    const directorUser = useSelector((state) => state.user.directorUser)
    const [data, setData] = useState(null)

    const [autoSaveLoader, setAutoSaveLoader] = useState(false)
    const [programDuringYear, setProgramDuringYear] = useState({ input: 0, ProgramCode: {}, ProgramName: {} })
    const [coursesDuringYear, setCoursesDuringYear] = useState({ input: 0, ProgramCode: {}, ProgramName: {}, CourseCode: {}, CourseName: {} })
    const [classrooms, setClassrooms] = useState(null)
    const [computers, setComputers] = useState(null)

    const extendedProfile = {
        programs: programDuringYear?.data ? programDuringYear.data : [],
        courses: coursesDuringYear?.data ? coursesDuringYear.data : [],
        classrooms: classrooms ? classrooms : 0,
        computers: computers ? computers : 0
    }

    const saveData = () => {

        const link = `${process.env.REACT_APP_MAIN_URL}/service/director/report/aqar/saveData`
        Axios.post(link, { extendedProfile, schoolName: directorUser?.department, academicYear: aqarYearState })
            .then((res) => {
                if (res) {
                    console.log('Saved data successfully :', res)
                    toast.success('Data saved successfully...')
                } else {
                    toast.error('Failed to save data')
                }
            }).catch((err) => {
                toast.success('Failed to save data in catch up state :', err)
            })

    }

    useEffect(() => {
        if (autoSaveLoader) {
            saveData()
            setAutoSaveLoader(() => false)
        }
    }, [autoSaveLoader])

    useEffect(() => {
        getAQARData(setData, true, { department: directorUser?.department }, aqarYearState, 'director')
    }, [])

    useEffect(() => {
        if (data) {
            setProgramDuringYear(data?.extendedProfile?.programs ? { input: 0, ProgramCode: {}, ProgramName: {}, data: data?.extendedProfile?.programs } : { input: 0, ProgramCode: {}, ProgramName: {} })

            setCoursesDuringYear(data?.extendedProfile?.courses ? { data: data?.extendedProfile?.courses, input: 0, ProgramCode: {}, ProgramName: {}, CourseCode: {}, CourseName: {} } : { input: 0, ProgramCode: {}, ProgramName: {}, CourseCode: {}, CourseName: {} })

            setClassrooms(data?.extendedProfile?.classrooms ? data?.extendedProfile?.classrooms : null)
            setComputers(data?.extendedProfile?.computers ? data?.extendedProfile?.computers : null)

            console.log('data is :', data?.extendedProfile?.programs)
        }
    }, [data])

    return (
        <div>
            <div className='my-5'>
                <Wrapper title="1. Name of the Programs introduced during the year">
                    <NumberToTextField state={programDuringYear} setState={setProgramDuringYear} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Number of Programs offered during year" isForm={true} classes='my-3'
                        options={TableData.aqarPrograms.fieldOptions}
                    >
                        <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.aqarPrograms.auditHead}
                            tableChildHead={TableData.aqarPrograms.childHead} state={programDuringYear}
                            setState={setProgramDuringYear} cellAsInput={false}
                            options={TableData.aqarPrograms.fieldOptions} isForm={true} editTitle="Programs offered during year"
                        >

                        </AuditTable>
                    </NumberToTextField>
                </Wrapper>

                <Wrapper title="2. Courses in all programs during the year">
                    <NumberToTextField state={coursesDuringYear} setState={setCoursesDuringYear} setAutoSaveLoader={setAutoSaveLoader} autoSaveLoader={autoSaveLoader} label="Courses in all programs during the year" isForm={true} classes='my-3'
                        options={TableData.aqarCourse.fieldOptions}
                    >
                        <AuditTable setAutoSaveLoader={setAutoSaveLoader} tableHead={TableData.aqarCourse.auditHead}
                            tableChildHead={TableData.aqarCourse.childHead} state={coursesDuringYear}
                            setState={setCoursesDuringYear} cellAsInput={false}
                            options={TableData.aqarCourse.fieldOptions} isForm={true} editTitle="Courses offered in all programs during year"
                        >

                        </AuditTable>
                    </NumberToTextField>
                </Wrapper>

                <Wrapper title="3. Total Classrooms, Seminar halls & Computers for academic purposes">
                    <div>
                        <div class="row">
                            <div class="col">
                                <input type="number" class="form-control" placeholder="Total no. of Classrooms & Seminar halls" aria-label="classroom" value={classrooms} onChange={(e) => { setClassrooms(e.target.value) }} />
                            </div>
                            <div class="col">
                                <input type="number" class="form-control" placeholder="Total no. of Computers for Academic purpose" aria-label="computer" value={computers} onChange={(e) => { setComputers(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button type="button" onClick={saveData} className='btn btn-primary bg-primary px-10' >Save Details</button>
                    </div>
                </Wrapper>
            </div>

        </div>
    )
}

export default ExtendedProfile
