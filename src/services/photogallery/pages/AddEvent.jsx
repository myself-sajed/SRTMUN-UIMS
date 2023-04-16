import React, { useEffect } from 'react'
import GoBack from '../../../components/GoBack'
import { useState } from 'react';
import { CircularProgress, IconButton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Footer from '../../../components/Footer';
import { default as pageTitle } from '../../../js/title';
import Axios from 'axios'
import { toast } from 'react-hot-toast';

const AddEvent = () => {

    pageTitle("Add an Event")

    const [eventTitle, setEventTitle] = useState("")
    const [imageList, setImageList] = useState([{ id: 1, file: null, caption: '' }]);
    const [loading, setLoading] = useState(false)

    function addTheEvent(e) {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData()
        formData.append('eventTitle', eventTitle)

        imageList.forEach((image) => {
            if (image.file && (image.caption !== undefined || image.caption !== null || image.caption !== "")) {
                formData.append(`file${image.id}`, image.file);
                formData.append(`caption${image.id}`, image.caption);
            }
        })

        const link = `${process.env.REACT_APP_MAIN_URL}/api/event/add`
        Axios.post(link, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => {
            if (res.data.status === 'success') {
                toast.success('Event saved successfully')
                setLoading(false)
            } else {
                toast.error(res.data.error)
                setLoading(false)
            }
        }).catch((err) => {
            toast.error('Something went wrong')
            setLoading(false)
        })

    }


    return (
        <div>
            <GoBack pageTitle="Add an event" />

            <div className="mt-4">
                <form onSubmit={addTheEvent} encType='multipart/form-data' >

                    {/* 1.TITLE */}
                    <div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">1. Title of the event</label>
                            <div className="flex items-center justify-between flex-auto gap-4">
                                <input type="text" required placeholder='Title goes here...' maxLength={100} value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} className="form-control" id="title" aria-describedby="emailHelp" />
                                <CircularProgress variant="determinate" value={eventTitle ? eventTitle.length : 0} />
                            </div>
                            <div id="titleHelp" className="form-text">The event title should not exceed 100 characters.</div>
                        </div>
                    </div>

                    <div>
                        {/* 2. UPLOAD BUTTON */}
                        <div className='mt-4'>
                            <label htmlFor="photos" className="form-label">2. Choose event photographs</label>
                            <div id="photoHelp" className="form-text">Note: Select a photo in the input to add another photo. (You can add maximum of 5 photos of an event.)</div>
                            <div id="photoHelp" className="form-text mb-2"></div>
                            <div className="border-l-4">
                                <div className="ml-5">
                                    <ImageUploader setImageList={setImageList} imageList={imageList} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. SELECTED FILES */}
                    <div>
                        <label htmlFor="choosen" className="form-label mt-4">3. Upload Event</label>
                        <div className="d-grid gap-2">
                            {
                                !loading ?
                                    <button className="btn bg-blue-600 hover:bg-blue-700 text-white p-3" type="submit">
                                        <span className='flex items-center justify-center gap-2'>
                                            <FileUploadRoundedIcon />
                                            Upload event
                                        </span>
                                    </button> :

                                    <button disabled className="btn bg-blue-600 hover:bg-blue-700 text-white p-3" type="submit">
                                        <span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span> Uploading Event...
                                    </button>
                            }
                        </div>
                    </div>


                </form>
            </div>

            <Footer />
        </div>
    );
};




export default AddEvent


function ImageUploader({ imageList, setImageList }) {

    function handleImageChange(event, id) {
        const updatedList = imageList.map((image) =>
            image.id === id ? { ...image, file: event.target.files[0] } : image
        );
        setImageList(updatedList);
    }

    function handleCaptionChange(event, id) {
        const updatedList = imageList.map((image) =>
            image.id === id ? { ...image, caption: event.target.value } : image
        );
        setImageList(updatedList);
    }

    function handleAddImage() {
        if (imageList.length < 5 && imageList.every((image) => image.file !== null)) {
            const newId = imageList[imageList.length - 1].id + 1;
            setImageList([...imageList, { id: newId, file: null }]);
        }
    }

    function handleRemoveImage(id) {
        const updatedList = imageList.filter((image) => image.id !== id);
        setImageList(updatedList);
    }


    return (
        <div>
            {imageList.map((image, index) => (
                <div key={index} className='flex items-center justify-start gap-4 my-3'>
                    <div className='flex items-center gap-2 w-full'>
                        <div className="flex-auto col-md-2">
                            <input className="form-control" type="file" id="photo1" required
                                onChange={(event) => handleImageChange(event, image.id)} />
                        </div>
                        <div className='flex-auto'>
                            <input placeholder="About the photo..." type="text" required maxLength={100}
                                value={image.caption} className="form-control" id="title" aria-describedby="emailHelp"
                                onChange={(event) => handleCaptionChange(event, image.id)}
                            />
                        </div>
                    </div>
                    {imageList.length > 1 && (
                        <IconButton sx={{ border: '1px solid red' }}
                            onClick={() => handleRemoveImage(image.id)}>
                            <RemoveRoundedIcon sx={{ color: "red", fontSize: '20px' }} />
                        </IconButton>
                    )}
                </div>
            ))}
            {imageList.length < 5 && imageList.every((image) => image.file !== null) && (
                <button className="btn bg-blue-600 mt-1 hover:bg-blue-700 text-white" type="button" onClick={handleAddImage}>
                    <span className='flex items-center justify-center gap-2'>
                        <AddPhotoAlternateRoundedIcon /> Add more
                    </span>
                </button>
            )}
        </div>
    );
}



