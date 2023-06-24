import React, { useEffect } from 'react'
import NumberToTextField from '../components/NumberToTextField'
import { BGPad } from './Teaching'

const Conference = ({ setConference, conference, casYearState, saveLoader, setSaveLoader }) => {
    return (
        <BGPad classes='mt-3'>
            <div>
                <div className='mt-2 text-sm md:text-base'>


                    <NumberToTextField saveLoader={saveLoader} setSaveLoader={setSaveLoader}
                        facultyTableAvailable="ConferenceBooksAndChapters"
                        state={conference} setState={setConference} casYearState={casYearState}
                        isForm={true} activity="Activity 6 (B)" classes='my-3' model="ConferenceBookAndChapter" addName="Conference" activityName="Conferences / Full Paper in Conference Proceedings"

                    >

                    </NumberToTextField>

                </div>
            </div>
        </BGPad>
    )
}

export default Conference

const ConferencePoints = ({ item, setState, state, serverData }) => {



    useEffect(() => {
        const newItem = state?.scoreMap?.[item._id]
        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));


        let score = 0
        if (item.isNat === 'State/University') {
            score += 2
        }
        else if (item.isNat === 'National') {
            score += 3
        }
        else if (item.isNat === 'International (within country)') {
            score += 5
        }
        else if (item.isNat === 'International (Abroad)') {
            score += 7
        }


        let grandTotal = 0

        for (const key in newMap) {
            if (newMap[key]?.score && key !== item?._id && state?.dataMap?.includes(key)) {
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
        International (Abroad) : <strong>07</strong> Points
        <br />
        International (within country) : <strong>05</strong> Points
        <br />
        National : <strong>03</strong> Points
        <br />
        State/University : <strong>02</strong> Points

        <hr className='my-2' />
        Current Type is <strong>{item.isNat}</strong>
    </div>
}

export { ConferencePoints }