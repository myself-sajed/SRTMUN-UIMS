import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NumberToTextField from '../components/NumberToTextField'
import { BGPad } from './Teaching'

const ResearchGuide = ({ casYearState, researchGuide, setResearchGuide, researchProjects, setResearchProjects, setConsultancy, consultancy, saveLoader, setSaveLoader }) => {

    const [totalActivityScore, setTotalActivityScore] = useState(0)

    useEffect(() => {
        setTotalActivityScore(researchGuide?.totalScore + researchProjects?.totalScore + consultancy?.totalScore)
    }, [researchGuide?.totalScore, researchProjects?.totalScore, consultancy?.totalScore])


    // calculator for research guidance 
    const researchCalculator = (calculationProp) => {
        let { item, setState, state, serverData } = calculationProp

        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject[elem._id]]));


        let score = 0
        if (item) {
            if (item.degreeName === 'Ph.D.') {
                if (item.awardSubmit === 'Awarded') {
                    score += 10
                }
                else if (item.awardSubmit === 'Submitted') {
                    score += 5
                }
            } else if (item.degreeName === 'M.Phil' || item.degreeName === 'PG Dissertation') {
                if (item.awardSubmit === 'Awarded') {
                    score += 2
                }
                else {
                    score += 0
                }
            }
        }

        // score individualScore
        let phdScore = 0;
        let mphilScore = 0;

        let keys = Object.keys(newMap)
        keys.map((key) => {
            if (state?.dataMap?.includes(key)) {

                if (newMap?.[key]?.degreeName === 'Ph.D.') {
                    if (newMap?.[key]?.awardSubmit === 'Awarded') {
                        phdScore += 10
                    }
                    else if (newMap?.[key]?.awardSubmit === 'Submitted') {
                        phdScore += 5
                    }
                } else if (newMap?.[key]?.degreeName === 'M.Phil' || newMap?.[key]?.degreeName === 'PG Dissertation') {
                    if (newMap?.[key]?.awardSubmit === 'Awarded') {
                        mphilScore += 2
                    }
                    else {
                        mphilScore += 0
                    }
                }
            }


        })



        let totalDegreeScore = 0

        for (const key in newMap) {
            if (newMap[key]?.score && (item ? key !== item?._id : true) && state?.dataMap?.includes(key)) {
                totalDegreeScore += newMap[key]?.score
            }
        }

        totalDegreeScore = totalDegreeScore + score

        setState((current) => {
            return {
                ...current,
                phdScore,
                mphilScore,
                totalScore: totalDegreeScore,
                scoreMap: item ? { ...newMap, [item._id]: { ...current?.scoreMap?.[item._id], score: score, degreeName: item.degreeName, awardSubmit: item.awardSubmit } } : { ...newMap }
            }
        })

    }

    const projectCalculator = (calculationProp) => {
        let { item, setState, state, serverData } = calculationProp

        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));


        let score = 0

        if (item) {
            if (item.status === 'Completed') {
                if (item.fundType === 'Major') {
                    score += 10
                }
                else if (item.fundType === 'Minor') {
                    score += 5
                }
            } else if (item.status === 'Ongoing') {
                if (item.fundType === 'Major') {
                    score += 5
                }
                else if (item.fundType === 'Minor') {
                    score += 2
                }
            }
        }


        let completeMorePoints = 0;
        let completeLessPoints = 0;


        let ongoingMorePoints = 0;
        let ongoingLessPoints = 0;

        let keys = Object.keys(newMap)
        keys.forEach((key) => {

            if (state?.dataMap?.includes(key)) {
                if (newMap?.[key]?.status === 'Completed') {
                    if (newMap?.[key]?.fundType === 'Major') {
                        completeMorePoints += 10
                    }
                    else if (newMap?.[key]?.fundType === 'Minor') {
                        completeLessPoints += 5
                    }
                } else if (newMap?.[key]?.status === 'Ongoing') {
                    if (newMap?.[key]?.fundType === 'Major') {
                        ongoingMorePoints += 5
                    }
                    else if (newMap?.[key]?.fundType === 'Minor') {
                        ongoingLessPoints += 2
                    }
                }
            }


        })








        let totalProjectScore = 0

        for (const key in newMap) {
            if (newMap[key]?.score && (item ? key !== item?._id : true) && state?.dataMap?.includes(key)) {
                totalProjectScore += newMap[key]?.score
            }
        }

        totalProjectScore = totalProjectScore + score

        setState((current) => {
            return {
                ...current,
                completePoints: completeMorePoints + completeLessPoints,
                ongoingPoints: ongoingMorePoints + ongoingLessPoints,
                completeMorePoints,
                ongoingMorePoints,
                ongoingLessPoints,
                completeLessPoints,
                totalScore: totalProjectScore,
                scoreMap: item ? { ...newMap, [item._id]: { ...current?.scoreMap?.[item._id], score: score, status: item.status, fundType: item.fundType } } : { ...newMap }
            }
        })
    }


    return <BGPad classes='mt-3'>

        <div className="bg-blue-300 p-2 text-blue-900 rounded-full w-full flex items-center 
        justify-between px-4">
            <div className='flex items-center justify-start gap-2 '>
                <p>Activity 4: <span className='font-bold ml-3'> Research Guidance, Research Projects & Consultancy </span></p>
            </div>
            <div className='flex items-center justify-end'>
                <div className='w-52 p-2 bg-blue-100 rounded-xl'>
                    Total Activity Score : <span className='text-green-900 font-bold'>
                        {totalActivityScore ? totalActivityScore.toFixed(2) : 0}</span>
                </div>
            </div>
        </div>

        <div>
            <div className='mt-2 text-sm md:text-base'>

                <NumberToTextField saveLoader={saveLoader} setSaveLoader={setSaveLoader}
                    facultyTableAvailable="PHDAwarded"
                    state={researchGuide} setState={setResearchGuide} casYearState={casYearState}
                    classes='my-3' model="PhdAwarded" addName="Degree" activityName="Research Guidance" activity="Sub-Activity 1" scoreCalculator={researchCalculator}
                >

                </NumberToTextField>

            </div>

            <div className='mt-5 text-sm md:text-base'>

                <NumberToTextField scoreCalculator={projectCalculator} saveLoader={saveLoader} setSaveLoader={setSaveLoader}
                    facultyTableAvailable="ResearchProjects"
                    state={researchProjects} setState={setResearchProjects} casYearState={casYearState}
                    classes='my-3' model="ResearchProject" addName="Project" activityName="Research Project" activity="Sub-Activity 2"

                >

                </NumberToTextField>

            </div>

            <div className='mt-5 text-sm md:text-base'>

                <NumberToTextField saveLoader={saveLoader} setSaveLoader={setSaveLoader}
                    facultyTableAvailable="ConsultancyServices"
                    state={consultancy} setState={setConsultancy} casYearState={casYearState}
                    classes='my-3' model="ConsultancyServices" addName="Consultancy" activityName="Consultancy Services" activity="Sub-Activity 3"
                >

                </NumberToTextField>

            </div>
        </div>
    </BGPad>
}
export default ResearchGuide


