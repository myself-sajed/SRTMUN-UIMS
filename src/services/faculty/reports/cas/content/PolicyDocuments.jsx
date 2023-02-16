import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NumberToTextField from '../components/NumberToTextField'
import { BGPad, Remark } from './Teaching'

const PolicyDocuments = ({ casYearState, policyDocuments, setPolicyDocuments, patents, setPatents, awards, setAwards, fellow, setFellow }) => {

    const [totalActivityScore, setTotalActivityScore] = useState(0)

    useEffect(() => {
        setTotalActivityScore(policyDocuments?.totalScore + patents?.totalScore + awards?.totalScore + fellow?.totalScore)
    }, [policyDocuments?.totalScore, patents?.totalScore, awards?.totalScore, fellow?.totalScore])


    return <BGPad classes='mt-3'>

        <div className="bg-blue-300 p-2 text-blue-900 rounded-full w-full flex items-center justify-between px-4">
            <div className='flex items-center justify-start gap-2'>
                <p>Activity 5: <span className='font-bold ml-3'>Patents, Policy Documents & Awards / Fellowship </span></p>
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

                <NumberToTextField
                    state={patents} setState={setPatents} casYearState={casYearState}
                    classes='my-3' model="Patent" addName="Patent" activityName="Patents Published" activity="Sub-Activity 1"
                    options={[
                        { field: 'Text', keyName: "patenterName", label: "Patenter Name" },
                        { field: 'Text', keyName: "patentNumber", label: "Patent Number" },
                        { field: 'Text', keyName: "patentTitle", label: "Patent Title" },
                        { field: 'Select', keyName: "isNat", label: "National / International", options: ['National', 'International'] },
                        { field: 'Text', keyName: "awardYear", label: "Award Year of Patent" },
                        { field: 'Year', keyName: "year", label: "Academic Year", },
                        { field: 'File', keyName: "proof", label: "Uploaded Proof", },]}
                >

                </NumberToTextField>

            </div>
        </div>

        <div>
            <div className='mt-5 text-sm md:text-base'>

                <NumberToTextField
                    state={policyDocuments} setState={setPolicyDocuments} casYearState={casYearState}
                    classes='my-3' model="PolicyDocuments" addName="Policy Documents" activityName="Policy Documents" activity="Sub-Activity 2"
                    options={[
                        { field: 'Text', keyName: "policyName", label: "Policy Name" },
                        {
                            field: 'Select', keyName: "organizationName", label: "Organisation Name",
                            options: ['International Body', 'Organizations like UNO / UNESCO / World Bank / IMF etc.', 'Central Government / State Government']
                        },
                        { field: 'Select', keyName: "isNat", label: "Type", options: ['State', 'National', 'International'] },
                        { field: 'Year', keyName: "year", label: "Academic Year", },
                        { field: 'File', keyName: "proof", label: "Uploaded Proof", },]}
                >

                </NumberToTextField>

            </div>
        </div>

        <div>
            <div className='mt-5 text-sm md:text-base'>

                <NumberToTextField
                    state={awards} setState={setAwards} casYearState={casYearState}
                    classes='my-3' model="AwardRecognition" addName="Awards" activityName="Awards & Recognitions" activity="Sub-Activity 3 [A]"
                    options={[
                        { field: 'Text', keyName: "teacherName", label: "Name of full-time teachers receiving award" },
                        { field: 'Text', keyName: "awardYear", label: "Award Date" },
                        { field: 'Text', keyName: "pan", label: "PAN" },
                        { field: 'Text', keyName: "designation", label: "Designation" },
                        { field: 'Text', keyName: "awardName", label: "Name of the Award, Fellowship, received" },
                        { field: 'Text', keyName: "agencyName", label: "Award Agency Name" },

                        { field: 'Select', keyName: "isNat", label: "National / International", options: ['National', 'International'] },
                        { field: 'Text', keyName: "incentive", label: "Incentives/Type of incentive given by the HEI in recognition of the award" },
                        { field: 'Year', keyName: "year", label: "Academic Year", },
                        { field: 'File', keyName: "proof", label: "Uploaded Proof", },]}
                >

                </NumberToTextField>

            </div>
        </div>

        <div>
            <div className='mt-5 text-sm md:text-base'>

                <NumberToTextField
                    state={fellow} setState={setFellow} casYearState={casYearState}
                    classes='my-3' model="Fellowship" addName="Fellowship" activityName="Fellowship" activity="Sub-Activity 3 [B]"
                    options={[
                        { field: 'Text', keyName: "teacherName", label: "Name of the teacher awarded fellowship/financial support" },
                        { field: 'Text', keyName: "awardName", label: "Name of the award/fellowship" },
                        { field: 'Text', keyName: "awardYear", label: "Award Year" },
                        { field: 'Select', keyName: "isNat", label: "National / International", options: ['National', 'International'] },
                        { field: 'Text', keyName: "awardingAgency", label: "Awarding Agency" },
                        { field: 'Year', keyName: "year", label: "Academic Year", },
                        { field: 'File', keyName: "proof", label: "Uploaded Proof", },]}
                >

                </NumberToTextField>

            </div>
        </div>
    </BGPad>
}

