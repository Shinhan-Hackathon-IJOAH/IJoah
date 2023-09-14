import styled from "styled-components";
import write from "../../asset/write.png"

export const WriteContainer = styled.div`
    height: 31vh;
    width: 100%;
    background-color: #F8A70C;
    border-radius: 30px;
    font-family: 'HSYuji-Regular';
    display:flex;
    flex-direction: column;
    align-items: center;
`;

export const WriteImg = styled.div`
    background-image: url(${write});
    background-size: 100% 100%;
    height: 70%;
    width: 70%;
`
export const FontTag = styled.div`
    font-family: 'HSYuji-Regular';
    height: 20%;
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    margin-top: 10px;
`