import React from 'react';
import GoBack from '../components/GoBack';
import EditableTable from '../utility/EditableTable/content/EditableTable';
import refresh from '../services/faculty/js/refresh';
import UserLoading from './UserLoading';
import sortByAcademicYear from '../js/sortByAcademicYear';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import { useEffect } from 'react';

const Test = () => {

  useAuth(false)
  const user = useSelector((state) => state.user?.user)

  const info = {
    model: 'Qualification'
  }


  const formDataArray = [{ name: "_id", value: "_id" },
  { name: "exam", value: "exam" },
  { name: "institute", value: "institute" },
  { name: "year", value: "year" },
  { name: "percentage", value: "percentage" },
  { name: "subjects", value: "subjects" },
  { name: "isNew", value: "isNew" }]

  const formDataAdditionalArray = [{ name: "userId", value: user?._id }]

  const tableColumns = [
    {
      field: "exam",
      headerName: "Exams",
    },
    {
      field: "institute",
      headerName: "Institute/Boards",
    },
    {
      field: "year",
      headerName: "Year",
    },
    {
      field: "percentage",
      headerName: "Percentage",
    },
    {
      field: "subjects",
      headerName: "Subjects",
    },
  ];

  const [sortedData, setSortedData] = useState([])

  // main fetcher
  let param = { model: info.model, userId: user?._id };
  const { data, isLoading, isError, error, refetch } = useQuery(
    [param.model, param],
    () => refresh(param),
    {
      refetchOnWindowFocus: false
    }
  );

  useEffect(() => {
    if (data) {
      setSortedData(data?.data?.data)
    }
  }, [data]);

  return (
    <div>
      <GoBack pageTitle="Editable Table" />
      <div className="pt-3">
        {
          isLoading ? <UserLoading title="Fetching table contents" /> : <EditableTable sortedData={sortedData} tableColumns={tableColumns} formDataArray={formDataArray} formDataAdditionalArray={formDataAdditionalArray} refetch={refetch} info={info} />
        }

      </div>
    </div>
  )
}

export default Test