export default PolicyDocuments

const PatentPoints = ({ item, setState, state, serverData }) => {

    useEffect(() => {
        const newItem = state?.scoreMap?.[item._id]
        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));

        console.log(newMap)

        let score = 0
        if (item.isNat === 'National') {
            score += 7
        }
        else if (item.isNat === 'International') {
            score += 10
        }


        let grandTotal = 0

        for (const key in newMap) {
            if (newMap[key]?.score && key !== item?._id) {
                grandTotal += newMap[key].score
            }
        }

        grandTotal = grandTotal + score

        setState((current) => {
            return {
                ...current,
                totalScore: grandTotal,
                scoreMap:
                    { ...newMap, [item._id]: { ...current?.scoreMap?.[item._id], score: score } },
            }
        })

    }, [])

    return <div>
        National Patent : <strong>07</strong> Points
        <br />
        International Patent : <strong>10</strong> Points

        <hr className='my-2' />
        Current Patent is <strong>{item.isNat}</strong>
    </div>
}

const AwardPoints = ({ item, setState, state, serverData }) => {

    useEffect(() => {
        const newItem = state?.scoreMap?.[item._id]
        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));

        console.log(newMap)

        let score = 0
        if (item.isNat === 'National') {
            score += 5
        }
        else if (item.isNat === 'International') {
            score += 7
        }


        let grandTotal = 0

        for (const key in newMap) {
            if (newMap[key]?.score && key !== item?._id) {
                grandTotal += newMap[key].score
            }
        }

        grandTotal = grandTotal + score

        setState((current) => {
            return {
                ...current,
                totalScore: grandTotal,
                scoreMap:
                    { ...newMap, [item._id]: { ...current?.scoreMap?.[item._id], score: score } },
            }
        })

    }, [])



    return <div>
        International Award / Recognition : <strong>07</strong> Points
        <br />
        National Award / Recognition  : <strong>05</strong> Points

        <hr className='my-2' />
        Current Award / Recognition is <strong>{item.isNat}</strong>
    </div>
}

const FellowPoints = ({ item, setState, state, serverData }) => {

    useEffect(() => {
        const newItem = state?.scoreMap?.[item._id]
        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));

        console.log(newMap)

        let score = 0
        if (item.isNat === 'National') {
            score += 5
        }
        else if (item.isNat === 'International') {
            score += 7
        }


        let grandTotal = 0

        for (const key in newMap) {
            if (newMap[key]?.score && key !== item?._id) {
                grandTotal += newMap[key].score
            }
        }

        grandTotal = grandTotal + score

        setState((current) => {
            return {
                ...current,
                totalScore: grandTotal,
                scoreMap:
                    { ...newMap, [item._id]: { ...current?.scoreMap?.[item._id], score: score } },
            }
        })

    }, [])



    return <div>
        International Fellowship : <strong>07</strong> Points
        <br />
        National Fellowship : <strong>05</strong> Points

        <hr className='my-2' />
        Current Fellowship is <strong>{item.isNat}</strong>
    </div>
}

const PolicyPoints = ({ item, setState, state, serverData }) => {
    useEffect(() => {
        const newItem = state?.scoreMap?.[item._id]
        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));

        console.log(newMap)

        let score = 0
        if (item.isNat === 'State') {
            score += 4
        }
        else if (item.isNat === 'National') {
            score += 7
        }
        else if (item.isNat === 'International') {
            score += 10
        }


        let grandTotal = 0

        for (const key in newMap) {
            if (newMap[key]?.score && key !== item?._id) {
                grandTotal += newMap[key].score
            }
        }

        grandTotal = grandTotal + score

        setState((current) => {
            return {
                ...current,
                totalScore: grandTotal,
                scoreMap:
                    { ...newMap, [item._id]: { ...current?.scoreMap?.[item._id], score: score } },
            }
        })

    }, [])

    return <div>
        International Policy Documents : <strong>10</strong> Points
        <br />
        National Policy Documents : <strong>07</strong> Points
        <br />
        State Policy Documents : <strong>04</strong> Points

        <hr className='my-2' />
        Current Fellowship is <strong>{item.isNat}</strong>
    </div>
}


export { PatentPoints, AwardPoints, FellowPoints, PolicyPoints }

