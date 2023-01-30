import React,{ useState, useEffect } from 'react';
import { useRouter } from 'next/router'

//theme
import styled,{ ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../../config/themeConfig';

//components imports
import Navbar from '../../../components/Blog/Navbar';

//material-ui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//language's
import {
    languageOptions as options,
} from "../../../assets/languageOptions";

//spinner
import { Circle } from "better-react-spinkit";

//redux
import { useDispatch, useStore, useSelector } from 'react-redux';
import { setProblemCode, setproblemLanguage } from '../../../store/store';

//language
import mapLang from '../../../assets/mapLang.json';

// Connect to server
import axios from "axios";

//editor
import Editor from "@monaco-editor/react";

const SolveContainer = styled.div`
  color:  ${ props => props.theme.FontColor };
  background-color: ${ props => props.theme.backgroundColor };
  font-family: 'poppins';
  padding-bottom: 20px;
`;

const ProblemContainer = styled.div`
    width: 90%;
    max-width: 1240px;
    margin: 20px auto;
    .title_para{
        text-align: center;
        margin-top: 50px;
        font-size: 28px;
    }
`;

const RunContainer = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    .run_btn{
        margin: 10px;
        padding: 1px 30px!important;
        border-radius: 10px;
        border: 1px solid ${ props => props.theme.FontColor };
        outline: none;
        color:  ${ props => props.theme.FontColor };
        background-color: ${ props => props.theme.backgroundColor };
    }
    .spiner{
        color:  ${ props => props.theme.FontColor }!important;
        background-color: ${ props => props.theme.backgroundColor }!important;
    }
    button:hover {
        border: 1px solid #1976D2;
        -webkit-box-shadow: -2px -1px 1px 1px rgba(0,0,0,0.5);
        -moz-box-shadow: -3px -2px 3px 1px rgba(0,0,0,0.425);
        box-shadow: -1px 1px 4px 2px rgba(0,0,0,0.35);
        cursor: pointer;
        color: #1976D2;
    }
`;

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const SelectContainer = styled.div`
    display: flex;
    margin-left: 35px;
    color:  ${ props => props.theme.FontColor }!important;
    .selectForm{
        width: 130px!important;
    }
    .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input{
        font-family: 'poppins'!important;
        font-weight: 600;
        color:  ${ props => props.theme.FontColor }!important;
        background-color: ${ props => props.theme.backgroundColor };
        padding-left: 10px;
        padding-top: 14px;
        padding-bottom: -5px;
    }
    .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input{
        padding-right: 5px!important;
    }
    .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root{
        font-family: 'poppins'!important;
    }
    .css-sghohy-MuiButtonBase-root-MuiButton-root{
        color:  ${ props => props.theme.FontColor };
        background-color: ${ props => props.theme.backgroundColor };
    }
    .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper{
        max-height: 250px!important;
    }
    @media screen and (max-width: 900px) {
        margin-left: 8px;
        .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper{
            max-height: 200px!important;
        }
    }
`;

const Container = styled.div`
    padding: 20px 40px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-top: 40px;
`;

const OutputContainer = styled.div`
    padding: 20px 40px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-top: 40px;
    .output_para{
        text-align: center;
        margin-bottom: 20px;
    }
    .success{
        color: #1EBE6D;
    }
    .error{
        color: #df4343;
    }
    .flex{
        display: flex;
    }
`;

const URL =
    process.env.NODE_ENV == "development"
        ? "http://localhost:3002/problems/withId"
        : "https://outrageous-yak-pleat.cyclic.app/problems/withId"; 

        //URL's for backend
const URL1 =
    process.env.NODE_ENV == "development"
        ? "http://localhost:3002/execute"
        : "https://outrageous-yak-pleat.cyclic.app/execute"; 

function Solve() {
  //theme
  const theme = useSelector((state)=> state.theme);

  //problem data
  const [problem, setproblem] = useState();

  //getting ID
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => { 
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      params: {
          "id": id
      }
    }
    axios
      .post(URL,config)
      .then((response) => {
        setproblem(response?.data?.data);
      })
    
  }, [id]);

  //form
  const [lang, setlang] = useState('C');

  const dispatch = useDispatch();
  const store = useStore();

  useEffect(()=>{
    setlang(store.getState().problemLanguage);
  },[lang]);

  const handleChange = (event) => {
    setlang(event.target.value);
    dispatch(setproblemLanguage(event.target.value));
  };

  const [flagS, setflagS] = useState(false);
  const [result, setresult] = useState(null);

  const language = useSelector((state)=> state.problemLanguage);
  const code =  useSelector((state)=> state.problemCode);

  const Run = () => {
    setflagS(true);

    let inputData = "";
    for(let i=0;i<problem?.testcases[0].testcase.length;i++){
        if( /\d/.test(problem?.testcases[0].testcase[i])){
            inputData += problem?.testcases[0].testcase[i]+" ";
        }
    }

    const payload = {
        code: code,
        language: language,
        input: inputData,
    };
    console.log(payload);
    
    axios
        .post(URL1, payload)
        .then((response) => {
            setresult(response.data);
            console.log(result);
            setflagS(false);
        })
        .catch((error) => {
            alert(" There is some kind of Error.");
            setresult("false");
            setflagS(false);
        });
  }


  return (
    <ThemeProvider theme={ theme === "light" ? lightTheme : darkTheme }>
        <SolveContainer>
            <Navbar />
            <ProblemContainer>
                <h3 className='title_para'>{problem?.title}</h3>
                <RunContainer>
                    <SelectContainer>
                        <FormControl fullWidth className='selectForm'>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChange}
                                value={lang}
                                className='select'
                                size='compact'
                            >
                            {options.map((item)=> <MenuItem value={item.label}>{item.label}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </SelectContainer>
                    <button className='run_btn' onClick={Run}>{ flagS==true ? <Circle color={theme=="dark" ? "white" : "#212121"} /> : "Run" }</button>
                </RunContainer>
                <Container>
                    <MainContainer>
                        <Editor
                            height="58vh"
                            width="99vw"
                            value={code}
                            theme={`vs-${store.getState().theme}`}
                            language={mapLang[lang]}
                            defaultValue="//write some code"
                            onChange={(newCode,e)=>{
                                dispatch(setProblemCode(newCode));
                            }}
                        />
                    </MainContainer>
                </Container>
                <OutputContainer>
                    <h3 className='output_para'>Output :- </h3>
                    {
                        result != null && (
                            <div>
                                <div className='flex'>Result :- { result?.output.trim() === problem?.testcases[0]?.checkOutput ? ( <p className='success'>Success</p> ) : ( <p className='error'>Error</p> ) }  </div> 
                                <div className='flex'>Output :- <p>{result?.output}</p></div>
                                <div className='flex'>ExpectedOutput :- <p>{problem?.testcases[0]?.checkOutput}</p></div>
                                <div className='flex'>Memory :- <p>{result?.memory}</p></div>
                                <div className='flex'>cpuTime :- <p>{result?.cpuTime}</p></div>
                            </div>
                        )
                    }
                    {/* {
                        result.length > 0 && result === "true" ? <p className='success'>Success</p> : <p className='error'>Error</p>    
                    } */}
                </OutputContainer>
            </ProblemContainer>
        </SolveContainer>
    </ThemeProvider>
  )
}

export default Solve;