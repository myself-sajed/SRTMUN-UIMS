import React, { useEffect, useState } from 'react'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import File from '../../../inputs/File';
import Year from '../../../inputs/Year';
import { submitWithFile } from '../js/submit';
import refresh from '../js/refresh';
import Actions from './Actions';
import View from './View';
import handleEditWithFile from '../js/handleEditWithFile';
import { useQuery } from 'react-query';
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';

const ResearchGuidance = () => {
    const [guidanceModal, setGuidanceModal] = useState(false)
    const [loading, setLoading] = useState(false)

    //states
    const [guide, setGuide] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    //function
    const [res, setRes] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const user = useSelector(state => state.user.user);

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('isResearchGuide', guide)
        formData.append('year', year)
        formData.append('file', proof)
        formData.append('userId', user._id)

        submitWithFile(formData, 'researchGuidance', refetch, setLoading, setGuidanceModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('isResearchGuide', guide)
        formData.append('year', year)
        formData.append('file', proof)


        handleEditWithFile(formData, 'ResearchGuidance', setEditModal, refetch, setLoading, setIsFormOpen)

    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {

                setGuide(item.isResearchGuide)
                setYear(item.year)
                setProof(item.file)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setGuide('')
        setYear('')
        setProof(null)

    }

    let param = { model: 'ResearchGuidance', userId: user._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))



    return (
        <div>
            {/* // HEADER */}


            <Header add="Guidance(if any)" editState={setEditModal} clearStates={clearStates} state={setGuidanceModal} icon={<SchoolRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Research Guidance" />

            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setGuidanceModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Research Guide' : 'Add a Research Guide'}</p>

                        <div className='col-md-6'>
                            <label htmlFor="validationCustom04" className="form-label" >Are You a recognized research guide of this University</label>
                            <select className="form-select" id="validationCustom04" required onChange={(e) => { setGuide(e.target.value) }} value={guide}>
                                <option selected disabled value="">Choose</option>

                                <option>Yes</option>
                                <option>No</option>

                            </select>
                        </div>
                        <Year state={year} setState={setYear} />


                        <File space='col-md-4' title='Upload Research Guide Letter' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>

            {/* TABLE */}

            <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                <table className="table table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Are You a recognized research guide of this University</th>
                            <th scope="col">Year</th>
                            <th scope="col">Research Guide Letter</th>
                            <th scope="col">Action</th>


                        </tr>
                    </thead>
                    <tbody>
                        {data && data?.data?.data?.sort(function (a, b) {
                            var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                            return dateB - dateA;
                        }).map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.isResearchGuide}</td>
                                    <td>{item.year}</td>

                                    <td><View proof={item.proof} /></td>
                                    <td><Actions item={item} model="ResearchGuidance" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setGuidanceModal} /></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                {
                    isLoading && <Loader />
                }
                {
                    (data && data?.data?.data === undefined) && <EmptyBox />
                }
            </div>
        </div>
    )
}






export default ResearchGuidance