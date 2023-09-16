import styled from "styled-components";
import diary from "../../asset/diary.png"

export const ReadContainer = styled.div`
    height: 17vh;
    width: 100%;
    background-color: #FFB4A3;
    border-radius: 30px;
    font-family: 'HSYuji-Regular';
    display:flex;
    flex-direction: column;
`;
export const DiaryImg = styled.div`
    background-image: url(${diary});
    background-size: 100% 100%;
    height: 60%;
    width: 85%;
    margin-left: 5px;
    margin-top: 10px;;
`

export const FontTag = styled.div`
    font-family: 'HSYuji-Regular';
    height: 28%;
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    margin-left: 65px;
`