import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import GoBack from '../../../components/GoBack'
import fetchData, { fetchAlumniData } from '../js/fetchData'
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import UserLoading from '../../../pages/UserLoading';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import WomanRoundedIcon from '@mui/icons-material/WomanRounded';
import ServiceDashboard, { ServiceDashboardHeading } from './ServiceDashboard';
import TableComponent from '../../../components/TableComponent';
import serverLinks from '../../../js/serverLinks';
import title from '../../../js/title';
import { useParams } from 'react-router-dom';
import ShowImage from './ShowImage';

const AllAlumni = ({school}) => {

    // const { school } = useParams()

    const param = { school }
    const { data, isLoading, isError, error, refetch } = useQuery([param.school, param], () => fetchAlumniData(param))


    useEffect(() => {
        console.log('Data after plain is : ', data?.data?.data?.Alumni)
    }, [data])

    title(`Alumni of ${school}`)


    const alumniDataObj = [
        { id: 1, title: 'Total Alumni', model: 'Alumni', icon: <WcRoundedIcon /> },
        { id: 1, title: 'Total Alumnus (Male)', model: 'Alumnus', icon: <ManRoundedIcon /> },
        { id: 1, title: 'Total Alumna (Female)', model: 'Alumna', icon: <WomanRoundedIcon /> },
        { id: 1, title: 'Total Alumni Contributed', url: `/dashboard/alumni/${school}/AlumniContribution/Total Alumni Contributed`, model: 'AlumniContribution', icon: <AccountBalanceWalletRoundedIcon /> },
        { id: 2, title: 'Progression to Higher Education', url: `/dashboard/alumni/${school}/ProgressionToHE/Progression to Higher Education`, model: 'ProgressionToHE', icon: <SchoolRoundedIcon /> },
        { id: 3, title: 'Exams Qualified', url: `/dashboard/alumni/${school}/QualifiedExams/Exams Qualified`, model: 'QualifiedExams', icon: <LocalLibraryRoundedIcon /> },
        { id: 4, title: 'Businesses / Jobs', url: `/dashboard/alumni/${school}/Placement/Businesses & Jobs`, model: 'Placement', icon: <BusinessRoundedIcon /> },

    ]


    return (
        <div>
             <div className="sticky-top bg-white text-[19px] font-bold pt-2 flex justify-center">
                {school}
            </div>

            <div>
                <ServiceDashboard data={data} iconDataObj={alumniDataObj} isLoading={isLoading} />
            </div>

            <div className='mt-11'>

                <ServiceDashboardHeading title="2. Registered Alumni" />

                <TableComponent tableHeads={["Name", "Gender", "Program Graduated", "Completed In"]} tableCells={false}>
                    {
                        data?.data?.data?.Alumni?.map((item) => {
                            return <tr>
                                <td className='font-bold'></td>
                                {/* <td><ShowImage fileName={item?.photoURL} serviceName={'faculty'} /></td> */}
                                <td className='w-[40%]'>
                                    <div>
                                        <p>{item?.salutation} {item?.name}</p>
                                    </div>
                                </td>
                                <td>{item?.gender}</td>
                                <td>{item?.programGraduated}</td>
                                <td>{`${item && item.doCompleted === undefined || item.doCompleted === '' ? "Not Added" : item.doCompleted}`}</td>

                            </tr>
                        })
                    }
                </TableComponent>
                {isLoading && <UserLoading title="Fetching data" />}


            </div>

        </div>
    )
}

export default AllAlumni