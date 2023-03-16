import React, { useEffect, useState } from 'react'
import GoBack from '../../../components/GoBack'
import title from '../../../js/title'
import { InboxOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../../../components/Footer';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { message, Upload } from 'antd';
import { IconButton } from '@mui/material';
import { toast } from 'react-hot-toast';
import Axios from 'axios';
import useProAuth from '../../../hooks/useProAuth';
import siteLinks from '../../../components/siteLinks';
import Bred from '../../../components/Bred';
import { useNavigate } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const PROEditor = () => {

    title('Post a News | PRO')
    useProAuth(false)
    const navigate = useNavigate()

    return (
        <div className='w-full'>
            <div>
                <Header title="PRO Editor" showSearch={false} />
            </div>
            <div className='mt-2 flex items-center justify-between'>
                <Bred links={[siteLinks.welcome, siteLinks.proEditor]} />
                <div onClick={() => { navigate(siteLinks.allNews.link) }} className='cursor-pointer rounded-full bg-blue-200 hover:bg-blue-300 text-sm px-2 py-1 border flex items-center justify-center gap-2'>
                    <p className='hover:text-black'>Go to All News</p>
                    <ArrowForwardRoundedIcon sx={{ fontSize: '20px' }} />
                </div>
            </div>
            <div className='w-full'>
                <EditorForm />
            </div>

            <Footer />
        </div>
    )
}

export default PROEditor

const EditorForm = ({ actionToPerform = "Add", news = null, setIsModalOpen, refetch }) => {

    const { Dragger } = Upload;


    const [headline, setHeadline] = useState(null)
    const [file, setFile] = useState(null)
    const [desc, setDesc] = useState(null)
    const [loading, setLoading] = useState(false)

    const publishNews = (e) => {
        e.preventDefault();
        if (actionToPerform === 'Add') {
            if (file) {
                setLoading(true)

                const formData = new FormData()

                formData.append('headline', headline)
                formData.append('file', file)
                formData.append('desc', desc)

                const url = `${process.env.REACT_APP_MAIN_URL}/api/news/publish`
                Axios.post(url, formData).then((res) => {
                    if (res.data.status === 'success') {
                        setLoading(false)
                        setHeadline('')
                        setFile(null)
                        setDesc('')
                        toast.success(res.data.message)
                    } else if (res.data.status === 'error') {
                        toast.error(res.data.message)
                        setLoading(false)
                        return
                    }
                }).catch((err) => {
                    toast.error('Something went wrong')
                    setLoading(false)
                    return
                })
            } else {
                toast.error('Please select a file to upload...')
            }
        } else if (actionToPerform === 'Edit') {
            if (file) {
                setLoading(true)

                const formData = new FormData()

                formData.append('headline', headline)
                formData.append('file', file)
                formData.append('desc', desc)
                formData.append('id', news._id)
                formData.append('previousPhotoURL', news.photoURL)

                const url = `${process.env.REACT_APP_MAIN_URL}/api/news/edit`
                Axios.post(url, formData).then((res) => {
                    if (res.data.status === 'success') {
                        setLoading(false)
                        setHeadline('')
                        setFile(null)
                        setDesc('')
                        refetch()
                        toast.success(res.data.message)
                        setIsModalOpen(false)
                    } else if (res.data.status === 'error') {
                        toast.error(res.data.message)
                        setLoading(false)
                        setIsModalOpen(false)
                        return
                    }
                }).catch((err) => {
                    toast.error('Something went wrong')
                    setLoading(false)
                    setIsModalOpen(false)
                    return
                })
            } else {
                toast.error('Please select a file to upload...')
            }
        }
    }

    useEffect(() => {
        if (actionToPerform === 'Edit') {
            setHeadline(news.headline)
            setFile(news.photoURL)
            setDesc(news.desc)
        }
    }, [news])


    return <div className="w-full">
        <form className="col g-3" onSubmit={publishNews} >
            <div className="my-3">
                <label htmlFor="titleofthenews" className="form-label">Headline of the News ( बातमीचे शीर्षक )</label>
                <input type="text" value={headline} onChange={(e) => { setHeadline(e.target.value) }} className="form-control" id="titleofthenews" placeholder='Title / Headline' required />
            </div>

            <div className="my-3">
                <label htmlFor="descofthenews" className="form-label">Description of the News ( बातमीचे वर्णन ) <span className='text-muted text-xs'>(Optional)</span></label>
                <textarea type="text" value={desc} onChange={(e) => { setDesc(e.target.value) }} placeholder="News in brief..." className="form-control" id="descofthenews" />
            </div>

            <div className='my-3 w-full hover:border-blue-600 border-blue-300 border-2 border-dashed rounded-md cursor-pointer' onClick={() => document.getElementById('file').click()}>
                <Dragger className='pointer-events-none border-none outline-none'>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click file to this area to upload ( कृपया फोटो निवडण्यासाठी येथे क्लिक करा )</p>
                    <p className="ant-upload-hint">
                        Please ensure that the picture you are uploading is less than 1 MB in size.
                        ( कृपया तुम्ही अपलोड करत असलेल्या फोटोचा आकार 1 MB पेक्षा कमी असल्याची खात्री करा. )
                    </p>

                </Dragger>
            </div>

            <input type="file" className='hidden' name="file" id="file" onChange={(e) => setFile(e.target.files[0])} />

            {file && <div className='border px-3 font-semibold flex items-center justify-between bg-blue-100 text-blue-600 rounded-md text-sm'>
                <div className='flex items-center justify-start gap-2'><span className='text-muted'>Selected File : </span> <span>{file.name || news.photoURL}</span></div> <IconButton onClick={() => setFile(null)}><DeleteRoundedIcon /></IconButton>
            </div>}

            <div className='flex items-center justify-start gap-2'>
                {
                    !loading ? <div className="my-3">
                        <button className="btn btn-primary bg-primary" type="submit">Publish News</button>
                    </div> :
                        <button class="btn btn-primary" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Publishing...
                        </button>
                }

                <div className="my-3" onClick={(e) => { e.preventDefault(); setIsModalOpen(false) }}>
                    <button className="btn btn-danger bg-danger">Cancel</button>
                </div>
            </div>
        </form>
    </div>
}

export { EditorForm }