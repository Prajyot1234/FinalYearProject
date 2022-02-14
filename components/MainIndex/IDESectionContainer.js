import React from 'react'
import styled from 'styled-components';

//Link
import Link from 'next/link';

//icon's imports
import CodeOffIcon from '@mui/icons-material/CodeOff';
import LanguageIcon from '@mui/icons-material/Language';
import DownloadIcon from '@mui/icons-material/Download';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const IDEInfoCon = styled.div`
    text-align: center;
    h1{
        font-size: 18px;
        color: #0fca69;
        font-weight: 600;
    }
    span{
        color: #1BBE6D;
    }
    .ide_para{
        width: 30%;
        margin: 10px auto;
        font-weight: 600;
        font-size: large;
    }
    ._icon{
        font-size: 28px;
        position: relative;
        top: 6px;
    }
    ._h1{
        font-size: 20px;
        display: block;
        width: fit-content;
        margin: auto;
        margin-top: 25px;
        padding-left: 25px;
    }
    ._h1:hover{
        cursor: pointer;
        transform: translateY(-3px);
        transition: transform 500ms;
    }
    @media screen and (max-width: 900px) {
        .ide_para{
            width: 80%;
        }
    }
`;

const IDESecCon = styled.div`
    display: flex;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    max-width: 1240px;
    margin-top: 30px;
    .icon{
        margin: 10px auto;
        color: ${ props => props.theme.FontColor };
        width: 40px;
        height: 40px;
        background-color: #7ee8fa;
        background-image: linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%);
        padding: 7px;
        border-radius: 10px;
    }
    .icon:hover{
        cursor: pointer;
    }
    .para_con{
        width: 70%;
        text-align: center;
        margin: 2px auto 10px  auto;
    }
    @media screen and (max-width: 900px) {
        flex-direction: column;
        .para_con{
            width: 80%;
        }
    }
`;

const IDESCon = styled.div`
    width: 33.33%;
    margin-left: auto;
    margin-right: auto;
    @media screen and (max-width: 900px) {
        width: 100%;
    }

`;

function IDESectionContainer() {
  return (
    <IDEInfoCon>
        <div>
            <h1> <span>O</span>nlin<span>e</span> <span>I</span>d<span>e</span>?</h1>
            <p className='ide_para'>Online IDE's(Integrated Development Environment), used to run differnt language code into a single platform.</p>
        </div>
        <IDESecCon>
            <IDESCon>
                <CodeOffIcon className="icon" />
                <p className='para_con'>
                    We have differnt themes from vs-code editor and it also have feature's like auto-complete and auto-suggestion. 
                </p>
            </IDESCon>
            <IDESCon>
                <LanguageIcon className='icon'/>
                <p className='para_con'>
                    We have multi-language support i.e we can run differnt languages code into single ide. we support c , c++, java etc.
                </p>
            </IDESCon>
            <IDESCon>
                <DownloadIcon className='icon' />
                <p className='para_con'>
                    You can Download all code into our local machine by using our download feature. 
                </p>
            </IDESCon>
        </IDESecCon>
        <Link href='/ide' as={`/ide`}>
            <h1 className='_h1'>Visit Our IDE<ChevronRightIcon className='_icon' /></h1>
        </Link>
    </IDEInfoCon>
  )
}

export default IDESectionContainer;