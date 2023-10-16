import React, { useState, useRef, useEffect } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import sortByAcademicYear from "../js/sortByAcademicYear";
import { useQuery } from "react-query";
import refresh from "../services/faculty/js/refresh";
import CASDataTable from "../services/faculty/reports/cas/components/CASDataTable";
import useAuth from "../hooks/useAuth";

function Test() {
  useAuth(false);

  const user = useSelector((state) => state.user.user);
  const [serverData, setServerData] = useState([
    {
      _id: "64bfff9534fd2d912e72d839",
      lectureTitle:
        "Free and Open Source Mathematical Software’s for e- content development",
      seminarTitle: "Refresher Course in Mathematics",
      organizedBy: "UGC-HRDC University of Hyderabad",
      isNat: "National",
      nature: "Invited Talk",
      year: "2022-23",
      proof: "1690304405864-Resource person certificate UOH.pdf",
      userId: "62b0a06942f8174e43cd9a26",
      createdAt: "2023-07-25T17:00:05.871Z",
      updatedAt: "2023-07-25T17:00:05.871Z",
      __v: 0,
    },
    {
      _id: "62b74d16f7635cd7148c3379",
      lectureTitle: "Create And Design Website For Free Using Google Sites",
      seminarTitle:
        "UGC Sponsored Online Refresher Course In Physical Education For The Teachers Working In University Departments & Colleges, 24th August To 05th September, 2020",
      organizedBy:
        "PG Department Of Physical Education, Rashtrasant Tukadoji Maharaj Nagpur University, Nagpur",
      isNational: "National",
      year: "2020-21",
      proof: "1656413321615-nagpur hrdc certificate.pdf",
      userId: "62b0a06942f8174e43cd9a26",
      createdAt: "2022-06-25T17:59:50.952Z",
      updatedAt: "2023-06-27T10:18:47.992Z",
      __v: 0,
      isNat: "National",
      nature: "Resource Person",
    },
    {
      _id: "649abb09c6ae94e61ba1b476",
      lectureTitle: "Software for online exam",
      seminarTitle:
        "One Week National Online FDP on ICT Tools for Effective Teaching Learning",
      organizedBy: "School of Mathematical Sciences, SRTM University, Nanded",
      isNat: "National",
      nature: "Invited Talk",
      year: "2019-20",
      proof: "1687862025250-FDP may talk.pdf",
      userId: "62b0a06942f8174e43cd9a26",
      createdAt: "2023-06-27T10:33:45.255Z",
      updatedAt: "2023-06-27T10:33:45.255Z",
      __v: 0,
    },
  ]);

  // main fetcher
  // let param = { model: "InvitedTalk", userId: user?._id };
  // const { data, isLoading, isError, error, refetch } = useQuery(
  //   [param.model, param],
  //   () => refresh(param),
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // useEffect(() => {
  //   if (data) {
  //     const sortedData = sortByAcademicYear(data?.data?.data, "year");
  //     console.log(sortedData);
  //     setServerData(sortedData);
  //   }
  // }, [data]);

  const handleCellChange = (id, newData) => {
    const updatedData = serverData.map((item) =>
      item._id === id ? { ...item, ...newData } : item
    );
    setServerData(updatedData);
  };

  const handleSave = (id) => {
    // Find the item with the matching ID
    const itemToSave = serverData.find((item) => item._id === id);
    // Save the item (You can send it to the server here)
    console.log("Saving data:", itemToSave);
  };

  const handleDelete = (id) => {
    const updatedData = serverData.filter((item) => item._id !== id);
    setServerData(updatedData);
  };

  const handleAddRow = () => {
    const newId = Date.now();
    const newRow = { id: newId, name: "", age: "" };
    setServerData([...serverData, newRow]);
  };

  // Function to adjust the textarea's height to fit its content
  const adjustTextareaHeight = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  // Effect to adjust textarea height when the component updates
  useEffect(() => {
    const textareaElements = document.querySelectorAll(
      ".auto-expanding-textarea"
    );
    textareaElements.forEach((textarea) => {
      adjustTextareaHeight(textarea);
    });
  }, [serverData]);

  return (
    <div className="mt-4">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border table-bordered table">
          <thead className="text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-2 py-3">
                Sr.
              </th>
              {CASDataTable.InvitedTalk.tableHeads.map((head) => {
                return (
                  <th scope="col" className="px-2 py-3">
                    {head}
                  </th>
                );
              })}

              <th scope="col" className="px-2 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {serverData?.map((item, index) => (
              <tr key={item._id} className="bg-white border-b align-top">
                <td className="px-2 py-1">{index + 1}</td>
                {CASDataTable.InvitedTalk.tableCells.map((cell) => {
                  return (
                    <td className="px-2 py-1">
                      <textarea
                        className="p-2 border-2 border-transparent w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea"
                        value={item?.[cell]}
                        onChange={(e) =>
                          handleCellChange(item._id, {
                            [cell]: e.target.value,
                            isEditing: true,
                          })
                        }
                        style={{
                          overflow: "hidden", // Hide the scrollbar
                          height: "auto",
                          resize: "none",
                        }}
                      ></textarea>
                    </td>
                  );
                })}

                <td className="py-1">
                  {item?.isEditing ? (
                    <Tooltip title="Save Changes">
                      <IconButton
                        disabled={!item?.isEditing}
                        onClick={() => {
                          handleSave(item._id);
                          handleCellChange(item._id, { isEditing: false });
                        }}
                      >
                        <CheckRoundedIcon
                          className={item?.isEditing ? "text-yellow-500" : ""}
                          sx={{ fontSize: "25px" }}
                        />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <IconButton disabled={true}>
                      <CheckRoundedIcon sx={{ fontSize: "25px" }} />
                    </IconButton>
                  )}

                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(item._id)}>
                      <DeleteRoundedIcon
                        className="text-red-700"
                        sx={{ fontSize: "24px" }}
                      />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddRow}
        >
          Add Row
        </button>
      </div>
    </div>
  );
}

export default Test;
