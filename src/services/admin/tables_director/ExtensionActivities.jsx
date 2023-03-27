import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no." , SchoolName: 'School', Name_of_the_activity: "Name of the activity" ,  Organising_unit: "Organising unit/ agency/ collaborating agency" ,  Name_of_the_scheme: "Name of the scheme" ,  Year_of_activity: "Year of the activity " ,  Number_of_students: "Number of students participated in such activities" ,  Upload_Proof: "Proof"  }

function ExtensionActivities({id, setState, yearFilter, schoolName, Heading}) {
const SendReq = 'ExtensionActivities';
const module = 'Admin'

let filter = yearFilter.length === 0 && schoolName === 'All Schools'? null : yearFilter.length !== 0 && schoolName === 'All Schools'?{Year_of_activity: {$in:yearFilter}}: yearFilter.length === 0 && schoolName !== 'All Schools'? {SchoolName: schoolName} : {Year_of_activity: {$in:yearFilter},SchoolName: schoolName}

const params = { model: SendReq, id: '', module, filter, }

const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => getReq(params))

useEffect(() => {
 setState((pri) => {
    return {
       ...pri,
        [id]: data?.data
    }
})
}, [data && data])

return (
  <AdminAcordinTable   Heading= {Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Year_of_activity' module='director' isLoading={isLoading} />
);
}
export default ExtensionActivities;