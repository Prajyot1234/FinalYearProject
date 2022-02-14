import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; 

//link
import Link from 'next/link';

//redux
import { setTheme } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'

//material-ui icon
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// component's import's 
import Banner from './Banner';
import IDESectionContainer from './IDESectionContainer';
import ProblemSectionCon from './ProblemSectionCon';

const MainCon = styled.div`
    .span{
        color: #1BBE6D;
    }
`;

const BottomCon = styled.div`
    width: 100%;
    padding: 5px;
    -webkit-box-shadow: -2px -1px 1px 1px rgba(0,0,0,0.5);
    -moz-box-shadow: -3px -2px 3px 1px rgba(0,0,0,0.425);
    box-shadow: -4px 1px 4px 2px rgba(0,0,0,0.35);
`

const NavCon = styled.div`
    width: 90%;
    padding: 8px;
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
    @media screen and (max-width: 900px) {
       padding: 4px;
    }
`;


const Rightmenu = styled.div`
  display:flex;
  align-items:center;
  a{
    color:  ${ props => props.theme.FontColor };   
    font-weight:600;
    text-transform:uppercase;
    margin-right:10px;
  }
  .loginBtn{
      margin-right: 20px;
      padding: 7px;
      padding-left: 20px;
      padding-right: 20px;
      border: none;
      border-radius: 18px;
      font-family: 'poppins';
      font-size: 14px;
      transition: .4s;
      font-weight: 600; 
      color:  ${ props => props.theme.FontColor };
      background-color: ${ props => props.theme.backgroundColor };
      border: 1px solid #1BBE6D;
      &:hover{
          cursor: pointer;
          background-color: #1BBE6D;
          color: white!important;
          box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.1);
          transform: translateY(-2px);
      }
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 43px;
    height: 24px;
    margin-right: 20px;
    }
    
    @media screen and (max-width: 900px) {
      .switch {  
        margin-right: 10px;
      }
      .loginBtn{
        margin-right: 10px;
      }
    }

    .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
    }

    .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    }

    .slider:before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    }

    input:checked + .slider {
    background-color: #1BBE6D;
    }

    input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
    border-radius: 34px;
    }

    .slider.round:before {
    border-radius: 50%;
    }
`;
const CustomMenu = styled(MenuIcon)`
  cursor:pointer;
`;
const BurgerNav=styled.div`
  color:  ${ props => props.theme.FontColor };
  background-color: ${ props => props.theme.backgroundColor };
  border: 1px solid gray;
  position:fixed;
  top:0;
  right:0;
  bottom:0;
  width:340px;
  z-index:200;
  list-style:none;
  padding:20px;
  display:flex;
  flex-direction:column;
  text-align:start;
  transform:${props=>props.show  ? "translateX(0)":"translateX(100%)"};
  transition: transform 0.2s;
  li{
    padding:15px 0;
    border-bottom:1px solid  ${ props => props.theme.FontColor };
    a{
      font-weight:600;
      color:  ${ props => props.theme.FontColor };
      text-decoration: none;
    }
  }
  @media screen and (max-width: 900px) {
      width: 250px;
  }
`;
const Customclose=styled(CloseIcon)`
  cursor:pointer;
`;
const Closewrapper=styled.div`
  display:flex;
  justify-content:flex-end;
`;



function Index() {
  const dispatch = useDispatch();
  const theme = useSelector((state)=> state.theme); 

  //usestates
  const [Burgerstatus,setBurgerstatus]=useState(false);

  //theme changer function 
  const ChangeTheme = () => {
    if(theme==="light") dispatch(setTheme("dark"));
    else dispatch(setTheme("light"));
  }

  //setting the theme to another state using toggle button
  const [ checked, setchecked] = useState();

  //usestate for changing theme
  useEffect(() => {
    if(theme === "dark"){
      setchecked(true)
    }else{
      setchecked(false)
    }
  }, [checked,theme]) 


  return(
    <MainCon>
      <BottomCon>
        <NavCon>
              <Link href='/'>
                <h1 className='logo'><span className='span'>C</span>OD<span className='span'>E</span>   <span className='span'>H</span>ELPE<span className='span'>R</span></h1>
              </Link>
              <Rightmenu>
                  <label class="switch" >
                      <input type="checkbox" onClick={ChangeTheme} checked={checked} />
                      <span class="slider round"></span>
                  </label>
                  <button className='loginBtn'>Login</button>
                  <CustomMenu onClick={()=>{setBurgerstatus(true)}}/>
              </Rightmenu>
              <BurgerNav show={Burgerstatus}>
                  <Closewrapper >
                  <Customclose onClick={()=>setBurgerstatus(false)}/>
                  </Closewrapper>
                  <li><a href="#">IDE</a></li>
                  <li><a href="#">PROBLEMS</a></li>
                  <li><a href="#">BLOG SECTION</a></li>
              </BurgerNav>
          </NavCon>
      </BottomCon>
      <Banner />
      <div>
          <IDESectionContainer />
          <ProblemSectionCon />
      </div>
    </MainCon>
)}

export default Index;
