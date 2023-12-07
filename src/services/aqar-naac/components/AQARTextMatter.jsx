import React, { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import fetchAQARMatter, { saveAQARMatter } from '../js/fetchAQARMatter'
import UserLoading from '../../../pages/UserLoading'
import { Editor } from '@tinymce/tinymce-react'

const AQARTextMatter = ({ academicYear, matterType, userType, school, isAdmin }) => {

    const [matter, setMatter] = useState({ content: '' })
    const [matters, setMatters] = useState(null)
    const editorRef = useRef(null);

    const filter = isAdmin ? { academicYear: academicYear, userType, matterType } : { academicYear: academicYear, userType, matterType, school: school || null }

    const { data, isLoading, refetch } = useQuery(`Matter-${matterType}-${academicYear}-${school || 'admin'}`, () => fetchAQARMatter(filter, isAdmin), { refetchOnWindowFocus: false })

    const log = () => {
        if (editorRef.current) {
            submitMatter({ content: editorRef.current.getContent() })
        }
    };


    const submitMatter = (contentMatter) => {

        const formData = {
            matter: JSON.stringify(contentMatter), userType, matterType, academicYear, school
        }

        saveAQARMatter(formData, refetch)

    }

    useEffect(() => {
        if (data?.data?.status === 'success') {

            console.log(data?.data?.data)

            if (isAdmin) {
                setMatters(data?.data?.data)
            } else {
                setMatter(JSON.parse(data?.data?.data?.matter) || { content: '' })
            }
        }
    }, [data])


    return <div>
        {isLoading ? <UserLoading title="Getting data" /> : <form>
            {
                !isAdmin ? <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-3">
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={matter.content}
                        apiKey={process.env.REACT_APP_TINY_MCE}
                        init={{
                            height: 300,
                            branding: false,
                            menubar: false,
                            placeholder: "Start typing...",
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'charmap',
                                'anchor', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'wordcount',
                            ],
                            toolbar: 'bold italic underline | undo redo',
                            // toolbar: 'bold italic underline bullist numlist lineheight paste | styles fontfamily fontsize' + '| image link | undo redo',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onBlur={log}
                    />
                </div> : <div className="bg-gray-50 rounded-md p-3 mt-3 border">
                    {
                        matters && matters?.length > 0 ? <div >
                            <p className='text-semibold mb-3 font-medium'>School wise content / write-up:</p>
                            <div className="max-h-72 overflow-y-scroll">
                                <table className="table table-responsive table-bordered ">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th>School Name</th>
                                            <th>Content / write-up</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            matters?.map((matter) => {


                                                return <tr>
                                                    <td>
                                                        {matter?.school}
                                                    </td>
                                                    <td>
                                                        <div dangerouslySetInnerHTML={{ __html: JSON.parse(matter.matter).content }} />

                                                    </td>

                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div> : <div>
                            <p className="text-center my-3 text-yellow-500">No data available</p>
                        </div>
                    }
                </div>
            }

        </form>}
    </div>
}

export default AQARTextMatter