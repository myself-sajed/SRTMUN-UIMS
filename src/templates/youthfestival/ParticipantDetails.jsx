import React from 'react'
import { YFOfficeWork } from './InfoPage'
import serverLinks from '../../js/serverLinks'

const ParticipantDetails = ({ title = "युवक महोत्सव सहभाग -- स्पर्धक योग्यता प्रमाणपत्र", student, type = "student1", college, academicYear }) => {

    const details = [
        {
            title: "महाविद्यालयाचे नाव",
            value: college?.collegeName
        },
        {
            title: "स्पर्धकाचे नाव",
            value: [type === "student2" ? student?.ParticpantName : student?.partnerName]
        },
        {
            title: "कायमचा पत्ता",
            value: student?.permentAddress
        },
        {
            title: "भ्रमणध्वनी क्रमांक",
            value: student?.mobileNo
        },
        {
            title: "लिंग",
            value: student?.gender
        },
        {
            title: "जन्म दिनांक",
            value: student?.dob
        },
        {
            title: "१ जुलै २०२३ रोजी स्पर्धकांचे वय",
            value: student?.age
        },
        {
            title: "रक्त गट",
            value: student?.bloodGroup
        },
        {
            title: "भाग घेतलेल्या स्पर्धेचे नाव",
            value: <div>
                {
                    student?.namesOfCompetition.filter((item) => item !== "").map((element, index) => {
                        return <p className="font-medium">{index + 1}. {element}</p>
                    })
                }
            </div>
        },
    ]


    return (
        <div className="w-full">
            <div className="flex items-center justify-end ">
                <img src={serverLinks.showFile(student?.photoURL, 'youth')} className='w-32 h-32 border-2 border-black' />
            </div>
            <p className="text-xl font-bold text-center my-4">{title} {`(${academicYear})`} </p>
            <hr className="w-[80%] h-3 mx-auto my-4 bg-gray-800 border-0 rounded md:my-10" />

            <div className="flex items-center justify-center w-full">
                <ul class="list-group w-full">


                    {
                        details.map((item, index) => {
                            return ((index === 4 || index === 6) && type === 'student1') ? null : <div key={index} className="list-group-item grid grid-cols-2 gap-3">
                                <span>{index + 1}. {item.title} </span> <span className="font-medium">{item.value}</span></div>
                        })
                    }
                </ul>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <hr className="w-[80%] h-3 mx-auto my-4 bg-gray-800 border-0 rounded md:my-10" />
            <br />

            <div>
                <YFOfficeWork />
            </div>

        </div>
    )
}

export default ParticipantDetails
