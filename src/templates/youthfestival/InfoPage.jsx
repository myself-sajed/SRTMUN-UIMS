import React from 'react'

const InfoPage = ({ college, info, data }) => {

    const formDetails = [
        {
            title: "महाविद्यालयाचे नाव",
            value: college?.["collegeName"] ? college?.["collegeName"] : "--"
        },
        {
            title: "संघव्यस्थापकाचे नाव",
            value: info?.["maleName"] ? info?.["maleName"] : "--"
        },
        {
            title: "संघव्यस्थापिकेचे नाव",
            value: info?.["femaleName"] ? info?.["femaleName"] : "--"
        },
        {
            title: "संघव्यस्थापकाचे भ्रमणव्वनी क्रमांक",
            value: info?.["maleMobile"] ? info?.["maleMobile"] : "--"
        },
        {
            title: "संघव्यवस्थापिकाचे भ्रमणव्वनी क्रमांक",
            value: info?.["femaleMobile"] ? info?.["femaleMobile"] : "--"
        },
        {
            title: "युवक महोत्सव प्रवेशिका शुल्क पावती क्रमांक",
            value: info?.["admissionFees"] ? info?.["admissionFees"] : "--"
        },
        {
            title: "विद्यार्थी विकास निधी शुल्क पावती क्रमांक",
            value: info?.["dsdFees"] ? info?.["dsdFees"] : "--"
        },
        {
            title: "महाविद्यालयाचा इ-मेल",
            value: college?.["email"] ? college?.["email"] : "--"
        },
    ]


    return (
        <div>
            <div className="text-justify">
                प्रति, <br />

                <b>मा. संचालक,</b><br />
                विद्यार्थी विकास विभाग,<br />
                स्वामी रामानंद तीर्थ मराठवाडा विद्यापीठ, <br />
                विष्णुपुरी, नांदेड - 431 606<br />
            </div>
            <div className="mt-4 border p-2 rounded-md">
                <p className="text-sm">स्पर्धकांची संख्या</p>
                <div className="mt-2 flex items-start gap-5">
                    <span><span>मुले: </span><b>{data?.male}</b></span>
                    <span><span>मुली: </span><b>{data?.female}</b></span>
                    <span><span>इतर: </span><b>{data?.other}</b></span>
                    <span><span>एकूण: </span><b>{data?.total}</b></span>
                </div>
            </div>
            <div className="mt-5">

                <div className="flex items-center justify-center w-full">
                    <ul class="list-group w-full">
                        {
                            formDetails?.map((item, index) => {
                                return <div key={index} className="list-group-item grid grid-cols-2 gap-3">
                                    <span>{index + 1}. {item.title} </span> <span className="font-medium">{item.value}</span></div>
                            })
                        }

                    </ul>
                </div>

            </div>
            <br /><br /><br /><br />

            <div className="mt-5 flex items-start justify-evenly gap-10">
                <p className="pr-10">सांस्कृतिक विभागप्रमुख</p>
                <div className='text-center pl-10'>
                    <p>प्राचार्य</p>
                    <p className='mt-2'>सही व शिक्का</p>
                </div>
            </div>
            <br />
        </div>
    )
}

export default InfoPage


const YFOfficeWork = () => {
    return (
        <div>

            <p className="text-center font-semibold">कार्यालयीन कामाकरिता</p>
            <div className="my-3 px-10">
                <p>1. वरील माहिती तपासली.</p>
                <p>2. स्पर्धेत भाग घेण्यास योग्य / अयोग्य.</p>
                <p>3. अयोग्य असेल तर कारण _______________________________________________________________________</p>
            </div>
            <br /><br />
            <br /><br />
            <div className='flex items-start justify-evenly gap-10'>
                <p className='mr-10'>सदस्य, सल्लागार समिती </p>
                <p className='ml-10'>संचालक, विद्यार्थी विकास विभाग </p>
            </div>



        </div>
    )
}

export { YFOfficeWork }



