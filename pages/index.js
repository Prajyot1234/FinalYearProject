import styled, { ThemeProvider } from 'styled-components'

//dark-light theme
import { lightTheme, darkTheme } from '../config/themeConfig'

//redux
import { useSelector } from 'react-redux'

//component's imports 
import MainIndex from '../components/MainIndex';

const Container = styled.div`
  color:  ${ props => props.theme.FontColor };
  background-color: ${ props => props.theme.backgroundColor };
  font-family: 'Poppins';
`;

export default function Home() {  
  const theme = useSelector((state)=> state.theme); 

  return (
  <ThemeProvider theme={ theme === "light" ? lightTheme : darkTheme }>
    <Container>
      <MainIndex />
    </Container>
  </ThemeProvider>
  )
}
