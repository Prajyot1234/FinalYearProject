import React from 'react';

//user data
import { useSession } from "next-auth/react";

//components imports
import Loading from '../../../components/Loader/BigLoader'
import Login from '../../login/index'
import Navbar from '../../../components/Blog/Navbar'

//style
import styled,{ ThemeProvider } from 'styled-components';

//dark-light theme
import { lightTheme, darkTheme } from '../../../config/themeConfig';

//redux
import { useSelector } from 'react-redux';
import TextEditor from '../../../components/TextEditor';
import GTextEditor from '../../../components/GTextEditor';

const BlogContainer = styled.div`
   background-color: ${ props => props.theme.backgroundColor}!important;
`

function BlogsCreate() {

  //theme
  const theme = useSelector((state)=> state.theme); 

  //user details
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
            <GTextEditor />
        </BlogContainer>
    </ThemeProvider>
  )
}

export default BlogsCreate




















