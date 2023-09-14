import styled from "styled-components";
import pattern from '../../asset/pattern.png'

export const PatternButtonContainer = styled.div`
    height: 17vh;
    width: 100%;
    background-color: #FF8A3D;
    border-radius: 30px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
`;

export const PatternImg = styled.div`
    background-image: url(${pattern});
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