import React,{ useState, useEffect } from 'react'
import styled from 'styled-components';

//icons
import AddIcon from '@mui/icons-material/Add';

//component's imports
import Card from './Card';
import Loading from '../../components/Loader/BigLoader'

//material Ui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

//import db instance
import { db } from "../../firebase"
import { addDoc, collection, serverTimestamp, orderBy, query  } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

//session provider
import { useSession } from "next-auth/react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    color: 'white',
    bgcolor:  "black",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

const Container = styled.div`
    color:  ${ props => props.theme.FontColor };
    background-color: ${ props => props.theme.backgroundColor }!important;
    .blogs_para{
        font-family: "poppins";
        margin-left: auto;
        margin-right: auto;
        width: 80%;
        max-width: 1240px;
        padding-left: 10px;
        margin-bottom: 10px;
    }
    @media only screen and (max-width: 768px) {
        .blogs_para{
            margin-bottom: 5px;
            width: 90%;
        }
    }
`;

const CContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    max-width: 1240px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 6px;
    border-radius: 10px;
    font-family: 'poppins';
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    .container_h2{
        font-size: 22px;
        font-weight: 600;
        margin-left: 20px;
        padding: 20px;
    }
    @media only screen and (max-width: 768px) {
        width: 90%;
        .container_h2{
            font-size: 16px;
        }
    }
   
    .container_btn{
        height: min-content;
        margin-right: 40px;
        margin-top: auto;
        margin-bottom: auto;
        padding: 10px 50px;
        outline: none;
        border: none;
        vertical-align: center;
        text-transform: uppercase;
        background-color: #fff;
        border: none;
        border-radius: 45px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 6px;
        transition: all 0.3s ease 0s;
        cursor: pointer;
        outline: none;

        &:hover{
            background-color: #2EE59D;
            box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
            color: #fff;
            transform: translateY(-7px);
        }
    }
    @media only screen and (max-width: 500px) {
        width: 90%;
        .container_h2{
            font-size: 14px;
        }
        .container_btn{
            padding: 10px 40px;
        }
    }
`;

const BlogContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    max-width: 1240px;
    padding: 5px;
    border-radius: 10px;
    font-family: 'poppins';
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: grid;
    grid-template-columns: repeat(4, auto);
    padding: 20px;
    gap: 30px;
    @media only screen and (max-width: 1080px) {
        width: 90%;
        grid-template-columns: repeat(3, auto);
        gap: 50px;
    }
    @media only screen and (max-width: 768px) {
        grid-template-columns: repeat(2, auto);
        gap: 20px;
    }
    @media only screen and (max-width: 500px) {
        grid-template-columns: repeat(1, auto);
        gap: 30px;
    }
`;

const InfoContainer = styled.div`
    font-family: 'poppins';
    .flex{
        display: flex;
    }
    @media only screen and (max-width: 768px) {
        text-align: center;
        .flex{
            flex-direction: column ;
        }
    }
    ._input{
        outline: none;
        margin-left: 10px;
        width: 80%;
        padding: 3px;
    }
    .top_margin{
        margin-top: 10px;
    }
    .container_btn{
        margin-top: 10px;
        padding: 5px 20px;
        border-radius: 10px;
        outline: none;
        border: none;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .para{
        text-align: center;
        margin-bottom: 10px;
    }
    .container_btn:hover{
        cursor: pointer;
    }
`;

function Banner() {

  const { data: session } = useSession();

  //db data
  const [ value ,loading ] = useCollection(query(collection(db, 'blogUsers'), orderBy("timestamp", "desc")))
  
  const [Udata, setUdata] = useState();

  let dataArr = [];

  useEffect(() => {
    setUdata(value);
  }, [value]);

  Udata?.forEach((doc) => {
    const ndata = {
        ...doc.data(),
        id : doc.id,
    }
    console.log(doc.id);
    dataArr.push(ndata);
  });

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [input, setinput] = useState("");

  const createBlog = async (e) => {
    e.preventDefault();

    if(!input){return;}

    await addDoc(collection(db, "blogUsers"),{
        fileName : input,
        userImg: session.user.image,
        userName: session.user.name,
        timestamp: serverTimestamp()
    });

    setinput('');
    handleClose();
  }

  return (
    <Container>
        <CContainer>
            <h2 className='container_h2'>Create New Blog</h2>
            <button onClick={handleOpen} className='container_btn'><AddIcon /></button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <InfoContainer>
                        <form>
                            <p className='para'>Add Title</p>
                            <div className='flex'>
                                <p>Title : </p>
                                <input className='_input' spellCheck="false" value={input} onChange={ e => setinput(e.target.value)} placeholder='add title' required />
                            </div>
                            <button type='submit' onClick={createBlog} className='container_btn'>Submit</button>
                        </form>
                    </InfoContainer>
                </Box>
            </Modal>
        </CContainer>
        <p className='blogs_para'>Blogs :- </p>
        <BlogContainer>
            {
               dataArr && dataArr.map((doc) => {
                    return <Card id={doc.id} fileName={doc.fileName} userName={doc.userName} userImg={doc.userImg} /> 
               })
            }
        </BlogContainer>
    </Container>
  )
}

export default Banner;