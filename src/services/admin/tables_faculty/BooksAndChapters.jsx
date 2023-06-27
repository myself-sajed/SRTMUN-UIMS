import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';
import AdminExcelExoprt from '../components/AdminExcelExoprt';
import AdminTable from '../components/AdminTable';

const tableHead = {
  index: 'Sr.No.', 'userId.username': 'Username', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', teacherName: 'Teacher Name', titleOfBook: 'Title of Book / Chapter / Edited Book / Translation', paperTitle: 'Paper Title', titleOfProceeding: 'Title of proceedings of the conference', conName: 'Conference Name', isNat: 'Wheather National / International', authorEditor: 'Author / Editor / Translator', publicationYear: 'Year of Publication', issnNumber: 'ISBN/ISSN number of proceeding', schoolName: 'School Name', aff: 'Affiliation Institute at the time of publication', year: 'Academic Year', publisherName: 'Publisher Name', proof: "Uploaded Proof"
}

const BooksAndChapters = ({ id, setState, yearFilter, schoolName, Heading }) => {
  const SendReq = 'BookAndChapter'
  const module = 'Admin'

  let condition = schoolName === "All Schools" ? null : { department: schoolName }
  let filter = yearFilter.length === 0 ? null : { year: { $in: yearFilter } }

  const params = { model: SendReq, id: '', module, filter: filter, filterConditios: condition }

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
    <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} proof='proof' tableHead={tableHead} year='year' module='faculty' isLoading={isLoading} />
  )
}

export default BooksAndChapters