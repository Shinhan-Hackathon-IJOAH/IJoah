import styled from "styled-components";
import landing from "../../asset/background/landing.gif"

export const LandingContent = styled.div`
    display : flex;
    justify-content: center;
    background-color : #F8A70C;
    
`
export const LandingImg = styled.div`
    background-image: url(${landing});
    background-size: 100% 100%;
    height: 100vh;
    width: 48vh;
`