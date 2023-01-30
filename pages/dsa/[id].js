import React,{ useState, useEffect } from 'react';
import { useRouter } from 'next/router'

//theme
import styled,{ ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../config/themeConfig';
import { useSelector } from 'react-redux';

//components imports
import Navbar from '../../components/Blog/Navbar';

// Connect to server
import axios from "axios";

const ProblemContainer = styled.div`
  color:  ${ props => props.theme.FontColor };
  background-color: ${ props => props.theme.backgroundColor };
  font-family: 'poppins';
  padding-bottom: 20px;
`;

const DescriptionContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 90%;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  border-radius: 10px;
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
  h2{
    text-align: center;
  }
  .statement_para{
    padding: 20px 50px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 10px;
    margin-top: 20px;
  }
  .problem_statement{
    font-weight: 600;
    margin-top: 10px;
  }
  .problem_testcases{
    margin-top: 30px;
    font-weight: 600;
  }
  .btn{
    margin-top: 30px;
    padding: 10px 50px;
    outline: none;
    border: none;
    text-transform: uppercase;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: all 0.3s ease 0s;
    cursor: pointer;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .btn:hover{
    background-color: #2EE59D;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;

const TestcaseContainer = styled.div`

`;

const InnerContainer = styled.div`
  padding: 20px 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  margin-top: 10px;
`;

const URL =
    process.env.NODE_ENV == "development"
        ? "http://localhost:3002/problems/withId"
        : "https://outrageous-yak-pleat.cyclic.app/problems/withId"; 

function Problem() {
  //theme
  const theme = useSelector((state)=> state.theme);

  //problem data
  const [problem, setproblem] = useState();

  //getting ID
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => { 
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      params: {
          "id": id
      }
    }
    axios
      .post(URL,config)
      .then((response) => {
        console.log(response);  
        setproblem(response?.data?.data);
      })
    
  }, [id]);

  const solve = () => {
    router.push(`/dsa/solve/${id}`);
  }

  return (
    <ThemeProvider theme={ theme === "light" ? lightTheme : darkTheme }>
      <ProblemContainer>
        <Navbar />
        <DescriptionContainer>
            <h2>{problem?.title}</h2>
            <p className='problem_statement'>Problem Statement :-</p>
            <p className='statement_para'>{problem?.statement}</p>
            {
              problem && problem?.testcases.map((testcase,index) => (
                <TestcaseContainer>
                  <p className='problem_testcases'>Test Cases {index+1} :- </p>
                  <InnerContainer>
                      <p>testcaseLength : {testcase?.testcaselength}</p>
                      <p>testcase : {testcase?.testcase}</p>
                      <p>output : {testcase?.output}</p>
                  </InnerContainer>
                </TestcaseContainer>
              ))
            }
            <button className='btn' onClick={solve}>Solve</button>
        </DescriptionContainer>
      </ProblemContainer>
    </ThemeProvider>
  )
}

export default Problem;