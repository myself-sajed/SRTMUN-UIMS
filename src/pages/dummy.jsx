import React, { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const Test = () => {
    return (
        <div>
            <RichText />
            <RichText />
        </div>
    )
}
export default Test;


const RichText = () => {

    // const [editorState, setEditorState] = useState(
    //     () => EditorState.createEmpty(),
    // );

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    useEffect(() => {
        console.log('Message : ', convertToHTML(editorState.getCurrentContent()))
    }, [editorState])

    const [convertedContent, setConvertedContent] = useState(null);

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    return (
        <div className="App">
            <header className="App-header">
                Rich Text Editor Example
            </header>
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
            />
            <div className="preview"></div>
        </div>
    )

}
