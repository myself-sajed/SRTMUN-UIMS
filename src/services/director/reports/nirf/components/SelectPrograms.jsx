import React, { useEffect, useState } from 'react';
import programsByNIRF from '../js/programsByNIRF';
import ArrowButton from '../../../../../components/ArrowButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrograms, savePrograms } from '../js/savePrograms';
import { useQuery } from 'react-query';
import UserLoading from '../../../../../pages/UserLoading';
import { setNIRFPrograms } from '../../../../../redux/slices/NIRFSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { navigateToURL } from './StudentIntake';
import useNIRFGetProgram from '../../../../../hooks/director-hooks/useNIRFGetProgram';
import toast from 'react-hot-toast';

function SelectPrograms() {
    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const reduxItem = useSelector((state) => state.nirf?.nirfPrograms)
    const user = useSelector((state) => state.user?.directorUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { academicYear } = useParams()

    const { programs, isLoading } = useNIRFGetProgram(user)

    useEffect(() => {
        setSelectedPrograms(programs)
    }, [programs])


    const handleCheckboxChange = (value) => {
        if (selectedPrograms.includes(value)) {
            setSelectedPrograms((prevItems) => prevItems.filter(item => item !== value));
        } else {
            setSelectedPrograms((prevItems) => [...prevItems, value]);
        }
    };

    const onSubmit = async () => {

        if (selectedPrograms.length === reduxItem.length && selectedPrograms.every((value, index) => value === reduxItem[index])) {
            toast.success('Programs saved successfully')
        } else {
            await savePrograms(user?.department, selectedPrograms, dispatch, setNIRFPrograms)
        }

        navigateToURL(academicYear, 'sanctioned-intake', navigate)
    }

    return (
        <div>
            <p className="text-center">Select program(s) offered by your School</p>


            {
                isLoading ? <div>
                    <UserLoading title="Loading Programs" />
                </div> :

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-4 mb-3 sm:mx-5 border p-3 rounded-md">

                        {
                            Object.keys(programsByNIRF).map((program) => {
                                return <div className="form-check my-2" key={program}>
                                    <input className="form-check-input"
                                        value={program}
                                        checked={selectedPrograms.includes(program)}
                                        onChange={() => handleCheckboxChange(program)}
                                        type="checkbox" id={program} />
                                    <label className="form-check-label" htmlFor={program}>
                                        {programsByNIRF[program].name}
                                    </label>
                                </div>
                            })
                        }
                    </div>

            }




            <div className='text-center my-4'>
                <ArrowButton onClickFunction={onSubmit} title="Save & Continue" />
            </div>
        </div>
    );
}

export default SelectPrograms;
