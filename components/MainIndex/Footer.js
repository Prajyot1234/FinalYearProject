import React from 'react'
import styled from "styled-components";

//icon's
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FavoriteIcon from '@mui/icons-material/Favorite';

const FooterCon = styled.div`
    padding-top: 60px;
    ._hr{
       width : 5%;
        margin-left: auto;
        margin-right: auto;
        border-style: dotted;
        font-size: large;
        border-width: 9px;
        border-bottom: none;
        color:  ${ props => props.theme.FontColor }; 
    }
    .footer_h3{
        font-weight: 600;
        margin-top: 50px;
        font-size: 25px;
        /* padding-bottom: 10px; */
        text-align: center;
    }
    .heart_icon{
        animation: pound .35s infinite alternate;
        -webkit-animation: pound .35s infinite alternate;
        color: red;
    }
    .footer_para{
        text-align: center;
        padding-bottom: 5px;
    }
    .footer_date{
        font-size: 14px;
        text-align: center;
        padding-bottom: 30px;
    }

    @media screen and (max-width: 900px) {
        padding-top: 10px;
    }
`;


const MContainer = styled.div`
    .Contact_h2{
        font-size: 25px;
        font-weight: 600;
        margin-top: 60px;
        margin-bottom: 30px;
        text-align: center;
        color: #1BBE6D;
    }
`;

const ContactContainer = styled.div`
 
   .wrap {
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
    }
    
    .button {
        margin-top: 10px;
        vertical-align: center;
        width: 50px;
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
        border-radius: 45px;
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

`;


function Footer() {
  let date = new Date().getUTCFullYear();

  return (
    <FooterCon>
        {/* <hr className='_hr'/> */}
        <MContainer>
            <h2 className="Contact_h2">
                <span className="Color">C</span>ontact M<span className="Color">e</span>
            </h2>
            <ContactContainer>
                <a href="https://www.instagram.com/prajyot_burbure/" target="_blank">
                    <div class="wrap" >
                        <button class="button">
                                <InstagramIcon className="insta_icon" />
                        </button>
                    </div>
                </a>
                <a href="https://github.com/Prajyot1234" target="_blank">
                    <div class="wrap" >
                        <button class="button">
                                <GitHubIcon  className="git_icon" />
                        </button>
                    </div>
                </a>
                <a href="https://www.linkedin.com/in/prajyot-burbure-6b8643190/" target="_blank">
                    <div class="wrap" >
                        <button class="button">
                                <LinkedInIcon className="linked_icon" />
                        </button>
                    </div>
                </a>
            </ContactContainer>
        </MContainer>
        <h3 className='footer_h3'>Made With <FavoriteIcon className='heart_icon' /> in India</h3>
        <p className='footer_para'>By <a href="https://www.linkedin.com/in/prajyot-burbure-6b8643190/">Prajyot Burbure</a></p>
        <p className='footer_date'>&copy;{` ${date-1}-${date}`}</p>
    </FooterCon>
  )
}

export default Footer;