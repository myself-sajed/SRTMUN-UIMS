import React, { useEffect, useState } from 'react'
import DialogBox from '../../../components/formComponents/DialogBox'
import countries from '../components/FormComponents/country'
import Select from '../../../components/formComponents/Select'
import Text from '../../../components/formComponents/Text'
import SchoolsProgram from '../../../components/SchoolsProgram'
import YearSelect from '../../../components/formComponents/YearSelect'
import { useSelector } from 'react-redux'
import editReq from '../../../components/requestComponents/editReq'
import getReq from '../../../components/requestComponents/getReq'
import handleAvatarChange from '../../../js/handleAvatar'
import { useQuery } from 'react-query'
import AddButton from '../../student/components/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import serverLinks from '../../../js/serverLinks'
import Axios from 'axios'
import { toast } from 'react-hot-toast'

const tableHead = { index: "Sr. no.",propic: "Profile Pic", username: "Username", name : "Name Of Student" ,  email: "Email Id" ,  mobile: "Mobile No." ,  programGraduated: "Enrolled Program" ,  programEnroledOn: "Program Enroled On",  Action: "Action" }

const NewStudent = () => {

    const module = "director";
    const model = "StudentUser"

    const user = useSelector(state => state.user.directorUser)
    const Salutations = ["Mr.", "Mrs.", , "Miss.", "Shri", "Shrimati"]
    const genders = ["Male", "Female", "Other"]
    const Casts = ["Genral", "OBC", "SC","SBC","SEBC", "ST","VJ","NT-B","NT-C","NT-D"]
    const religions = ["Hindu","muslim","Christian","Sikh","Buddh","Jain",]
    const initialState = { salutation: "", name: "", programGraduated: "",  gender: "", password: "", cPassword: "", email: "", mobile: "", abcNo: "", currentIn: '', country: "India", cast: "", religion: "", programEnroledOn: "",createdBy: "director" }
    const [values, setValues] = useState(initialState)
    const { salutation, name, programGraduated, gender, mobile, email, abcNo, currentIn, country, cast, religion, programEnroledOn,  } = values

    const [avatar, setAvatar] = useState(null)
    const [Upload_Proof, setUpload_Proof] = useState(null)
    const [loading, setLoading] = useState(false)
    const [programDuration, setProgramDuration] = useState(null)
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [itemToEdit, setItemToEdit] = useState(null)
    const [photoURL, setPhotoURL] = useState(null)
    const schoolName = user? user.department : null
    const filter =  {schoolName,createdBy: "director"}
    const params = { model: model, id: "", module, filter: filter, }
    const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))

    const onSubmit = (event) => {
      event.preventDefault();
      let formData = new FormData();
        Object.keys(values).map((key) => {
            formData.append(key, values[key]);
        });
        formData.append('file', Upload_Proof)
        formData.append('schoolName', user?.department)

        Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/auth/student-register`, formData).then(function (response) {
          if (response.data.status === 'success') {
              toast.success(response.data.message)
              setValues(initialState)
              setAvatar(null)
              setUpload_Proof(null)
              refetch()
              setOpen(false)
              setLoading(false)
          }
          else {
              toast.error(response.data.message)
              setValues(initialState)
              setAvatar(null)
              setUpload_Proof(null)
              setOpen(false)
              setLoading(false)
          }
      }).catch(function (err) {
          toast.error('Internal Server Error')
          setValues(initialState)
          setAvatar(null)
          setUpload_Proof(null)
          setOpen(false)
          setLoading(false)

      })
    }
    const onCancel = (event) => {
      setValues(initialState)
      setAvatar(null)
      setUpload_Proof(null)

    }

    useEffect(() => {
        if (programGraduated) {
            SchoolsProgram[schoolName].forEach((programs) => {
                if (programs[0] === programGraduated) {
                    setProgramDuration(Array.from({ length: programs[1] }, (v, i) => `Year ${i + 1}`))
                }
            })
        }
    }, [programGraduated])

    useEffect(() => {
      if (itemToEdit && data.data) {
        data?.data.forEach((item) => {
          if (item?._id === itemToEdit) {
            setEdit(true); setOpen(true);
            console.log(item.photoURL)
            setPhotoURL(item.photoURL)
            const { salutation, name, programGraduated, gender, mobile, email, abcNo, currentIn, country, cast, religion, programEnroledOn,  } = item
            setValues({
              salutation, name, programGraduated, gender, mobile, email, abcNo, currentIn, country, cast, religion, programEnroledOn,
            })
          }
        })
      }
    }, [itemToEdit])
  return (
    <>
      <div className='py-2'>
        <AddButton onclick={setOpen} />
      </div>
      {/* <div><button className='btn btn-success' onClick={()=>{setOpen(true)}}>add</button></div> */}
      <DialogBox title="Add new Student" buttonName="submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={loading}>

        <div className='flex flex-wrap'>

            <div className='flex-items-center justify-center flex-col w-full mb-4'>
              {
                Upload_Proof==null&&edit?
                <img src={serverLinks.showFile(photoURL, 'student')} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' />:
                <img src={avatar} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' />
              }
              <div className='flex items-center justify-center gap-3'>
                <label className=' bg-blue-100 mt-3 p-1 rounded-xl text-blue-700 text-sm text-center cursor-pointer w-full duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' htmlFor='file'>Choose Profile Photo</label>
                <input type="file" name="file" id="file" accept="image/png, image/jpeg, image/jpg" className='hidden mx-auto' onChange={(e) => {
                    handleAvatarChange(e, setAvatar, setUpload_Proof)
                }} required={!edit} />
                {
                  Upload_Proof && <button className='w-[20%] bg-blue-100 mt-3 p-1 rounded-xl text-blue-700 text-sm  duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' onClick={(e) => { setUpload_Proof(null); }}>Reset Picture</button>
                }
              </div>
            </div>

            <Select className="col-md-2" id="salutation" value={salutation} label="Salutation" setState={setValues} options={Salutations} />

            <Text className="col-md-10" id="name" value={name} setState={setValues} label="Full Name" />

            <Select className='col-md-5' id="programGraduated" value={programGraduated} label="Enrolled Program" setState={setValues} options={schoolName ? SchoolsProgram[schoolName].map(item => { return item[0] }) : []} />

            <Select className="col-md-3" id="currentIn" value={currentIn} label="Admitted In" setState={setValues} options={programDuration ? programDuration : []} />

            <YearSelect className="col-md-4" id="programEnroledOn" value={programEnroledOn} label="Program Enroled On" setState={setValues} />

            <Select className="col-md-3" id="gender" value={gender} label="Gender" setState={setValues} options={genders} />

            <Select className='col-md-3' id='country' value={country} label="Nationality" setState={setValues} options={countries()} />

            <Select className='col-md-3' id='religion' value ={religion} label="Religion" setState={setValues} options={religions} />

            <Select className='col-md-3' id='cast' value={cast} label="Cast" setState={setValues} options={Casts} />

            <Text className="col-md-4" id="mobile" value={mobile} setState={setValues} label="Mobile Number" type='number' />
            
            <Text className="col-md-4" id="abcNo" value={abcNo} setState={setValues} label="ABC No." type='number' />
            
            <Text className="col-md-4" id="email" value={email} setState={setValues} label="Email" type='email' />

        </div>
      </DialogBox>

      <Table TB={data?.data} module="student" proof="student" year="programEnroledOn" propic="photoURL" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default NewStudent