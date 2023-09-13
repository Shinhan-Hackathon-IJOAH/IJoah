import styled from "styled-components";
import write from "../../asset/write.png"

export const WriteContainer = styled.div`
    height: 27vh;
    width: 38vw;
    background-color: #F8A70C;
    border-radius: 30px;
    font-family: 'HSYuji-Regular';
    display:flex;
    
`;

export const WriteImg = styled.div`
    background-image: url(${write});
    background-size: 100% 100%;
    height: 20vh;
    width: 20vh;
    position:absoulte;
    top: 5%;
`