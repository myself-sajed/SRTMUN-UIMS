import React, { useEffect, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddAuthorBooks from './AddAuthorBooks';
import BottomButtons from './BottomButtons';
import AddTranslationWork from './AddTranslationWork';
import { BGPad, Remark } from './Teaching';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import AddChapter from './AddChapter';
import NumberToTextField from '../components/NumberToTextField';



const AddPublication = ({ publicationData, setPublicationData, casYearState, saveLoader, setSaveLoader }) => {



    return (

        <BGPad classes='mt-3'>
            <div>
                <div className='mt-2 text-sm md:text-base'>


                    <NumberToTextField saveLoader={saveLoader} setSaveLoader={setSaveLoader} facultyTableAvailable="MainBooksAndChapters"
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


const PublicationPoints = ({ item, setState, state, serverData }) => {


    useEffect(() => {
        const newItem = state?.scoreMap?.[item._id]
        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));


        let score = 0

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
            if (state?.scoreMap?.[item._id]?.typeNature === 'Chapter or Research Paper') {
                score += 3
            }
            else if (state?.scoreMap?.[item._id]?.typeNature === 'Book') {
                score += 8
            }
            else {
                score += 0
            }
        }


        let Book = 0;
        let Editor = 0;
        let Chapter = 0;
        let Translator = 0;

        // publication Score
        let publicationKeys = Object.keys(newMap)

        publicationKeys.forEach((element) => {
            console.log(newMap[element])
            if (newMap?.[element]?.type === 'Book') {
                Book += newMap?.[element]?.score
                console.log("Book :",)
            } else if (newMap?.[element]?.type === 'Chapter') {
                Chapter += newMap?.[element]?.score
                console.log("Chapter :",)
            } else if (newMap?.[element]?.type === 'Editor') {
                Editor += newMap?.[element]?.score
                console.log("Editor :",)
            } else if (newMap?.[element]?.type === 'Translator') {
                Translator += newMap?.[element]?.score
                console.log("Translator :",)
            }
        })





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
                Book,
                Chapter,
                Editor,
                Translator,
                scoreMap:
                    { ...newMap, [item._id]: { ...current?.scoreMap?.[item._id], score: score } },
            }
        })

    }, [state?.scoreMap?.[item._id]?.typeNature])

    useEffect(() => {
        if (item) {
            setState({ ...state, scoreMap: { ...state?.scoreMap, [item._id]: { ...state?.scoreMap?.[item._id], type: item?.type, } } })
        }
    }, [])

    useEffect(() => {
        console.log('State in Publication :', state)
    }, [state])






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























