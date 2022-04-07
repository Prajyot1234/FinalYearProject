import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Link from "next/link";

//redux
import { useSelector } from 'react-redux'

///theme's
import { lightTheme, darkTheme} from "../config/themeConfig"; 

//icons imports 
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const AlreadyContainer = styled.div`
  font-family: 'poppins';
  font-weight: 200;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  color:  ${ props => props.theme.FontColor};
  background-color: ${ props => props.theme.backgroundColor}!important;
  span{
      color: #1BBE6D;
  }
`;

const MainContainer = styled.div`
  padding: 50px;
  box-shadow: 12px 19px 28px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  transition: box-shadow delay 2ms;

  .withMax{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto!important;
    margin-right: auto!important;
  }

  .Backbtn{
    box-shadow: 8px 10px 18px rgba(0,0,0,0.30), 0 10px 7px rgba(0,0,0,0.22);
    margin: 10px;
    color:  ${ props => props.theme.FontColor}!important;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 10px 18px rgba(0,0,0,0.30), 0 10px 7px rgba(0,0,0,0.22);
  }

`;

function AlreadyLoggedIn() {
  //theme
  const theme = useSelector((state)=> state.theme); 

  return (
    <ThemeProvider theme={ theme === "light" ? lightTheme : darkTheme }>
      <AlreadyContainer>
        <MainContainer>
          <div>
            <h1><span>A</span>lread<span>y</span> <span>L</span>oggedI<span>n</span></h1>
            <div className='withMax'>
              <Link href='/'>
                <Tooltip title="Go to Home">
                    <IconButton className="Backbtn">
                      <HomeIcon />
                    </IconButton>
                </Tooltip>
              </Link>
              <Link href='/blog'>
                <Tooltip title="Go to blog">
                  <IconButton className="Backbtn">
                    <BookIcon />
                  </IconButton>
                </Tooltip> 
              </Link>
            </div>
          </div>
        </MainContainer>
      </AlreadyContainer>
    </ThemeProvider>
  )
}

export default AlreadyLoggedIn