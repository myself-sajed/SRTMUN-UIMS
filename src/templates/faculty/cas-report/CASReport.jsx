import React from 'react'
import Header from './Header'
import Table from './Tables'
import SummarySheet from './SummarySheet'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import BasicIntro from './BasicIntro'
import Eligibility from './Eligibility'
import './CAS.css'

const CASReport = () => {

    const { selectedYear, userId } = useParams()
    const [casData, setCasData] = useState(null)
    const [casError, setCasError] = useState(null)
    const [casArray, setCasArray] = useState(null)
    const [academicData, setAcademicData] = useState(null)
    const [fetchYears, setFetchYears] = useState([])
    const [eligData, setEligData] = useState(null)
    const [level, setLevel] = useState(null)

    // get cas data from userID
    useEffect(() => {
        const URL = `${process.env.REACT_APP_MAIN_URL}/getCASData`
        Axios.post(URL, { userId })
            .then((res) => {
                console.log(res)
                if (res.data.status === 'success') {
                    setCasData(res.data.data)
                }
                else {
                    setCasError('Data not found')
                }
            }).catch((err) => {
                setCasError('CAS Error : ', err)
            })
    }, [])

    // arrange cas data based on selected cas year from user
    useEffect(() => {

        if (casData) {
            let oldCasArray = [];
            casData.casData.forEach(cas => {
                oldCasArray.push(JSON.parse(cas))
            });

            // keep those element in array whose casYear is equal to selectedYear array
            let newCasArray = []
            let years = []
            JSON.parse(selectedYear).forEach(year => {
                oldCasArray.forEach(item => {
                    if (item.casYear === year) {
                        newCasArray.push(item)
                        years.push(...item.fetchYears)
                        console.log('CAS Item :', item)
                    }
                }
                )
            })

            setFetchYears(new Set(years))

            // sort the array based on casYear field in ascending order
            newCasArray.sort((a, b) => {
                return parseInt(a.casYear.slice(0, 4)) - parseInt(b.casYear.slice(0, 4));
            })

            setCasArray(newCasArray)
        }



    }, [casData])

    // get all the academic data for tables
    useEffect(() => {
        const URL = `${process.env.REACT_APP_MAIN_URL}/api/getAllData`
        console.log('All fetch years are :', [...fetchYears])
        Axios.post(URL, { selectedYear, userId, fetchYears: [...fetchYears] })
            .then((res) => {
                res.data.status = 'success' ? setAcademicData(res.data.data) : setCasError('No data found')
            }).catch((err) => {
                setCasError('Something went wrong')
            })

    }, [fetchYears])

    useEffect(() => {
        if (casData) {
            console.log('CAS Data :',)
        }
    }, [casData])

    useEffect(() => {
        // creating eligibility details
        if (casData?.['stage5']) {
            setEligData(JSON.parse(casData['stage1']))
            setLevel('stage1')
        } else if (casData?.['stage4']) {
            setEligData(JSON.parse(casData['stage4']))
            setLevel('stage4')
        } else if (casData?.['stage3']) {
            setEligData(JSON.parse(casData['stage3']))
            setLevel('stage3')
        } else if (casData?.['stage2']) {
            setEligData(JSON.parse(casData['stage2']))
            setLevel('stage2')
        } else if (casData?.['stage1']) {
            setEligData(JSON.parse(casData['stage1']))
            setLevel('stage1')
        }
    }, [casData])

    useEffect(() => {
        console.log("eligData :", eligData)
    }, [eligData])

    return (
        <div className='mx-auto w-full font-sans'>
            {(casArray && academicData && eligData && level) ?
                <>
                    <Header user={casData.userId} title="Career Advancement Scheme (CAS)"
                        subTitle={`CAS Report of year ${casArray?.map((cas) => cas.casYear).join(', ')}`}
                        directorData={academicData} userType="faculty" />
                    <Eligibility eligData={eligData} level={level} />
                    <BasicIntro academicData={academicData} />
                    <SummarySheet casArray={casArray} />
                    <Table academicData={academicData} casArray={casArray} />
                </> : <p className='my-5'>Sorry You're not eligible for CAS Promotion</p>
            }
        </div>
    )
}

export default CASReport