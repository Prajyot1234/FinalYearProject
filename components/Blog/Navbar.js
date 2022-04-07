//next imports
import Link from 'next/link';
import styled from "styled-components"

import { Avatar } from '@mui/material';

//session provider
import { useSession } from "next-auth/react";

const MainCon = styled.div`
    color:  ${ props => props.theme.FontColor};
    background-color: ${ props => props.theme.backgroundColor}!important;
    -webkit-box-shadow: -2px -1px 1px 1px rgba(0,0,0,0.5);
    -moz-box-shadow: -3px -2px 3px 1px rgba(0,0,0,0.425);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    font-family: 'poppins';
    padding-bottom: 20px;
    .span{
        color: #1BBE6D;
    }
`;

const NavbarCon = styled.div`
    color:  ${ props => props.theme.FontColor };
    background-color: ${ props => props.theme.backgroundColor }!important;
    width: 90%;
    padding: 8px;
    padding-top: 15px;
    max-width: 1240px;
    display: flex;
    justify-content: space-between; 
    margin-left: auto;
    margin-right: auto;
    .logo{
        font-size: 22px;
        font-weight: 800;
    }
    .logo:hover{
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: #1BBE6D;
    }
    .avatar{
        height: 30px;
        width: 30px;
    }
    .avatar:hover{
        cursor: pointer;
        transform: scale(0.9);
        transition: all .2s ease-in-out;
    }


    @media screen and (max-width: 900px) {
       width: 92%;
       padding: 5px;
       margin-left: 20px;
       margin-right: 20px;
       padding-top: 20px;
    }
   
`;


function Navbar() {
  const { data: session } = useSession();

  return (
    <MainCon>
        <NavbarCon>
            <Link href='/'>
                <h1 className='logo'><span className='span'>C</span>OD<span className='span'>E</span>   <span className='span'>H</span>ELPE<span className='span'>R</span></h1>
            </Link>
            <Avatar className="avatar" src={session?.user?.image} />
        </NavbarCon>
    </MainCon>
  )
}

export default Navbar
