import React,{ useEffect, useState } from 'react';
import Link from 'next/link';
import styled,{ ThemeProvider }  from 'styled-components'
import { lightTheme, darkTheme } from '../../config/themeConfig'
import { useSelector } from 'react-redux'

//components imports
import Navbar from '../../components/Blog/Navbar'

// Connect to server
import axios from "axios";

const DSAContainer = styled.div`
   color:  ${ props => props.theme.FontColor };
   background-color: ${ props => props.theme.backgroundColor };
   font-family: 'poppins';
   padding-bottom: 20px;
`;

const DSAInfoContainer = styled.div`
  width: 90%;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding-bottom: 20px;
`;

const Con = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-top: 20px;
  border-radius: 10px;
  padding: 20px;
`;

const ProblemSection = styled.div`
  width: 90%;
  max-width: 1240px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 20px;
  table{
    width: 100%;
  }
  .sr_no{
    width: 10%;
  }
  .title{
    text-align: left;
  }
  .index{
    text-align: center;
  }
  .title:hover{
    cursor: pointer;
  }
`;

const URL =
    process.env.NODE_ENV == "development"
        ? "http://localhost:3002/problems"
        : "https://outrageous-yak-pleat.cyclic.app/problems"; 

function index() {
  const theme = useSelector((state)=> state.theme);

  const [problems, setproblems] = useState();

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
          setproblems(response?.data?.data);
      })
  }, []);
  console.log(problems);
  
  return (
    <ThemeProvider theme={ theme === "light" ? lightTheme : darkTheme }>
      <DSAContainer>
        <Navbar />
        <DSAInfoContainer>
          <Con>
            <h1>Data Structure and Algorithm Problems.</h1>
            <p>Problem Section where you can find variety of DSA question.</p>
          </Con>
        </DSAInfoContainer>
        <ProblemSection>
          <table>
            <tr>
              <th className='sr_no'>Sr.No</th>
              <th className='title'>Title</th>
            </tr>
            {
              problems && problems.map((problem,index) => (<tr className='problem_tr'>
                <td className='index'>{index+1}</td>
                <Link href={`/dsa/${problem._id}`}>
                  <td className='title'>{problem?.title}</td>
                </Link>
              </tr>))
            }
          </table>
        </ProblemSection>
      </DSAContainer>
    </ThemeProvider>
  )
}

export default index;