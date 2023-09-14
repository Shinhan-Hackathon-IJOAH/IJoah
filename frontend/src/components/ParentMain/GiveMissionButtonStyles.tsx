import styled from "styled-components";
import givemission from "../../asset/givemission.png"
export const GiveMissionContainer = styled.div`
    height: 17vh;
    width: 100%;
    background-color: #F8A70C;
    border-radius: 30px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
`;

export const GiveMissionImg = styled.div`
    background-image: url(${givemission});
    background-size: 100% 100%;
    height: 60%;
    width: 65%;
`
export const FontTag = styled.div`
    font-family: 'HSYuji-Regular';
    height: 23%;
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    
`