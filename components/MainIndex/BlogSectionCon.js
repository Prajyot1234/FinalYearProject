import React from 'react'
import styled from 'styled-components';

import Link from 'next/link';

//icons's
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Con = styled.div`
    margin-top: 120px;
    text-align: center;
    h1{
        font-size: 18px;
        color: #0fca69;
        font-weight: 600;
    }
    span{
        color: #1BBE6D;
    }
    .ide_para{
        width: 30%;
        margin: 10px auto;
        font-weight: 600;
        font-size: large;
    }
    ._icon{
        font-size: 28px;
        position: relative;
        top: 6px;
    }
    ._h1{
        font-size: 20px;
        display: block;
        width: fit-content;
        margin: auto;
        margin-top: 25px;
        padding-left: 25px;
    }
    ._h1:hover{
        cursor: pointer;
        transform: translateY(-3px);
        transition: transform 500ms;
    }
    @media screen and (max-width: 900px) {
        margin-top: 60px;
        .ide_para{
            width: 80%;
        }
    }
`;

const DesCon = styled.div`
    width: 80%;
    max-width: 1240px;
    margin: 40px auto;
`;

const PointsCon = styled.div`
    display: flex;
    width: 55%;
    margin: 15px auto;
    ._num{
        background-color: #7ee8fa;
        display: block;
        background-image: linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%);
        padding: 6px;
        border-radius: 35%;
    }
    ._info{
        text-align: left;
        margin-left: 10px;
    }
    .num_con{
        margin: auto;
    }
    @media screen and (max-width: 900px) {
        flex-direction: column;
        width: 85%;
        ._info{
            text-align: center;
        }
    }
`;

function BlogSectionCon() {
  return (
    <Con>
        <div>
            <h1>Blog Section?</h1>
            <p className='ide_para'>In this Section community will try to give the informative blogs on computer science & related subject for students.</p>
        </div>
        <DesCon>
            <PointsCon>
                <div className='num_con'>
                    <p className='_num'>1.</p>
                </div> 
                <p className='_info'>Students can post informative blogs about AI/ML/Artifical intelligence/Data structure Algorithm etc.</p>
            </PointsCon>
            <PointsCon>
                <div className='num_con'>
                    <p className='_num'>2.</p>
                </div> 
                <p className='_info'>Students gets so much information about specific topic using this section and and people can able to form community . </p>
            </PointsCon>
        </DesCon>
        <Link href='/blog' as={`/blog   `}>
            <h1 className='_h1'>Visit Our Blog Section<ChevronRightIcon className='_icon' /></h1>
        </Link>
    </Con>
  )
}

export default BlogSectionCon;