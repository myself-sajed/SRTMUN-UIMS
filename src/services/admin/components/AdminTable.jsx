import React, { useState, useEffect } from 'react'
import FileViewer from '../../../components/FileViewer';
import sortByAcademicYear from '../../../js/sortByAcademicYear'
import EmptyBox from '../../../components/EmptyBox'
import Loader from '../../../components/Loader'
import siteLinks from '../../../components/siteLinks';


const AdminTable = ({ tableHead, data, year, proof, serviceName, isLoading }) => {

  const [tblCells, setTblCells] = useState();

  useEffect(() => {
    let tblCells = [];
    const cellsrm = ["index", "Upload_Proof", "Proof", "proof", "link", "Action"]
    Object.keys(tableHead).map((e) => {
      tblCells.push(e)
    })
    cellsrm.map((e) => {
      var index = tblCells.indexOf(e);
      if (index !== -1) {
        tblCells.splice(index, 1);
      }
    })

    setTblCells(tblCells)
  }, [tableHead && tableHead])



  return (
    <>

      <div className='table-responsive' style={{ height: "100%" }}>
        <table className="table table-bordered" >
          <thead className="sticky-top" style={{ background: `${window.location.pathname===siteLinks.fdc.link?'#28359b':'#ae7e28'}`, color: '#FFF' }}>
            <tr>
              {
                Object.values(tableHead)?.map(item => {
                  return <th>{item}</th>
                })
              }

            </tr>

          </thead>
          <tbody>
            {data && sortByAcademicYear(data, year).map((row, index) => <tr key={index}>
              <td>{index + 1}</td>
              {
                tblCells?.map(key => <td>{key === "userId.name" ? row.userId?.name : key === "userId.department" ? row.userId?.department : key === "userId.username" ? row.userId?.username : row[key]}</td>)

              }
              {
                proof ? proof == "link" ? <td><a href={row[proof]} target="_blank" style={{ color: "blue" }}>{row[proof]}</a></td> : <td><FileViewer fileName={row[proof]} serviceName={serviceName} /></td> : ""
              }
            </tr>
            )}
          </tbody>
        </table>
        {isLoading ? <Loader /> : ""}
        {!isLoading && data?.length === 0 ? <EmptyBox /> : ""}
      </div>

    </>
  )
}

export default AdminTable