import React,{ useEffect,useState } from 'react'
import styled from 'styled-components'

//language's
import {
    languageOptions as options,
} from "../assets/languageOptions";

//material-ui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//material-ui-icons
import DownloadIcon from '@mui/icons-material/Download';

//download file
import downloadFileUtil from '../controllers/downloadAsFile';

//redux
import { useDispatch, useStore, useSelector } from 'react-redux'
import { setLanguage, setOutput } from '../store/store'

// Connect to server
import axios from "axios";

//spinner
import { Circle } from "better-react-spinkit";


const NavContainer = styled.div`
    display: flex;
    width: 98%;
    height: fit-content;
    font-family: 'poppins';
    padding: 5px;
    padding-left: 20px;
    padding-right: 20px;  
    @media screen and (max-width: 768px) {
        padding-left: 5px;
        padding-right: 5px;  
    }  
`

const Logo = styled.div`
    display: flex;
    .NavImg{
        height: 30px;
        width: 30px;
        margin: 10px;
        display: inline-flex;
        border: 2px solid black;
    }
    h2{
        padding-top: 10px;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 1.4px;
    }
`;

const NavbarLeft = styled.div``;

const NavbarRight = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
`;

const SelectContainer = styled.div`
    display: flex;
    width: 200px;
    margin-left: 35px;
    color:  ${ props => props.theme.FontColor }!important;
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

const PopUp = styled.div`
    margin-left: 35px;
    margin-top: auto;
    margin-bottom: auto;
    border: 1px solid #c7c4c4;
    border-radius: 4px;
    padding: 2px 6px;
    object-fit: contain;
    .icon{
        margin-top: 5px;
    }
    &:hover {
        border: 1px solid #1976D2;
        -webkit-box-shadow: -2px -1px 1px 1px rgba(0,0,0,0.5);
        -moz-box-shadow: -3px -2px 3px 1px rgba(0,0,0,0.425);
        box-shadow: -1px 1px 4px 2px rgba(0,0,0,0.35);
        cursor: pointer;
        color: #1976D2;
    }
    @media screen and (max-width: 900px) {
        margin-left: 10px;
        margin-right: 10px;
    }
`;

const RunContainer = styled.div`
    button{
        padding: 8px 18px;
        border-radius: 4px;
        outline: none;
        border: 1px solid ;
        margin-top: 10px;
        color:  ${ props => props.theme.FontColor };
        background-color: ${ props => props.theme.backgroundColor };
        padding-right: 20px;
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

//URL's for backend
const URL =
    process.env.NODE_ENV == "development"
        ? "http://localhost:3002/execute"
        : "https://outrageous-yak-pleat.cyclic.app/execute"; 

function Navbar() {
    //redux
    const dispatch = useDispatch();
    const store = useStore();
    const language = useSelector((state)=> state.language);
    const theme = useSelector((state)=> state.theme);
    const code =  useSelector((state)=> state.code);
    const input =  useSelector((state)=> state.input);
    const output =  useSelector((state)=> state.output);

    const [lang, setlang] = useState('C');

    useEffect(()=>{
        setlang(store.getState().language);
    },[lang]);
    
    const handleChange = (event) => {
       setlang(event.target.value);
       dispatch(setLanguage(event.target.value));
    };
    
    //flag for spinner
    const [flagS, setflagS] = useState(false);

    const Run = () => {
        setflagS(true);
        const payload = {
            code: code,
            language: language,
            input: input,
        };
        // console.table(payload);
        
        axios
            .post(URL, payload)
            .then((response) => {
                dispatch(setOutput(response.data));
                setflagS(false);
            })
            .catch((error) => {
                alert(" There is some kind of Error.");
                dispatch(setOutput(error.Error));
                setflagS(false);
            });
    }

    return (
        <NavContainer>
            <NavbarLeft>
                <Logo>
                    <img src='data:image/png;base64,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'
                    className='NavImg' alt="Logo" />
                    <h2>IDE</h2>
                </Logo>
            </NavbarLeft>
           <NavbarRight>
                <SelectContainer>
                    <FormControl fullWidth>
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
                    <PopUp onClick={() =>
                        downloadFileUtil(code, language)
                    }>
                        <DownloadIcon className='icon' />
                    </PopUp>
                </SelectContainer>
                <RunContainer>
                    <button onClick={Run}>{ flagS==true ? <Circle color={theme=="dark" ? "white" : "#212121"} /> : "Run" }</button>
                </RunContainer>
           </NavbarRight>
        </NavContainer>
    )
}

export default Navbar;
