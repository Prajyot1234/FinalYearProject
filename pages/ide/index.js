import React from 'react'
import styled from 'styled-components'
import { lightTheme, darkTheme } from '../../config/themeConfig'
import { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import Navbar from '../../components/Navbar'
import MainIDE from '../../components/MainIDE'
import IOContainer from '../../components/IOContainer'

const MainIDECon = styled.div`
    width: calc(100vw-1px);
`;

const IDEContainer = styled.div`
    width: calc(100vw-80px);
    color:  ${ props => props.theme.FontColor };
    background-color: ${ props => props.theme.backgroundColor };
    @media screen and (max-width: 900px) {
        height: 130vh;
    }
`;

function index() {
    const theme = useSelector((state)=> state.theme);
    return (
        <ThemeProvider theme={ theme === "light" ? lightTheme : darkTheme }>
            <MainIDECon>
                <IDEContainer>
                    <Navbar />
                    <MainIDE />
                    <IOContainer />
                </IDEContainer>
            </MainIDECon>
        </ThemeProvider>
    )
}

export default index;
