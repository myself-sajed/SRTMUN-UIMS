import React, { useEffect, useState } from 'react'
import { BGPad, Remark } from './Teaching';
import NumberToTextField from '../components/NumberToTextField';
import { filterBook } from '../components/FilterModal';



const AddPublication = ({ publicationData, setPublicationData, casYearState, saveLoader, setSaveLoader }) => {

    const scoreCalculator = (calculationProp) => {


        let { item, setState, state, serverData } = calculationProp

        const scoreMapObject = state?.scoreMap
        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));

        let translatorData = filterBook(serverData, true).filter((item) => {
            return state?.dataMap.includes(item._id)
        })


        let score = 0

        if (item) {
            if (item.type === 'Book') {
                if (item.isNat === 'National') {
                    score += 10
                }
                else if (item.isNat === 'International') {
                    score += 12
                }
                else {
                    score += 0
                }
            } else if (item.type === 'Chapter') {
                score += 5
            } else if (item.type === 'Editor') {
                if (item.isNat === 'National') {
                    score += 8
                }
                else if (item.isNat === 'International') {
                    score += 10
                }
                else {
                    score += 0
                }
            } else if (item.type === 'Translator') {
                if (newMap[item._id].score) {
                    score += newMap[item._id].score
                }
            }
        }

        let translatorMap = new Map()
        let result = []

        translatorData.forEach((elem) => {
            if (!translatorMap.has(elem.titleOfBook)) {
                translatorMap.set(elem.titleOfBook, [elem]);
                result.push(elem);
            } else {
                const translators = translatorMap.get(elem.titleOfBook);
                if (translators.length < 3) {
                    translators.push(elem);
                    result.push(elem);
                }
            }
        })





        let Book = 0;
        let Editor = 0;
        let Chapter = 0;
        let Translator = 0;


        // publication Score
        let publicationKeys = Object.keys(newMap)


        publicationKeys.forEach((element) => {
            if (state?.dataMap?.includes(element)) {
                if (newMap?.[element]?.type === 'Book') {
                    Book += newMap?.[element]?.score
                } else if (newMap?.[element]?.type === 'Chapter') {
                    Chapter += newMap?.[element]?.score
                } else if (newMap?.[element]?.type === 'Editor') {
                    Editor += newMap?.[element]?.score
                }
            }
        })


        translatorMap.forEach((triplet) => {
            if (triplet.length === 3) {
                console.log('Key is ', triplet)
                triplet.forEach((tri, index) => {
                    if (index !== 2) {
                        newMap[tri._id] = { score: 3, type: 'Translator' }
                    } else {
                        newMap[tri._id] = { score: 1, type: 'Translator' }
                    }
                })
            } else {
                triplet.forEach((tri) => {
                    newMap[tri._id] = { score: 3, type: 'Translator' }
                })
            }
        })



        let grandTotal = 0

        for (const key in newMap) {
            if (newMap[key]?.score && (item ? key !== item?._id : true) && state?.dataMap?.includes(key)) {
                grandTotal += newMap[key].score
            }
        }


        grandTotal = grandTotal + score


        setState((current) => {
            return {
                ...current,
                totalScore: grandTotal,
                Book,
                Chapter,
                Editor,
                Translator,
                scoreMap: item ? { ...newMap, [item._id]: { ...current?.scoreMap?.[item._id], score: score, type: item?.type, change: new Date().getTime() } } : { ...newMap }

            }
        })
    }


    return (

        <BGPad classes='mt-3'>
            <div>
                <div className='mt-2 text-sm md:text-base'>


                    <NumberToTextField scoreCalculator={scoreCalculator} saveLoader={saveLoader} setSaveLoader={setSaveLoader} facultyTableAvailable="MainBooksAndChapters"
                        state={publicationData} setState={setPublicationData} casYearState={casYearState}
                        isForm={true} classes='my-3' model="MainBookAndChapter" addName="Books, Chapters & Translation Work" activityName="Books, Chapters & Translation Work" activity="Activity 2"

                    >

                    </NumberToTextField>

                </div>
            </div>
        </BGPad>
    )
}

export default AddPublication


const PublicationPoints = ({ item, setState, state, serverData, scoreCalculator }) => {


    useEffect(() => {

        scoreCalculator({ item, setState, state, serverData })

    }, [state?.scoreMap?.[item._id]?.typeNature, state?.scoreMap?.[item._id]?.type,])




    return <>

        <p className='mb-2'>Type : <strong>{item.type}</strong></p>
        <hr className='mb-3' />
        {
            item.type === 'Book' ?
                <div className='flex items-start justify-start gap-3 flex-wrap'>
                    <div className='col-md-4'>
                        <p value='National'>National: <b>10</b> Points</p>
                        <p value='International'>International: <b>12</b> Points</p>
                    </div>

                </div> :


                item.type === 'Chapter' ?
                    <div className="flex items-center justify-start gap-3 flex-wrap">
                        <div className='col-md-4'>
                            <p><b>5</b> points for a Chapter</p>
                        </div>
                    </div> :


                    item.type === 'Editor' ?
                        <div className='col-md-4'>
                            <p value='National'>National: <b>8</b> Points</p>
                            <p value='International'>International: <b>10</b> Points</p>
                        </div> :
                        item.type === 'Translator' ?
                            <div className='col-md-4'>
                                <select className="form-select" required
                                    value={state?.scoreMap?.[item._id]?.typeNature}
                                    onChange={(e) => { setState({ ...state, scoreMap: { ...state?.scoreMap, [item._id]: { ...state?.scoreMap?.[item._id], type: item?.type, typeNature: e.target.value } } }) }}>

                                    <option selected disabled>Choose work done</option>
                                    <option value='Chapter or Research Paper'>Chapter or Research Paper (3)</option>
                                    <option value='Book'>Book (8)</option>

                                </select>
                            </div> : <p>You're not valid Author / Editor / Translator</p>
        }

    </>
}

export { PublicationPoints }























