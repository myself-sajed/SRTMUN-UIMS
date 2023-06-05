import React, { useEffect, useState } from 'react'
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Text from '../../../inputs/Text';
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
import BulkExcel from '../../../components/BulkExcel';
import sortByAcademicYear from '../../../js/sortByAcademicYear';

const AwardRecognition = ({ filterByAcademicYear = false, academicYear }) => {
    const [awardModal, setAwardModal] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    //states
    const [fullTimeName, setFullTimeName] = useState('')
    const [awardDate, setAwardDate] = useState('')
    const [pan, setPan] = useState('')
    const [designation, setDesignation] = useState('')
    const [awardName, setAwardName] = useState('')
    const [inHei, setInHei] = useState('')
    const [Proof, setProof] = useState(null)
    const [isNat, setIsNat] = useState('')
    const [year, setYear] = useState('')
    const [agencyName, setAgencyName] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [filteredItems, setFilteredItems] = useState([])

    const [res, setRes] = useState('')

    const user = useSelector(state => state.user.user);

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('teacherName', fullTimeName)
        formData.append('awardYear', awardDate)
        formData.append('pan', pan)
        formData.append('designation', designation)
        formData.append('awardName', awardName)
        formData.append('isNat', isNat)
        formData.append('incentive', inHei)
        formData.append('agencyName', agencyName)
        formData.append('year', year)
        formData.append('file', Proof)
        formData.append('userId', user?._id)

        submitWithFile(formData, 'AwardRecognition', refetch, setLoading, setAwardModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('teacherName', fullTimeName)
        formData.append('awardYear', awardDate)
        formData.append('isNat', isNat)
        formData.append('pan', pan)
        formData.append('designation', designation)
        formData.append('awardName', awardName)
        formData.append('incentive', inHei)
        formData.append('agencyName', agencyName)
        formData.append('year', year)
        formData.append('file', Proof)


        handleEditWithFile(formData, 'AwardRecognition', setEditModal, refetch, setLoading, setIsFormOpen)
    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setFullTimeName(item.teacherName)
                setAwardDate(item.awardYear)
                setPan(item.pan)
                setDesignation(item.designation)
                setAwardName(item.awardName)
                setInHei(item.incentive)
                setIsNat(item.isNat)
                setAgencyName(item.agencyName)
                setYear(item.year)
                setProof(item.file)
                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setFullTimeName('')
        setAwardDate('')
        setPan('')
        setDesignation('')
        setAwardName('')
        setInHei('')
        setIsNat('')
        setAgencyName('')
        setYear('')
        setProof(null)

    }

    let param = { model: 'AwardRecognition', userId: user?._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))

    useEffect(() => {
        data && setFilteredItems(sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear))
    }, [data])

    return (
        <div>
            {/* // HEADER */}

            <Header exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} font="text-lg" editState={setEditModal} clearStates={clearStates} add="Awards and Recognition" state={setAwardModal} icon={<EmojiEventsRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Awards and Recognition" />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='AwardRecognitionFaculty' title='Award Recognition' SendReq='AwardRecognition' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}



            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setAwardModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Award / Recognition' : 'Add a new Award / Recognition'}</p>


                        <Text space='col-md-8' title='Name of full-time teachers receiving award' state={fullTimeName} setState={setFullTimeName} />
                        <Text title='PAN' space='col-md-4' state={pan} setState={setPan} />
                        <Text title='Award Date	' type="date" state={awardDate} setState={setAwardDate} />
                        <Text title='Designation' state={designation} setState={setDesignation} />
                        <Text title='Award Agency Name' state={agencyName} setState={setAgencyName} />

                        <Text title='Name of the Award, Fellowship, received' state={awardName} setState={setAwardName} space='col-md-4' />

                        <div className="col-md-4">

                            <label htmlFor="awards" className="form-label">Wheather National / International</label>
                            <select className="form-select" id="awards" required
                                value={isNat} onChange={(e) => { setIsNat(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="National">National</option>
                                <option value="International">International</option>
                            </select>
                        </div>


                        <Text title='Incentives/Type of incentive given by the HEI in recognition of the award' state={inHei} setState={setInHei} space='col-md-6' />
                        <Year space='col-md-4' state={year} setState={setYear} />


                        <File space='col-md-6' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>

            {/* TABLE */}

            <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                <table className="table table-responsive table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col"><div className="w-96">Name of full-time teachers receiving award</div></th>
                            <th scope="col"><div className='w-24'>Award Date</div></th>
                            <th scope="col">PAN</th>
                            <th scope="col">Designation</th>
                            <th scope="col"><div className='w-60'>Name of the Award, Fellowship, received</div></th>
                            <th scope="col">National / International</th>
                            <th scope="col"><div className="w-32">Award Agency Name</div></th>
                            <th scope="col"><div className='w-96'>Incentives/Type of incentive given by the HEI in recognition of the award</div></th>
                            <th scope="col"><div className="w-20">Year</div></th>

                            <th scope="col">Uploaded Proof</th>
                            <th scope="col">Action</th>


                        </tr>
                    </thead>

                    <tbody>
                        {data && filteredItems.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.teacherName}</td>
                                    <td>{item.awardYear}</td>
                                    <td>{item.pan}</td>
                                    <td>{item.designation}</td>
                                    <td>{item.awardName}</td>
                                    <td>{item.isNat}</td>
                                    <td>{item.agencyName}</td>
                                    <td>{item.incentive}</td>
                                    <td>{item.year}</td>
                                    <td><View proof={item.proof} /></td>
                                    <td><Actions item={item} model="AwardRecognition" refreshFunction={() => { refetch() }} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setAwardModal} /></td>



                                </tr>
                            )
                        })}

                    </tbody>


                </table>

                {
                    isLoading && <Loader />
                }
                {
                    (data && data?.data?.data === undefined || filteredItems.length === 0) && <EmptyBox />
                }
            </div>
        </div>
    )
}

export default AwardRecognition