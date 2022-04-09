import React , { useState, useEffect } from 'react'
import dynamic from "next/dynamic"
import { useRouter } from 'next/router'

//style
import styled from 'styled-components';

//draft js
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js"
import { convertFromRaw, convertToRaw } from "draft-js"

//db
import { db } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useDocument } from 'react-firebase-hooks/firestore';

const Editor = dynamic(() => import("react-draft-wysiwyg").then((module) => module.Editor)
    , { ssr : false }
)

const EditorContainer = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    max-width: 1240px;
    font-family: 'poppins';
    padding: 18px;
    .toolbar{
        position: sticky;
        top: 0;
        justify-content: center!important;
        margin-left: auto!important;
        margin-right: auto!important;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        background-color: ${ props => props.theme.backgroundColor }!important;
    }
    .editor{
        margin: 6px;
        color:  ${ props => props.theme.FontColor }!important;
        background-color: ${ props => props.theme.backgroundColor }!important;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        line-height: 1;
    }

    .title{
        font-size: 22px;
    }

    .rdw-editor-toolbar {
        display: none;
    }

    .public-DraftStyleDefault-block{
        margin: 6px 0px!important;
    }
`;

function GTextEditor() {
  
  // id
  const router = useRouter();
  const { id } = router.query;

  //editor body data
  const [editorState, seteditorState] = useState(EditorState.createEmpty());

  const [value, loading, error] = useDocument(doc(db, 'blogUsers', id));

  useEffect(() => {
    if(value?.data().editorState){
        seteditorState(EditorState.moveFocusToEnd(EditorState.createWithContent(convertFromRaw(value?.data()?.editorState)) ));
    }
  }, []);

  return (
    <EditorContainer>
        <p className='title'>{value?.data().fileName} :-</p>
        <Editor
            editorState={editorState}
            preserveSelectionOnBlur={true}
            toolbarClassName = "toolbar"
            editorClassName = "editor"
         />
    </EditorContainer>
  )
}

export default GTextEditor;