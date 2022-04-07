import React from 'react';
import styled from 'styled-components';

//spinner
import { Circle } from "better-react-spinkit";

//redux
import { useSelector } from 'react-redux'

const SPCon = styled.div`
    width: 98vw;
    height: 98vh;
    margin: auto;
    color:  green;
    background-color: ${ props => props.theme.backgroundColor };
    font-family: 'Poppins';
    position: relative;
`; 

const CenterCon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
`;

function BigLoader() {
  const theme = useSelector((state)=> state.theme);
  
  return (
    <SPCon>
        <CenterCon>
            <div  className="circle">
              <Circle size={50} color={"#212121"} />
            </div>
        </CenterCon>
    </SPCon>
  )
}

export default BigLoader;
