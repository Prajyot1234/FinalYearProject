import React from 'react'
import styled from "styled-components";
import { useRouter } from 'next/router'

const CardContainer = styled.div`
    /* border: 1px solid gray; */
    overflow: hidden;
    border-radius: 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .card_img{
      width: 100%;
      height: 150px;
      object-fit: cover;
  }
  &:hover{
    cursor: pointer;
  }

  &:hover .card_img{
    transform: scale(1.02);
    transition: all .1s ease-in-out;
  }

`;

const InfoContainer = styled.div`
  padding: 7px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  .container{
    width: 84%;
  }
  .container_img{
    border-radius: 50%;
    height: 25px;
    width: 25px;
    margin-right: 2%;
    margin-top: 2%;
  }
  .container_img:hover{
    cursor: pointer;
    transform: scale(0.88);
    transition: all .2s ease-in-out;
  }
  .title{
    font-weight: 700;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .description{
    font-size: 11px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function CardG({ id, fileName, userName, userImg }) {
  const router = useRouter();

  return (
    <CardContainer onClick={() => router.push(`/blog/global/${id}`)}>
        <img src={`https://picsum.photos/200/300?grayscale/${id}`} alt="img" className='card_img' />
        <InfoContainer>
            <div className='container'>
                <p className='title'>{fileName}</p>
                <p className='description'>Given Blog is written by {userName}</p>
            </div>
            <img src={userImg} alt="author image" className='container_img' />
        </InfoContainer>
    </CardContainer>
  )
}

export default CardG;