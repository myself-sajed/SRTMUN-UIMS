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
import NewPrograms from '../../../pages/NewPrograms'
import CourceInAllPrograms from '../../../pages/CourseInAllProgram'
import TableAccordion from '../../../../faculty/reports/aqar/components/TableAccordion'


const ExtendedProfile = ({ aqarYearState }) => {

    useScroll()
    useDirectorAuth()
    const directorUser = useSelector((state) => state.user.directorUser)
    const [data, setData] = useState(null)

    const [classrooms, setClassrooms] = useState(null)
    const [computers, setComputers] = useState(null)

    const extendedProfile = {
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
        getAQARData(setData, true, { schoolName: directorUser?.department }, aqarYearState, 'director')
    }, [])

    useEffect(() => {
        if (data) {

            setClassrooms(data?.extendedProfile?.classrooms ? data?.extendedProfile?.classrooms : null)
            setComputers(data?.extendedProfile?.computers ? data?.extendedProfile?.computers : null)
        }
    }, [data])

    const AQARTables = [
        {
            title: 'Newly introduced program(s) during this year',
            component: <NewPrograms filterByAcademicYear={true} academicYear={aqarYearState} />
        },
        {
            title: 'Courses in all programs during the year',
            component: <CourceInAllPrograms filterByAcademicYear={true} academicYear={aqarYearState} />
        },
    ]

    return (
        <div>
            <div className='my-5'>




                <TableAccordion AQARTables={AQARTables} />

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
