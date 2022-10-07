import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

//dark-light theme
import { lightTheme, darkTheme } from '../../config/themeConfig'

//redux
import { useSelector } from 'react-redux'

//components imports 
import AlreadyLoggedIn from '../../components/AlreadyLoggedIn'

//next-auth
import { useSession, signIn } from "next-auth/react"

const LoginCon = styled.div`
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

const ChildCon = styled.div`
    box-shadow: 0 19px 28px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    transition: box-shadow delay 2ms;
    width: 25%;
    height: 60%;
    text-align: center;
    padding: 5px;
    .login_h1{
        font-family: 'Fredoka', sans-serif;
        margin-top: 12px;
        font-size: 40px;
        letter-spacing: 1.1px;
    }
    .login_img{
        width: 70%;
        height: 50%;
        margin-top: 40px;
    }
    .wrap {
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    
    .button {
        margin-top: 30px;
        vertical-align: center;
        width: 170px;
        height: 45px;
        font-family: 'Roboto', sans-serif;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 2.6px;
        font-weight: 500;
        color: black;
        font-weight: 600;
        background-color: #fff;
        border: none;
        border-radius: 35px;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease 0s;
        cursor: pointer;
        outline: none;
    }

    .button:hover {
        background-color: #2EE59D;
        box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
        color: #fff;
        transform: translateY(-7px);
    }

    @media screen and (max-width: 1240px) {
        width: 30%;
    }
    @media screen and (max-width: 900px) {
        width: 40%;
    }
    @media screen and (max-width: 768px) {
        width: 76%;
        .login_img{
            width: 90%;
        }
    }
    &:hover{
        cursor: pointer;
        box-shadow: 0 10px 18px rgba(0,0,0,0.30), 0 10px 7px rgba(0,0,0,0.22);
    }
`;

function index() {
  //get user
  const { data: session } = useSession()
 
  //theme
  const theme = useSelector((state)=> state.theme); 

  console.log("session",session);

  if(session){
      return <AlreadyLoggedIn />
  }

  return (
    <ThemeProvider theme={ theme === "light" ? lightTheme : darkTheme }>
        <LoginCon>
            <ChildCon>
                <h1 className='login_h1'><span>C</span>OD<span>E</span> <span>H</span>ELPE<span>R</span></h1>
                <img src="/login.svg" className='login_img'/>
                <div class="wrap" >
                    <button class="button" onClick={() => signIn()}>
                       Google Login
                    </button>
                </div>
            </ChildCon>
        </LoginCon>
    </ThemeProvider>
  )
}

export default index;

