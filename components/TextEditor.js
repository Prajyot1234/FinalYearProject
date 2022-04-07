import React from 'react'
import dynamic from "next/dynamic"
//style
import styled from 'styled-components';

//draft js
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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

    .public-DraftStyleDefault-block{
        margin: 6px 0px!important;
    }
`;

function TextEditor() {
    

  return (
    <EditorContainer>
        <Editor
            toolbarClassName = "toolbar"
            editorClassName = "editor"
         />
    </EditorContainer>
  )
}

export default TextEditor;