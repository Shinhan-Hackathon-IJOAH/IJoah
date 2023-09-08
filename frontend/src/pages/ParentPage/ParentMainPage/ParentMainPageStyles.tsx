import styled from "styled-components";
import logo from "../../../asset/logo.png"

export const ParentMainPageContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
`

export const Logo = styled.div`
    background-image: url(${logo});
    background-size: 100% 100%;
    height: 5vh;
    width: 12vh;
    position: absolute;
    top: 2%;
    left: 4%;
`
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 38vh;
    width: 80vw;   
`

export const SideButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

export const ButtonColum = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: absolute;   
    top: 26%;
    height: 62vh;
    width: 80vw; 
`