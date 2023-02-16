import React, { useEffect, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddAuthorBooks from './AddAuthorBooks';
import BottomButtons from './BottomButtons';
import AddTranslationWork from './AddTranslationWork';
import { BGPad, Remark } from './Teaching';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import AddChapter from './AddChapter';
import NumberToTextField from '../components/NumberToTextField';



const AddPublication = ({ publicationData, setPublicationData, casYearState }) => {



    return (

        <BGPad classes='mt-3'>
            <div>
                <div className='mt-2 text-sm md:text-base'>


                    <NumberToTextField
                        state={publicationData} setState={setPublicationData} casYearState={casYearState}
                        isForm={true} classes='my-3' model="BookAndChapter" addName="Books, Chapters & Translation Work" activityName="Books, Chapters & Translation Work" activity="Activity 2"
                        options={[
                            { field: 'Text', keyName: "teacherName", label: "Teacher Name" },
                            { field: 'Text', keyName: "titleOfBook", label: "Title of Published Book" },
                            { field: 'Text', keyName: "paperTitle", label: "Paper Title" },
                            { field: 'Text', keyName: "titleOfProceeding", label: "Title of proceedings" },
                            { field: 'Select', keyName: "authorEditor", label: "Author / Editor / Translator", options: ['Author', 'Editor', 'Translator'] },
                            { field: 'Text', keyName: "conName", label: "Conference Name" },
                            { field: 'Select', keyName: "isNat", label: "National / International", options: ['National', 'International'] },
                            { field: 'Text', keyName: "publicationYear", label: "Publication Year" },
                            { field: 'Text', keyName: "issnNumber", label: "SBN/ISSN number" },
                            { field: 'Text', keyName: "aff", label: "Affiliation Institute at the time of publication" },
                            { field: 'Text', keyName: "publisherName", label: "Publisher Name" },
                            { field: 'Text', keyName: "schoolName", label: "School Name" },
                            { field: 'Year', keyName: "year", label: "Academic Year", },
                            { field: 'File', keyName: "proof", label: "Upload Proof", },]}
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

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject[elem._id]]));


        let score = 0


        if (item.authorEditor === 'Author') {
            if (state?.scoreMap?.[item._id]?.authorType === 'Single') {
                if (state?.scoreMap?.[item._id]?.publisherType === 'National') {
                    score += 10
                }
                else if (state?.scoreMap?.[item._id]?.publisherType === 'International') {
                    score += 12
                }
                else {
                    score += 0;
                }
            }
            else if (state?.scoreMap?.[item._id]?.authorType === 'Multiple') {
                score += 5
            }
        } else if (item.authorEditor === 'Editor') {
            if (state?.scoreMap?.[item._id]?.authorType === 'National') {
                score += 8
            }
            else if (state?.scoreMap?.[item._id]?.authorType === 'International') {
                score += 10
            }
            else {
                score += 0
            }
        }
        else if (item.authorEditor === 'Translator') {
            if (state?.scoreMap?.[item._id]?.authorType === 'Chapter or Research Paper') {
                score += 3
            }
            else if (state?.scoreMap?.[item._id]?.authorType === 'Book') {
                score += 8
            }
            else {
                score += 0
            }
        }


        let authorPoints = 0;
        let editorPoints = 0;
        let translationPoints = 0;

        // publication Score
        let publicationKeys = Object.keys(newMap)

        publicationKeys.forEach((element) => {
            if (newMap?.[element]?.authorEditor === 'Author') {
                authorPoints += newMap?.[element]?.score
            } else if (newMap?.[element]?.authorEditor === 'Editor') {
                editorPoints += newMap?.[element]?.score
            } else if (newMap?.[element]?.authorEditor === 'Translator') {
                translationPoints += newMap?.[element]?.score
            }
        })






        // total Score
        let totalPublicationScore = 0

        for (const key in newMap) {
            if (newMap[key]?.score && key !== item?._id) {
                totalPublicationScore += newMap[key].score
            }
        }
        totalPublicationScore = totalPublicationScore + score

        setState((current) => {
            return {
                ...current,
                totalScore: totalPublicationScore,
                authorPoints,
                editorPoints,
                translationPoints,
                scoreMap:
                    { ...newMap, [item._id]: { ...current.scoreMap?.[item._id], score: score, change: new Date().getTime() } },
            }
        })




    }, [state?.scoreMap?.[item._id]?.authorType, state?.scoreMap?.[item._id]?.publisherType, state?.authorPoints, state?.translationPoints, state?.editorPoints, state?.scoreMap?.[item._id]?.authorEditor, state?.scoreMap?.[item._id]?.change])



    return <>

        <p className='mb-2'>Type : <strong>{item.authorEditor}</strong></p>
        <hr className='mb-3' />
        {
            item.authorEditor === 'Author' ?
                <div className='flex items-start justify-start gap-3 flex-wrap'>
                    <div className='col-md-4'>
                        <select className="form-select" required
                            value={state?.scoreMap?.[item._id]?.authorType}
                            onChange={(e) => { setState({ ...state, scoreMap: { ...state?.scoreMap, [item._id]: { ...state?.scoreMap?.[item._id], authorEditor: item?.authorEditor, authorType: e.target.value } } }) }}  >
                            <option selected disabled>Choose Author Type</option>
                            <option value='Single'>Single</option>
                            <option value='Multiple'>Multiple (5)</option>
                        </select>
                    </div>

                    {
                        state?.scoreMap?.[item._id]?.authorType && state?.scoreMap?.[item._id]?.authorType === 'Single' ?
                            <div className='col-md-4'>
                                <select className="form-select" required
                                    value={state?.scoreMap?.[item._id]?.publisherType}
                                    onChange={(e) => { setState({ ...state, scoreMap: { ...state?.scoreMap, [item._id]: { ...state?.scoreMap?.[item._id], authorEditor: item?.authorEditor, publisherType: e.target.value } } }) }}>
                                    <option selected disabled>Choose Publisher Type</option>
                                    <option value='National'>National (10)</option>
                                    <option value='International'>International (12)</option>
                                </select>
                            </div> : null
                    }
                </div> :


                item.authorEditor === 'Editor' ?
                    <div className="flex items-center justify-start gap-3 flex-wrap">
                        <div className='col-md-4'>
                            <select className="form-select" required
                                value={state?.scoreMap?.[item._id]?.authorType}
                                onChange={(e) => { setState({ ...state, scoreMap: { ...state?.scoreMap, [item._id]: { ...state?.scoreMap?.[item._id], authorEditor: item?.authorEditor, authorType: e.target.value } } }) }}>
                                <option selected disabled>Choose Author Type</option>
                                <option value='National'>National (8)</option>
                                <option value='International'>International (10)</option>
                            </select>
                        </div>
                    </div> :


                    item.authorEditor === 'Translator' ?
                        <div className='col-md-4'>
                            <select className="form-select" required
                                value={state?.scoreMap?.[item._id]?.authorType}
                                onChange={(e) => { setState({ ...state, scoreMap: { ...state?.scoreMap, [item._id]: { ...state?.scoreMap?.[item._id], authorEditor: item?.authorEditor, authorType: e.target.value } } }) }}>

                                <option selected disabled>Choose Author Type</option>
                                <option value='Chapter or Research Paper'>Chapter or Research Paper (3)</option>
                                <option value='Book'>Book (8)</option>

                            </select>
                        </div> : <p>You're not valid Author / Editor / Translator</p>
        }

    </>
}

export { PublicationPoints }



