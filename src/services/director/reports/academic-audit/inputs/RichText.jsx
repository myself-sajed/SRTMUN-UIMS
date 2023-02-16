import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ShowAAAFetchButton from '../components/ShowAAAFetchButton';

export default function RichText({ state, setState, note = false, allYearAAAData, fetchPreviousYears = false, tableToFetch = null }) {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            setState({ ...state, content: editorRef.current.getContent() })
        }
    };



    return (
        <div className='flex flex-col gap-3'>

            <div className='flex items-start justify-between w-full'>
                <div>
                    {
                        note && <div>
                            {note}
                        </div>
                    }
                </div>
                <div className='w-[30%] float-right'>
                    {
                        (fetchPreviousYears && allYearAAAData) && <ShowAAAFetchButton allYearAAAData={allYearAAAData} setState={setState} state={state} tableToFetch={tableToFetch} />
                    }
                </div>
            </div>


            <Editor
                tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={state.content}
                init={{
                    height: 300,
                    menubar: false,
                    placeholder: "Start typing...",
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
                    ],
                    toolbar: 'bold italic underline bullist numlist lineheight paste table | styles fontfamily fontsize | forecolor backcolor |' +
                        '| searchreplace spellchecker fullscreen | image link insertdatetime | undo redo',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onBlur={log}
            />
        </div>
    );
}