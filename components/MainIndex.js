import React from 'react';
import styled from 'styled-components';

//redux
import { useSelector, useDispatch } from 'react-redux'

//component's import's
import Index from './MainIndex/Index';

const MCon = styled.div`

`

function MainIndex() {
  

  return <MCon>
      <Index />
  </MCon>;
}

export default MainIndex;
