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
    model: 'InvitedTalk'
  }

  const formDataArray = [
    { name: "_id", value: "_id" },
    { name: "lectureTitle", value: "lectureTitle" },
    { name: "seminarTitle", value: "seminarTitle" },
    { name: "organizedBy", value: "organizedBy" },
    { name: "isNat", value: "isNat" },
    { name: "nature", value: "nature" },
    { name: "file", value: "proof" },
    { name: "year", value: "year" },]

  const formDataAdditionalArray = [
    { name: "userId", value: user?._id },
    { name: 'uploadPath', value: `../uploads/faculty-uploads/` }
  ]

  const tableColumns = [
    {
      field: "lectureTitle",
      headerName: "Title of Lecture / Academic Session",
    },
    {
      field: "seminarTitle",
      headerName: "Title of Seminar",
    },
    {
      field: "organizedBy",
      headerName: "Organized by",
    },
    {
      field: "isNat",
      headerName: "Level",
      type: 'select',
      options: ["State/University", "National", "International (within country)", "International (Abroad)"]
    },
    {
      field: "nature",
      headerName: "Nature",
      flex: 0.7,
      type: 'select',
      options: ["Invited Talk", "Resource Person", "Paper Presentation"]
    },
    {
      field: "year",
      headerName: "Year",
      flex: 0.7,
      type: 'AY',
    },
    {
      field: "proof",
      headerName: "Proof",
      type: 'proof',
      flex: 0.5,

    },
  ];

  const [sortedData, setSortedData] = useState([])

  // main fetcher
  let param = { model: info.model, userId: user?._id };
  const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param),
    {
      refetchOnWindowFocus: false
    }
  );

  useEffect(() => {
    if (data) {
      setSortedData(sortByAcademicYear(data?.data?.data, "year"))
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