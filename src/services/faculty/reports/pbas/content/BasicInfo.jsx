import { SignalCellularNullRounded } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import NumberToTextField from '../components/NumberToTextField'
import { BGPad } from './Teaching'
import Qualification from '../../../tables/Qualification'
import ResearchDegrees from '../../../tables/ResearchDegrees'
import AppointmentsHeldPrior from '../../../tables/AppointmentsHeldPrior'
import OnlineFDP from '../../../tables/OnlineFDP'
import useAuth from '../../../../../hooks/useAuth'


const BasicInfo = () => {


    const [experience, setExperience] = useState(null)


    let facultyTables = [
        <Qualification />, <ResearchDegrees />, <AppointmentsHeldPrior />, <OnlineFDP />
    ]

    let introTables = [
        {
            state: experience,
            setState: setExperience,
            model: "Experience",
            addName: "Experience",
            activityName: "Teaching / Research Experience & Specialization",
            isFile: false,
            addOnce: true,
            options: [
                { field: 'Text', keyName: "ug", label: "UG Teaching Experience (in years)" },
                { field: 'Text', keyName: "pg", label: "PG Teaching Experience (in years)" },
                { field: 'Text', keyName: "researchExperience", label: "Research Experience excluding years spent in M. Phil. / Ph. D. (in years)" },
                { field: 'Text', keyName: "specialization", label: "Fields of Specialization under the Subject / Discipline " },
            ]
        }


    ]



    return (
        <div className="w-full">
            <div className='my-3 text-lg'>
                <p className='font-bold text-xl'>Basic Information</p>
            </div>



            {
                facultyTables.map((table) => {
                    return <BGPad classes='mt-3'>
                        <div>
                            <div className='mt-2 text-sm md:text-base'>
                                {table}
                            </div>
                        </div>
                    </BGPad>
                })
            }


            {/* // INTRO Tables */}

            <BGPad classes='mt-3'>
                <div>
                    <div className='mt-2 text-sm md:text-base'>


                        <NumberToTextField
                            state={introTables[0].state} setState={introTables[0].setState} casYearState={null}
                            isForm={true} activity={null} classes='my-3' model={introTables[0].model} addName={introTables[0].addName} activityName={`${introTables[0].activityName}`} calculateScore={false}
                            options={introTables[0].options} isFile={introTables[0].isFile} addOnce={introTables[0].addOnce}
                        >
                        </NumberToTextField>

                    </div>
                </div>
            </BGPad>


        </div>
    )
}

export default BasicInfo