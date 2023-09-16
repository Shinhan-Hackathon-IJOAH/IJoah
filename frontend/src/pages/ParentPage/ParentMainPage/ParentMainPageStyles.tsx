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
    height: 36vh;
    width: 100%;   
`

export const SideButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width:48%;
`

export const ButtonColum = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: absolute;   
    top: 10%;
    height: 76vh;
    width:330px; 
`