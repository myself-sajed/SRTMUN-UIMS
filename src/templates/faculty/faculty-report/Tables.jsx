import React, { useEffect } from 'react'
import CASDataTable from '../../../services/faculty/reports/cas/components/CASDataTable'
import { ViewFile } from '../cas-report/Tables'
import sortByAcademicYear from '../../../js/sortByAcademicYear'

const Tables = ({ academicData, showProof = false, otherOptions = false }) => {

    const TableData = [
        {
            model: 'Qualification',
            title: 'Qualifications',
        },
        {
            model: 'Degree',
            title: 'Degrees',
        },
        {
            model: 'AppointmentsHeldPrior',
            title: 'Appointments held prior to joining this institute',
        },
        {
            model: 'PostHeld',
            title: 'Posts held after appointments at this institution',
        },

        {
            model: 'Online',
            title: 'Orientation / Refresher Course / Online / Face-to-face Faculty Development Programmes(FDP)',
        },
        {
            model: 'ConferenceOrganized',
            title: 'Conference / Workshop / Seminar Organized',
        },
        {
            model: 'FinancialSupport',
            title: 'Financial Support To Attend Conferences',
        },
        {
            model: 'ConferenceParticipated',
            title: 'Conference / Workshop / Seminar Participated',
        },
        {
            model: 'ResearchProject',
            title: 'Research Projects',
        },
        {
            model: 'ResearchPaper',
            title: 'Research Papers in the Journals notified by UGC',
        },
        {
            model: 'PhdAwarded',
            title: 'Research Guidance',
        },
        {
            model: 'JrfSrf',
            title: 'JRF, SRF, Post Doctoral Fellows, Research Associate',
        },
        {
            model: 'BookAndChapter',
            title: 'Books and Chapters published and papers in national/international conference proceedings',
        },
        {
            model: 'EContentDeveloped',
            title: 'Creation of ICT (Information & Communication Technology)',
        },

        {
            model: 'AwardRecognition',
            title: 'Awards and Recognition',
        },
        {
            model: 'Patent',
            title: 'Patents published / awarded',
        },
        {
            model: 'ConsultancyServices',
            title: 'Consultancy Services',
        },
        {
            model: 'Collaboration',
            title: 'Collaborations',
        },
        {
            model: 'InvitedTalk',
            title: 'Invited Talk / Resource Person',
        },

        {
            model: 'Responsibilities',
            title: 'Academic & Administrative Responsibilities',
        },
        {
            model: 'ForeignVisit',
            title: 'Foreign Visits',
        },
        {
            model: 'Fellowship',
            title: 'Fellowship/Financial assistance for advanced studies/research',
        }

    ]

    useEffect(() => {
        console.log(academicData)
    }, [academicData])


    return (
        <div>
            <p className='break'></p>
            <p className='text-center bg-[#00987936] text-[#009879] mt-2 mb-11 p-2'><span className="font-bold">Academic Information</span></p>

            {/* Lectures */}

            {
                otherOptions ? otherOptions['Lectures'] ? academicData?.['Lectures']?.length > 0 && <div className="my-10" id="Lectures" >
                    <div className="p-2 bg-[#009879] text-white flex items-center justify-between rounded-t-md ">
                        <div className='flex items-center justify-start gap-3'>
                            <h3 className="sm:text-lg text-base leading-6 font-medium text-white">
                                Lectures, Seminars, Tutorials, Practicals </h3>
                            {console.log(academicData?.['Lectures'])}
                            <span class="badge bg-green-100 text-[#009879]">{academicData?.['Lectures']?.length}</span>
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1  border-l border-r border-b gap-2 p-3'>

                        {academicData && sortByAcademicYear(academicData?.['Lectures'], 'year').map((dataItem, index) => {
                            return <div className='text-xs md:text-sm lg:text-base'>
                                <span className='font-semibold'>{index + 1}</span>. {dataItem.course}
                            </div>
                        })
                        }

                    </div>
                </div> : null : academicData?.['Lectures']?.length > 0 && <div className="my-10" id="Lectures" >
                    <div className="p-2 bg-[#009879] text-white flex items-center justify-between rounded-t-md ">
                        <div className='flex items-center justify-start gap-3'>
                            <h3 className="sm:text-lg text-base leading-6 font-medium text-white">
                                Lectures, Seminars, Tutorials, Practicals </h3>
                            <span class="badge bg-green-100 text-[#009879]">{academicData?.['Lectures']?.length}</span>
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1  border-l border-r border-b gap-2 p-3'>

                        {academicData && sortByAcademicYear(academicData?.['Lectures'], 'year').map((dataItem, index) => {
                            return <div className='text-xs md:text-sm lg:text-base'>
                                <span className='font-semibold'>{index + 1}</span>. {dataItem.course}
                            </div>
                        })
                        }

                    </div>
                </div>
            }



            {/* Tables */}
            {
                TableData.map((item) => {
                    return otherOptions ? otherOptions[item.model] ? <TableTemplate key={item} item={item} data={academicData} showProof={showProof} /> : null : <TableTemplate key={item} item={item} data={academicData} showProof={showProof} />
                })
            }

        </div>
    )
}

export default Tables

const TableTemplate = ({ item, data, showProof }) => {
    return (
        data?.[item.model]?.length === 0 ?
            null :
            <div className="my-10" id={item.model}>
                <div className="p-2 bg-[#009879] text-white flex items-center justify-between rounded-t-md ">
                    <div className='flex items-center justify-start gap-3'>
                        <h3 className="sm:text-lg text-base leading-6 font-medium text-white">
                            {item.title} </h3>
                        <span class="badge bg-green-100 text-[#009879]">{data?.[item.model]?.length}</span>
                    </div>
                </div>
                <div className='table-responsive'>
                    <table className="table table-bordered text-xs md:text-sm lg:text-base">
                        <thead className="bg-[#009879] text-white">
                            <tr>
                                <th scope="col">Sr. No.</th>
                                {
                                    CASDataTable[item.model]?.tableHeads.map((head) => {
                                        console.log(item.model)
                                        return <>{head.includes('pload') || head.includes('roof') || head.includes('Order') ? showProof ? <th scope="col">{head}</th> : null : <th scope="col">{head}</th>}</>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>

                            {data && sortByAcademicYear(data?.[item.model], 'year').map((dataItem, index) => {
                                return <tr>
                                    <th scope="col">{index + 1}</th>
                                    {
                                        CASDataTable[item.model]?.tableCells.map((cell) => {
                                            return (<>{cell === 'proof' ? showProof ?
                                                <td><ViewFile fileName={dataItem['proof']} /></td> : null : cell === 'link' ?
                                                <td><ViewFile fileName={dataItem['link']}
                                                    type="linkURL" /></td> : <td>{dataItem[cell]}</td>}</>);
                                        })
                                    }
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>)
}

export { TableTemplate }