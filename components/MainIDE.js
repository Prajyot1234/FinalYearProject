import React from 'react';
import Editor from "@monaco-editor/react";
import styled from 'styled-components';

//redux
import { useStore, useSelector, useDispatch } from 'react-redux';

//language
import mapLang from '../assets/mapLang.json';
import { setCode } from '../store/store';


const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 98vw;
    margin-top: 0px;
    -webkit-box-shadow: -2px -1px 1px 1px rgba(0,0,0,0.5);
    -moz-box-shadow: -3px -2px 3px 1px rgba(0,0,0,0.425);
    box-shadow: -4px 1px 4px 2px rgba(0,0,0,0.35);
`;

function MainIDE() {
    //redux
    const dispatch = useDispatch();
    const store = useStore();
    const lang = useSelector((state)=> state.language);
    const code =  useSelector((state)=> state.code);

    return (
        <div>
             <MainContainer>
                <Editor
                    height="58vh"
                    width="99vw"
                    value={code}
                    theme={`vs-${store.getState().theme}`}
                    language={mapLang[lang]}
                    defaultValue="//write some code"
                    onChange={(newCode,e)=>{
                        console.log(newCode);
                        dispatch(setCode(newCode));
                    }}
                />
            </MainContainer>
        </div>
    )
}

export default MainIDE;
