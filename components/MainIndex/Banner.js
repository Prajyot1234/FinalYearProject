import React from 'react';
import styled from 'styled-components';

const Con = styled.div`
    position: relative;
    width: 98vw;
    height: fit-content;
    .bannerstyle{
        width: 96%;
        overflow-x: hidden!important;
        overflow-y: hidden;
        height: 650px;
        margin-left: auto;
        margin-right: auto;
    }
    @media screen and (max-width: 600px) {
        height: 400px;
    }
    span{
        color: #1BBE6D;
    }
`;

const InfoCon = styled.div`
    position: absolute;
    left: 20%;
    right: 20%;
    text-align: center;
    top: 25%;
    h1{
        letter-spacing: 3px;
        font-size: 45px;
        line-height: 1.3;
    }
    .center{
        margin:0 auto;
        width: fit-content;
    }
    .para{
        width: 80%;
        letter-spacing: 1.1;
        margin: 20px auto;
    }
    .btn{
        padding: 10px 20px;
        border-radius: 10px;
        border: none;
        background-color: #1BBE6D;
        color:  ${ props => props.theme.FontColor }; 
        margin-top: 20px;
        font-weight: 600;  
        box-shadow: rgb(81 115 145 / 40%) 0px 4px 0px;
        transition: 0.3s;
        &:hover{
            cursor: pointer;
            background-color: #57fca7;
            box-shadow: rgb(91 105 135 / 20%) 2px 4px 0px;
            transform: translateY(-2px);
        }
    }
    @media screen and (max-width: 1024px) {
        left: 5%;
        right: 5%;
        font-size: 15px;
    }
    @media screen and (max-width: 600px) {
        .btn{
            margin-top: 15px;
        }
        .para{
            width: 88%;
        }
        top: 70px;
        h1{
            font-size: 28px;
        }
    }
`;

function Banner() {
  return <Con>
      <img className='bannerstyle' src="/banner.svg" />
      <InfoCon>
            <div className='center'>
                <div>
                    <h1><span>T</span>h<span>e</span> DSA is Complex.</h1>
                    <h1>We make it <span>s</span>impl<span>e</span>.</h1>
                </div>
                <div className='para'>
                    <p>
                        This website will help people who are trying to learn data structure and algorithm,
                        in structured manner.
                    </p>
                    <button className='btn'>Sign up with Google</button>
                </div>
            </div>
      </InfoCon>
  </Con>;
}

export default Banner;
