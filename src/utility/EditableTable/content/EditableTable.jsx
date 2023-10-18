import * as React from 'react';
import Box from '@mui/material/Box';
import EditToolbar from '../components/EditToolbar'
import EditableInputFields from '../components/EditableInputFields'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons, useGridApiContext,
} from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TableDeleteAction from '../components/TableDeleteAction';
import refresh from '../../../services/faculty/js/refresh';
import useAuth from '../../../hooks/useAuth';
import View from '../../../services/faculty/tables/View';
import EditableTableUploadButton from '../components/EditableTableUploadButton';
import { deleteRecord, upsertRecord } from '../js/EditableTableOperations';
import sortByAcademicYear from '../../../js/sortByAcademicYear';
import { useState } from 'react';

const slots = {
    toolbar: EditToolbar,
}


export default function EditableTable() {

    useAuth(false)
    const user = useSelector((state) => state.user?.user)
    const [rows, setRows] = useState([]);
    const [uploadRowCount, setUploadRowCount] = useState(0)

    console.log(rows)

    useEffect(() => {
        let count = 0;
        rows.forEach((row) => {
            if (row?.isNew) {
                count += 1
            }
        })

        setUploadRowCount(() => count)

    }, [rows])


    // main fetcher
    let param = { model: "InvitedTalk", userId: user?._id };
    const { data, isLoading, isError, error, refetch } = useQuery(
        [param.model, param],
        () => refresh(param),
        {
            refetchOnWindowFocus: false
        }
    );

    useEffect(() => {
        if (data) {
            const sortedData = sortByAcademicYear(data?.data?.data, "year");
            setRows(sortedData || [])
        }

    }, [data]);

    // Function to adjust the textarea's height based on content
    const adjustTextareaHeight = (element) => {
        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";
    };

    // Effect to adjust textarea height when the component updates or textarea content changes
    useEffect(() => {
        const textareaElements = document.querySelectorAll(
            ".auto-expanding-textarea"
        );
        textareaElements.forEach((textarea) => {
            adjustTextareaHeight(textarea);
        });

        // Listen for input changes in the textarea and adjust height
        textareaElements.forEach((textarea) => {
            textarea.addEventListener("input", () => {
                adjustTextareaHeight(textarea);
            });
        });

        return () => {
            // Cleanup: remove event listeners when the component unmounts
            textareaElements.forEach((textarea) => {
                textarea.removeEventListener("input", () => {
                    adjustTextareaHeight(textarea);
                });
            });
        };
    }, [rows]);


    const [rowModesModel, setRowModesModel] = React.useState({});
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (_id) => () => {
        setRowModesModel({ ...rowModesModel, [_id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (_id) => () => {
        setRowModesModel({ ...rowModesModel, [_id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = async (_id) => {
        const itemToDelete = rows.find((item) => item._id === _id)
        await deleteRecord(itemToDelete, 'InvitedTalk', refetch)
        setRows(rows?.filter((row) => row._id !== _id));
    };

    const handleCancelClick = (_id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [_id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows?.find((row) => row._id === _id);
        if (editedRow.isNew) {
            setRows(rows?.filter((row) => row._id !== _id));
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: "lectureTitle",
            headerName: "Title of Lecture / Academic Session",
            flex: 1,
            editable: true,
            renderEditCell: (params) => <EditableInputFields {...params} />
        },
        {
            field: "seminarTitle",
            headerName: "Title of Seminar",
            flex: 1,
            editable: true,
            renderEditCell: (params) => <EditableInputFields {...params} />
        },
        {
            field: "organizedBy",
            headerName: "Organized by",
            flex: 1,
            editable: true,
            renderEditCell: (params) => <EditableInputFields {...params} />
        },
        {
            field: "isNat",
            headerName: "Level",
            flex: 1,
            editable: true,
            renderEditCell: (params) => <EditableInputFields {...params} type="select"
                options={["State/University", "National", "International (within country)", "International (Abroad)"]} />
        },
        {
            field: "nature",
            headerName: "Nature",
            editable: true,
            flex: 0.7,
            renderEditCell: (params) => <EditableInputFields {...params} type="select"
                options={["Invited Talk", "Resource Person", "Paper Presentation"]} />
        },
        {
            field: "year",
            headerName: "Year",
            flex: 0.7,
            editable: true,
            renderEditCell: (params) => <EditableInputFields type="AY" {...params} />
        },
        {
            field: "proof",
            headerName: "Proof",
            editable: true,
            renderCell: (params) => (params?.row?.isNew ? <p className='text-center text-yellow-600'>Uploading...</p> : params?.row?.proof ? <div className='my-2' >
                <View proof={params.value} />
            </div> : <p className='text-center text-orange-500'>No Proof</p>),
            renderEditCell: (params) => <EditableTableUploadButton {...params} />
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            cellClassName: 'actions',
            getActions: (params) => {
                const _id = params.row._id;
                const isInEditMode = rowModesModel[_id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(_id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(_id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(_id)}
                        color="inherit"
                    />,
                    <TableDeleteAction _id={_id} handleDeleteClick={handleDeleteClick} />,
                ];
            },
        },
    ];


    return (
        <div>
            <Box
                sx={sx}
            >
                <div className="w-full">
                    <DataGrid
                        sx={{ border: 'none' }}
                        autoHeight
                        showCellVerticalBorder={true}
                        showColumnVerticalBorder={true}
                        rows={rows}
                        columns={columns}
                        getRowHeight={() => 'auto'}
                        editMode="row"
                        getRowId={(row) => row._id}
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={async (updatedRow, originalRow) => {
                            try {


                                let formData = new FormData()
                                formData.append('_id', updatedRow['_id'])
                                formData.append('lectureTitle', updatedRow['lectureTitle'])
                                formData.append('seminarTitle', updatedRow['seminarTitle'])
                                formData.append('organizedBy', updatedRow['organizedBy'])
                                formData.append('isNat', updatedRow['isNat'])
                                formData.append('nature', updatedRow['nature'])
                                formData.append('file', updatedRow['proof'])
                                formData.append('year', updatedRow['year'])
                                formData.append('isNew', updatedRow['isNew'])
                                formData.append('userId', user?._id)


                                const status = await upsertRecord(formData, refetch, uploadRowCount)

                                if (status === 200) {
                                    console.log('Record updated successfully in the database.');
                                    // Create a deep copy of the updatedRow
                                    const updatedRowCopy = { ...updatedRow };

                                    // Set the 'isNew' flag to false for the updatedRowCopy
                                    updatedRowCopy.isNew = false;

                                    // Update the local state with the updated row
                                    const updatedRows = rows.map((row) => (row._id === updatedRow._id ? updatedRowCopy : row));
                                    setRows(updatedRows);
                                    return updatedRow;
                                } else {
                                    console.error('Failed to update the database record.');
                                }
                            } catch (error) {
                                console.error('An error occurred while updating the record:', error);
                            }
                            return originalRow;
                        }}
                        onProcessRowUpdateError={(params, error) => {
                            console.error('Row update error:', error);
                            return false;
                        }}
                        slots={slots}
                        slotProps={{
                            toolbar: { setRows, setRowModesModel },
                        }}
                    />
                </div>

            </Box>
        </div>
    );
}



const sx = {
    '& .actions': {
        color: 'text.secondary',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold',
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#1d4ed8',
        color: 'white'
    },
}





