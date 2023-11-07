import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect } from 'react';
// import toast from 'react-hot-toast';
import { TextareaAutosize } from '@mui/material';

function BulkTableEntry({ tableHead, typeObject, tableData, setTableData, model }) {
  const [filds, setFilds] = useState("");
  // const [columnToFill, setColumnToFill] = useState("");

  useEffect(() => {
    setTableData((pri) => {
      if (pri.length > filds) {
        return pri.slice(0, filds);
      } else if (pri.length < filds) {
        const extraEmptyObjects = Array.from({ length: filds - pri.length }, () => ({}));
        return [...pri, ...extraEmptyObjects];
      }
      return pri;
    });
  }, [filds]);

  const handleDeleteRow = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
    setFilds(updatedTableData.length)
  };
  // console.log(filds);
  const handleInputChange = (event, index, columnName) => {
    const newValue = event.target.value;

    const updatedTableData = [...tableData];
    updatedTableData[index][columnName] = newValue;
    setTableData(updatedTableData);
  };

  // useEffect(()=>{
  //   console.log('Table data is:', tableData)
  // }, [tableData])

  // const HandleDataPaste = async (e) => {
  //   e.preventDefault();
  //   const pastedData = e.clipboardData.getData('text').trim();
  //   let filteredData = [];

  //   if (pastedData) {
  //     const cleanedData = pastedData.replace(/\r/g, '');

  //     if (cleanedData.includes("\n")) {
  //       filteredData = cleanedData.split('\n');
  //     } else if (cleanedData.includes("\t")) {
  //       filteredData = cleanedData.split('\t');
  //     }

  //     if (filteredData.includes("") || columnToFill === "") {
  //       toast.error(filteredData.includes("") ? "Randomly cell selection or Empty cell selection not allowed" : "Column Field can not be empty");
  //       filteredData = [];
  //     }
  //     console.log(filteredData);

  //     if (filteredData.length > 0) {
  //       for (let i = 0; i < filteredData.length; i++) {
  //         if (tableData.length === i) {
  //           // Asynchronously set the new state and initialize the missing elements
  //           await setTableData((prevData) => [
  //             ...prevData,
  //             ...Array.from({ length: filteredData.length - prevData.length }, () => ({})),
  //           ]);
  //         }

  //         if (typeObject[columnToFill] === "date") {
  //           const parsedDate = new Date(filteredData[i]);
  //           if (!isNaN(parsedDate.getTime())) {
  //             // Update the state with the formatted date
  //             setTableData((prevData) => [
  //               ...prevData.slice(0, i), // Copy data before the current index
  //               { ...prevData[i], [columnToFill]: parsedDate.toISOString().slice(0, 10) }, // Update the current index
  //               ...prevData.slice(i + 1), // Copy data after the current index
  //             ]);
  //           }
  //         }
  //         else if (Array.isArray(typeObject[columnToFill])) {
  //           let arr = typeObject[columnToFill];
  //           setTableData((prevData) => [
  //             ...prevData.slice(0, i),
  //             { ...prevData[i], [columnToFill]: arr.includes(filteredData[i]) ? filteredData[i] : "" },
  //             ...prevData.slice(i + 1),
  //           ]);
  //         }
  //         else {
  //           // Update the state with the non-date value
  //           setTableData((prevData) => [
  //             ...prevData.slice(0, i), // Copy data before the current index
  //             { ...prevData[i], [columnToFill]: filteredData[i] }, // Update the current index
  //             ...prevData.slice(i + 1), // Copy data after the current index
  //           ]);
  //         }
  //       }
  //     } else {
  //       toast.error("no data");
  //     }
  //   }
  // };

  return (
    <div>

      {/* <div className='flex w-full'>
        <div className='col-12 col-md-6 col-lg-4 px-1'>
          <label htmlFor="colSelect" className="form-label">Select Column</label>
          <select
            value={columnToFill} className='form-select' id="colSelect"
            onChange={(e) => { setColumnToFill(e.target.value) }}
          >
            <option selected disabled value="">Choose</option>
            {Object.keys(typeObject).map((option) => (
              <option key={`opt${option}`} value={option}>
                {tableHead[option]}
              </option>
            ))}
          </select>
        </div>
        <div className='col-12 col-md-6 col-lg-4 px-1'>
          <label htmlFor="dataSetter" className="form-label">Paste Here</label>
          <input className='form-control' id='dataSetter' onPaste={HandleDataPaste} />
        </div>
      </div> */}
      <div className='table-responsive mt-4' style={{ maxHeight: "80vh" }}>
        <table className="table table-bordered" >
          <thead className="sticky-top bg-blue-600 text-[#fff]" >
            {
              model === "ReservedSeats" ?
                <tr>
                  <th colSpan={2}></th>
                  <th colSpan={6}>Number of seats earmarked for reserved category as per GOI or State Government rule</th>
                  <th colSpan={6}>Number of students admitted from the reserved category</th>
                  <th></th>
                </tr> : null
            }
            <tr>
              {Object.keys(typeObject).map((columnName) => (
                <th key={columnName}>{tableHead[columnName]}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='bg-blue-200'>
            {tableData.map((rowData, rowIndex) => (
              <tr key={`row${rowIndex}`} >
                {Object.keys(typeObject).map((columnName, cellIndex) => (
                  <td key={`${columnName}${cellIndex}`}>
                    {Array.isArray(typeObject[columnName]) ? (
                      <select
                        className="p-1 border-2 border-transparent w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea"
                        value={rowData[columnName]}
                        onChange={(e) => handleInputChange(e, rowIndex, columnName)}
                        required
                      >
                        <option selected disabled value="">Choose</option>
                        {typeObject[columnName].map((option, index) => (
                          <option key={`option${index}`} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (

                      typeObject[columnName] === 'number' || typeObject[columnName] === 'date' ?

                        (<input type={typeObject[columnName]}
                          className="p-1 border-2 border-transparent w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea"
                          value={rowData[columnName]}
                          onChange={(e) => handleInputChange(e, rowIndex, columnName)}
                        />)

                        :

                        (<TextareaAutosize
                          className="p-1 border-2 border-transparent w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea"
                          value={rowData[columnName]}
                          style={{ resize: 'none' }}
                          onChange={(e) => handleInputChange(e, rowIndex, columnName)}
                        />)
                    )}

                  </td>
                ))}
                <td>
                  <button onClick={() => handleDeleteRow(rowIndex)}><DeleteOutlineIcon color='error' /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BulkTableEntry;