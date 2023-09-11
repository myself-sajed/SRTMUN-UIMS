import React, { useEffect, useState } from 'react'
import GoBack from '../../../components/GoBack'
import ProgramTitle from '../components/ProgramTitle'
import { fetchRegistrations } from '../js/fetchRegistrations';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPrograms } from '../js/fetchPrograms';
import { useQuery } from 'react-query';
import siteLinks from '../../../components/siteLinks';
import title from '../../../js/title';
import Footer from '../../../components/Footer';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import UserLoading from '../../../pages/UserLoading';
import { Empty } from 'antd';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import { toast } from 'react-hot-toast';
import ExcelJS from 'exceljs';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded';
import ToggleOnRoundedIcon from '@mui/icons-material/ToggleOnRounded';
import { toggleResponseAcceptance } from '../js/registrationHandler';


const RegistrationDetails = () => {

    const navigate = useNavigate();

    const { programId } = useParams();
    const [program, setProgram] = useState(null);

    let allres = []
    program?.registrationResponse.map((e, i) => { allres.push(JSON.parse(e.response)) })

    const params = { filter: { _id: programId }, singleItem: true, shouldPopulate: true };
    const { data, isLoading, refetch } = useQuery(['PopulatedSingleProgram', programId], () => fetchPrograms(params));


    useEffect(() => {
        if (data?.data?.data === null) {
            navigate(siteLinks.programs.link);
        } else {
            setProgram(data?.data?.data);
        }

    }, [data]);

    let bredLinks = [siteLinks.welcome, siteLinks.programs, { title: program?.title ? `${program?.title?.slice(0, 40)}...` : 'Loading Program...', link: `/program/${programId}` }, { title: "Program Registration Details", url: '' }];

    title("Program Registration Details")

    const downloadDataToExcel = async (data, fileName) => {

        try {
            const columnMapping = {
                "Name of the Teacher": "Name of the Teacher",
                "Email Address": "Email Address",
                "Designation": "Designation",
                "Contact Number": "Contact Number",
                "Name of the Department/School": "Name of the Department/School",
                "Name of the College/University": "Name of the College/University",
                "Address of the institution": "Address of the institution",
            };

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Sheet 1');

            const columnNames = Object.values(columnMapping);
            columnNames.unshift('Sr.No.');

            // Set column headers and formatting
            const headerRow = worksheet.addRow(columnNames);
            headerRow.font = { bold: true, size: 12 };

            // Apply formatting to all cells
            worksheet.columns.forEach((column) => {
                column.width = 20;
                column.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
            });

            // Add data rows with auto-incrementing numbers
            data?.forEach((rowData, index) => {
                const values = Object.keys(columnMapping).map((columnName) => rowData[columnName]);
                values.unshift(index + 1);
                worksheet.addRow(values);
            });

            worksheet.getRow(1).font = { bold: true, size: 12 };
            worksheet.getRow(1).height = 30;

            for (let i = 2; i <= data.length; i++) {
                worksheet.getRow(i).commit();
            }

            // Save the workbook as a file
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);

            // Download the Excel file with the specified fileName
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.click();

            console.log('Excel file generated and downloaded successfully.');
            toast.success("Excel generated successfully")
        } catch (error) {
            console.error('Error generating Excel file:', error);
            toast.error("Error while generating try again")
        }

    }

    const copyLink = () => {
        navigator.clipboard.writeText(`https://srtmun-uims.org/program/${programId}/registration-form`)
        toast.success('Registration link copied')
    }


    return (
        <div>
            <GoBack pageTitle="Program Registration Details" bredLinks={bredLinks} />
            <div className="animate-fade-up animate-once">
                {
                    isLoading ?
                        <div className="h-screen">
                            <UserLoading title="Getting Program title" />
                        </div>
                        :
                        <div className="mt-4 animate-fade-up animate-once">
                            <ProgramTitle program={program} />
                            {/*  */}
                            <div className="mb-2 mt-3 bg-gray-100 border rounded-md p-2 flex items-center gap-3">
                                <div onClick={copyLink} className="flex hover:text-blue-700 rounded-lg items-center p-2 bg-blue-100 cursor-pointer"><ContentCopyRoundedIcon />Copy Registration Link</div>
                                <div onClick={() => { toggleResponseAcceptance(programId, refetch) }} className="flex hover:text-blue-700 rounded-lg items-center p-2 bg-blue-100 cursor-pointer">
                                    {program?.acceptingResponses ? <ToggleOnRoundedIcon /> : <ToggleOffRoundedIcon />} {program?.acceptingResponses ? `Turn-Off` : `Turn-On`} Registrations
                                </div>
                            </div>

                            <div className="mt-2">
                                <div className="animate-fade-up animate-once bg-gray-100 border rounded-md p-2">
                                    <div className='sm:flex items-start justify-between'>
                                        <p className="flex items-center gap-2 text-xl"><GroupsRoundedIcon sx={{ fontSize: '35px' }} />
                                            <span className="ml-3 tracking-tight">Registrations {`(${program?.registrationResponse?.length})`} </span>
                                        </p>

                                        <button onClick={() => { downloadDataToExcel(allres, `Participant Details of ${program?.title}.xlsx`) }} className='flex items-center justify-start gap-2 mt-2 sm:mt-0 text-sm sm:text-base rounded-md hover:bg-green-800 p-1 sm:p-2 bg-green-700 text-white'>
                                            <TextSnippetRoundedIcon /> Export Responses in Excel
                                        </button>

                                    </div>

                                    <div className="mt-3">
                                        <div className=''>
                                            <div className="mt-2 table-responsive h-screen">

                                                {
                                                    program?.registrationResponse?.length > 0 ?
                                                        <table className="table table-bordered text-sm">
                                                            <thead className="bg-primary text-light sticky-top">
                                                                <tr>
                                                                    <th>Sr.No.</th>
                                                                    {
                                                                        Object.keys(JSON.parse(program?.registrationResponse?.[0]?.response)).map((cells) => {
                                                                            return <th>{cells} </th>
                                                                        })
                                                                    }

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    program?.registrationResponse?.map((item, index) => {
                                                                        let cells = Object.keys(JSON.parse(program?.registrationResponse?.[0]?.response))

                                                                        let itemData = JSON.parse(program?.registrationResponse?.[index]?.response)


                                                                        return <tr>
                                                                            <th>{index + 1}</th>
                                                                            {
                                                                                cells?.map((cell) => {
                                                                                    return <td>{itemData[cell]} </td>
                                                                                })
                                                                            }
                                                                        </tr>
                                                                    })
                                                                }

                                                            </tbody>
                                                        </table> :
                                                        <div className='mt-5 flex items-center justify-center'>
                                                            <Empty description="No Program Registration made so far..." />
                                                        </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                }

            </div>
            <Footer />
        </div>
    )
}

export default RegistrationDetails
