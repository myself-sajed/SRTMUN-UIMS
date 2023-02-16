import React from 'react'
import { useEffect } from 'react'
import EmptyBox from '../../../components/EmptyBox'
import { categorywiseTables } from '../../../services/director/reports/academic-audit/components/TableData'
import { ViewFile } from '../../faculty/cas-report/Tables'
import { EditableTd, SectionTitle } from './AAATables'
// import '../../faculty/cas-report/CAS.css'

const AAASummarySheet = ({ auditData, academicData, directorData }) => {


    const facultyDirectorObj = [
        {
            title: 'Faculty Information',
            tableNameInMainObject: 'facultyTables',
            fetchFrom: 'academicData',
            showName: true,
            serial: 3,
            cellHeadName: 'childHead'
        },
        {
            title: 'Director Information',
            tableNameInMainObject: 'directorTables',
            fetchFrom: 'directorData',
            showName: false,
            serial: 4,
            cellHeadName: 'stateHead'
        }
    ]


    useEffect(() => {
        // adding text 
        Object.keys(categorywiseTables.richTextTables)?.forEach((table) => {


            auditData?.forEach((aaaItem) => {
                document.getElementById(`${categorywiseTables['richTextTables'][table]['title']}-${aaaItem.auditYear}`).innerHTML = aaaItem.AAAData?.['richTextTables'][table]?.content
            })

        })
    }, [auditData, academicData, directorData])



    const dataObj = { academicData, directorData }

    return (
        <div>
            <p className="aaa-break"></p>

            <div>
                <div>

                    <SectionTitle title="SECTION 1: SUMMARY SHEET" className="mt-2 mb-5" />


                    {/* // HEADING */}
                    <SectionTitle title="1. General School / Department Information" />

                    {/* // TABLE */}
                    <div>
                        <table className="table mx-auto mt-3 table-bordered text-sm md:text-base css-serial">
                            <thead className='bg-[#009879] text-white'>
                                <tr>
                                    <th scope="col" className='w-16'>Sr No.</th>
                                    <th scope="col">Title</th>

                                    {/* mapping of years */}
                                    {auditData?.map((item) => { return (<th className="w-[20%]">{item?.auditYear}</th>); })}
                                </tr>
                            </thead>
                            <tbody>

                                {Object.keys(categorywiseTables.schoolInfoTables)?.map((table, index) => {
                                    return (<tr id={`SummarySheet-${table}`}>
                                        <td scope="row"></td>
                                        <td><a href={`#${table}`} className="text-blue-700">{categorywiseTables.schoolInfoTables[table].title}</a></td>

                                        {/* mapping of years */}
                                        {auditData?.map((aaaItem) => { return (<td className='font-bold text-[#009879]'>{aaaItem?.AAAData?.schoolInfoTables?.[table]?.data?.length ? aaaItem?.AAAData?.schoolInfoTables?.[table]?.data?.length : 0}</td>); })}

                                    </tr>);
                                })}


                            </tbody>
                        </table>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default AAASummarySheet


