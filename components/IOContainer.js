import React from 'react';
import styled from 'styled-components';

//redux
import { useDispatch, useSelector } from 'react-redux'
import { setInput } from '../store/store'

const IOCon = styled.div`
    width: 97vw;
    font-family: 'poppins';
    font-weight: 600;
    height: 240px;
    display: flex;
    margin-top: 8px;
    margin-left: 8px;
    @media screen and (max-width: 900px) {
        flex-direction: column;
    }
`;

const ICon = styled.div`
    flex: 0.5;
    padding: 20px;
    h3{
        margin-bottom: 5px;
    }
    height: fit-content;
    border-right: 1px solid #161515;
    margin-left: 20px;
    -webkit-box-shadow: -2px -1px 1px 1px rgba(0,0,0,0.5);
    -moz-box-shadow: -3px -2px 3px 1px rgba(0,0,0,0.425);
    box-shadow: -1px 1px 4px 2px rgba(0,0,0,0.35);
    @media screen and (max-width: 900px) {
        margin-left: 0px;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }
`;

const InputContainer = styled.div`
    height: 80%;
    textarea{
        width: 100%;
        height: 120px;
        font-size: 18px;
        resize: none;
        padding: 5px;
        color:  ${ props => props.theme.FontColor };
        background-color: ${ props => props.theme.backgroundColor };
    }
`;

const OCon = styled.div`
    flex: 0.5;
    height: fit-content;
    padding: 20px;
    margin-left: 20px;
    -webkit-box-shadow: -2px -1px 1px 1px rgba(0,0,0,0.5);
    -moz-box-shadow: -3px -2px 3px 1px rgba(0,0,0,0.425);
    box-shadow: -1px 1px 4px 2px rgba(0,0,0,0.35);
    div{
        border: 1px solid gray;
        margin-top: 7px;
        border-radius: 4px;
        margin-bottom: 7px;
        padding: 3px;
        padding-left: 8px;
    }
    h4,p {
       display : inline-block;
    }
    h4{
        margin-left: 5px;
        font-weight: 600;
    }
    .success{
        color: #29cc29;
        font-weight: 700;
    }
    .error{
        color: #ee2525;
        font-weight: 700;
    }
    textarea{
        width: 70%;
        height: 50px;
        resize: none;
        font-size: 18px;
        display: inline;
        padding: 3px;
        margin-left: 5px;
        color:  ${ props => props.theme.FontColor };
        background-color: ${ props => props.theme.backgroundColor };
    }
    @media screen and (max-width: 900px) {
        margin-left: 0px;
    }   
`;

const OutputCon = styled.div`
    width: 100%;
    border: 1px solid gray;
    margin-top: 7px;
    border-radius: 4px;
    margin-bottom: 7px;
    padding: 3px;
    padding-left: 8px;
    .outputP{
        display: inline-block;
        margin-right: 5px;
    }
    .textareaCon{
        width: 80%;
        height: 50px;
        resize: none;
        font-size: 18px;
        display: inline-block;
        padding: 3px;
        margin-left: 5px;
        color:  ${ props => props.theme.FontColor };
        background-color: ${ props => props.theme.backgroundColor };
    }
`

function IOContainer() {
    //redux
    const dispatch = useDispatch();
    const output =  useSelector((state)=> state.output);
    const input =  useSelector((state)=> state.input);

    return (
        <IOCon>
            <ICon>
                <h3>Input / Testcase :</h3>
                <InputContainer>
                    <textarea 
                        placeholder='Inter Input'
                        onChange={(e) => dispatch(setInput(e.target.value))}  
                        spellCheck="false"
                    >
                        {input}
                    </textarea>
                </InputContainer>
            </ICon>
            <OCon>
                <h3>Output / Result :</h3>
                { 
                  <div>
                    <p>Result : </p> 
                    {
                    output && output.statusCode === 200 ?
                     <h4 className='success'>{output && output.statusCode === 200 ? "Success" : "" }</h4> :
                     <h4 className='error' >{output && output.statusCode === 400 ? "Error" : "" }</h4> 
                    }
                    
                  </div>
                }
                { 
                  <div>
                    <p>Compile time :  </p> 
                    {
                    output && output.statusCode === 200 ?
                     <h4>{output && output.statusCode === 200 ? `${output.cpuTime} ms` : "" }</h4> :
                     <h4>{output && output.statusCode === 400 ? "0 ms" : "" }</h4> 
                    }
                    
                  </div>
                }
                
                <OutputCon>
                    <h4 className='outputP'>Output :</h4>
                    <textarea className='textareaCon' required="required" spellCheck="false" disabled value={ output && output.output !== "" ? output.output : ""  }> </textarea>
                </OutputCon>  
            </OCon>
        </IOCon>
    )
}

export default IOContainer;