const DegreePoints = ({ item, setState, state, serverData, scoreCalculator }) => {

    useEffect(() => {

        scoreCalculator({ item, setState, state, serverData })


    }, [state?.scoreMap?.[item._id]?.awardSubmit, state?.scoreMap?.[item._id]?.degreeName])

    return <div>
        {

            item.degreeName === 'Ph.D.' ?

                <div>
                    <p>Degree : <strong>Ph.D</strong></p>
                    {
                        item.awardSubmit === 'Awarded' ? <p>Awarded : Score -  <strong>10</strong>  </p> : <p>Submitted : Score -  <strong>05</strong>  </p>
                    }
                </div>

                : item.degreeName === 'M.Phil' ?

                    <div>
                        <p>Degree : <strong>M.Phil</strong></p>
                        <p>Awarded : Score -  <strong>02</strong>  </p>
                    </div> :
                    item.degreeName === 'PG Dissertation' ?
                        <div>
                            <p>Degree : <strong>PG Dissertation</strong></p>
                            <p>Awarded : Score -  <strong>02</strong>  </p>
                        </div> : null

        }
    </div>
}


const ProjectPoints = ({ item, setState, state, serverData, scoreCalculator }) => {

    useEffect(() => {

        scoreCalculator({ item, setState, state, serverData })

    }, [state?.scoreMap?.[item._id]?.fundType, state?.scoreMap?.[item._id]?.status,])




    return <div>
        <div>
            <p>Status of Project : <strong>{item.status}</strong> </p>
            <p>Fund Type : <strong>{item.fundType === 'Major' ? 'Major (More than 10 Lacks)' : 'Minor (Less than 10 Lacks)'}</strong> </p>
        </div>
    </div>
}

const ConsultancyPoints = ({ item, setState, state, serverData }) => {
    useEffect(() => {
        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));

        let score = 3

        let totalConScore = 0

        for (const key in newMap) {
            if (newMap[key]?.score && key !== item?._id && state?.dataMap?.includes(key)) {
                totalConScore += newMap[key]?.score
            }
        }

        totalConScore = totalConScore + score

        setState((current) => {
            return {
                ...current,
                totalScore: totalConScore,
                scoreMap:
                    { ...newMap, [item._id]: { ...current?.scoreMap?.[item._id], score: score } },
            }
        })



    }, [])


    return <p> <strong>3</strong> Points for each Consultancy Service</p>
}

export { DegreePoints, ProjectPoints, ConsultancyPoints }