import { useState } from 'react';
import { useQuery } from 'react-query';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { IconButton } from '@mui/material';
import GoBack from '../../../components/GoBack';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleEvent } from '../js/fetchEvents';
import serverLinks from '../../../js/serverLinks';

const images = [
    { src: '/assets/male.jpg', caption: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, sapiente!' },
];

function Gallery() {

    const { eventId } = useParams()

    let params = { filter: { _id: eventId } }
    const { data, isLoading, isError, error, refetch } = useQuery([params, params.filter], () => fetchSingleEvent(params))

    useEffect(() => {
        console.log('Event :', data)
    }, [data])


    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    const handlePrevClick = () => {
        setSelectedImage((selectedImage - 1 + data?.data?.data?.photos?.length) % data?.data?.data?.photos?.length);
    };

    const handleNextClick = () => {
        setSelectedImage((selectedImage + 1) % data?.data?.data?.photos?.length);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.keyCode === 37) {
                // left arrow
                handlePrevClick();
            } else if (event.keyCode === 39) {
                // right arrow
                handleNextClick();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedImage]);


    return (
        <div className="mx-auto">
            <GoBack pageTitle={data?.data?.data?.eventTitle} />
            <div className="flex items-center justify-start flex-wrap gap-2 rounded-md p-3 mt-3">
                {data?.data?.data?.photos?.map((image, index) => (
                    <div key={image.id} className="relative border" onClick={() => handleImageClick(index)}>
                        <img src={serverLinks.showFile(image?.file, 'event')} alt={image.caption} className="w-60 h-60 object-cover hover:brightness-90 cursor-pointer" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50">
                            <p className="text-white text-sm font-medium truncate">{image.caption}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage !== null && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                        <p className='mt-3 text-muted text-sm text-center px-3'>Note: You can use Keyboard arrow keys to navigate between the images</p>
                        <img
                            src={serverLinks.showFile(data?.data?.data?.photos[selectedImage].file, 'event')}
                            alt={data?.data?.data?.photos[selectedImage].caption}
                            className="object-cover w-[400px] mx-auto mt-3"
                        />
                        <div className="p-4 flex justify-between items-center">
                            <IconButton className='border mx-5' onClick={handlePrevClick}>
                                <ArrowBackIosNewRoundedIcon />
                            </IconButton>

                            <p className="text-lg font-medium">{data?.data?.data?.photos[selectedImage].caption}</p>

                            <IconButton className='border mx-5' onClick={handleNextClick}>
                                <ArrowForwardIosRoundedIcon />
                            </IconButton>
                        </div>
                        <button onClick={handleClose} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}

export default Gallery
