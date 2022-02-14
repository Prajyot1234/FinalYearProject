import { createGlobalStyle} from "styled-components"

export const lightTheme = {
    FontColor : "black",
    backgroundColor : "white"
}

export const darkTheme = {
    FontColor : "white",
    backgroundColor : "#212121"
}

export const GlobalStyles = createGlobalStyle`
  * {
    background-color : ${ props => props.theme.backgroundColor };
    color : ${ props => props.theme.FontColor };
    font-family: 'Poppins', sans-serif;
  }
`