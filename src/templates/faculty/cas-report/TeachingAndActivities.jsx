import React from 'react'
import CASDataTable from '../../../services/faculty/reports/cas/components/CASDataTable';
import { useEffect } from 'react';
import { Remark } from '../../../services/faculty/reports/cas/content/Teaching';

const TeachingAndActivities = ({ forPrintOut, lectures, casArray }) => {

    useEffect(() => {
        console.log('Lectures :', lectures)
    }, [lectures])


    return (
        <div className="academic-start">
            <p className="academic-start"></p>
            <p className={`text-center ${forPrintOut === 'false' && 'bg-[#00987936] text-[#009879]'} p-2`}>
                <span className="font-bold">Teaching and Related Activities</span>
            </p>

            <div className="mt-3">


                <div>
                    <div className={`p-2 ${forPrintOut === 'false' && "bg-[#009879] text-white"} flex items-center justify-between`}>
                        <div>
                            <h3 className="sm:text-lg text-base leading-6 font-medium">
                                1. Teaching
                            </h3>
                        </div>
                    </div>

                    <div className={`${forPrintOut === 'true' && "px-1"}`}>
                        <table className={`table table-bordered text-sm`}>
                            <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                <tr>
                                    <th scope="col">Year</th>
                                    <th scope="col">Lectures & Teaching</th>
                                </tr>
                            </thead>
                            <tbody>

                                {casArray?.map((casItem) => {
                                    return (
                                        <tr className="table-light">
                                            <th scope="row" className='w-20 text-sm text-[#009879]'>{casItem.casYear}</th>
                                            <td>

                                                <table className={`table table-bordered ${forPrintOut === 'true' && "border-dark"}`}>
                                                    <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                                        <tr>
                                                            <th scope="col">Sr.</th>
                                                            {CASDataTable.Lectures.tableHeads?.map((item) => { return (<th>{item}</th>); })}
                                                        </tr>
                                                    </thead>
                                                    <tbody className='text-sm'>

                                                        {
                                                            lectures?.map((modelItem, index) => {
                                                                return <tr>
                                                                    <th scope="row">{index + 1}</th>
                                                                    {CASDataTable.Lectures.tableCells.map((item) => { return (<td>{modelItem?.[item]}</td>); })}
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                <div className={`${forPrintOut === 'false' && "bg-[#00987a19] text-[#009879]"} w-full rounded-lg p-3`}>
                                                    <b className='mr-3'>{casItem?.teachingData?.teachingGrade}%</b>
                                                    <Remark title={casItem?.teachingData?.teachingRemark} color={casItem?.teachingData?.teachingRemarkColor} />
                                                </div>

                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <div className="mt-3">
                <div>
                    <div className={`p-2 ${forPrintOut === 'false' && "bg-[#009879] text-white"} flex items-center justify-between`}>
                        <div>
                            <h3 className="sm:text-lg text-base leading-6 font-medium">
                                1. Teaching
                            </h3>
                        </div>
                    </div>

                    <div className={`${forPrintOut === 'true' && "px-1"}`}>
                        <table className={`table table-bordered text-sm`}>
                            <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                <tr>
                                    <th scope="col">Year</th>
                                    <th scope="col">Activities</th>
                                </tr>
                            </thead>
                            <tbody>

                                {casArray?.map((casItem) => {
                                    return (
                                        <tr className="table-light">
                                            <th scope="row" className='w-20 text-sm text-[#009879]'>{casItem.casYear}</th>
                                            <td>



                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TeachingAndActivities
