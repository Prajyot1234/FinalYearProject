import React from 'react'
import styled,{ ThemeProvider } from 'styled-components';

//component's imports
import Navbar from '../../components/Blog/Navbar';
import Banner from '../../components/Blog/Banner';

//dark-light theme
import { lightTheme, darkTheme } from '../../config/themeConfig';

//redux
import { useSelector } from 'react-redux';

//session provider
import { useSession } from "next-auth/react";

//imports login
import Login from '../login/index';
import Loading from '../../components/Loader/BigLoader';

const BlogContainer = styled.div`

`;


function index() {
  //theme
  const theme = useSelector((state)=> state.theme); 

  //user auth
  const { data: session, status } = useSession();

  if(status === "loading"){
    return <Loading />
  }

  if(!session){
    return <Login />
  }
 
  return (
    <ThemeProvider theme={ theme === "light" ? lightTheme : darkTheme }>
      <BlogContainer>
          <Navbar />
          <Banner />
      </BlogContainer>
    </ThemeProvider>
  )
}

export default index;
