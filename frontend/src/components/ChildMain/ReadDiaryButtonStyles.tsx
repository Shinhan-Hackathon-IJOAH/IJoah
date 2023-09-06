import styled from "styled-components";
import diary from "../../asset/diary.png"

export const ReadContainer = styled.div`
    height: 20vh;
    width: 38vw;
    background-color: #FFB4A3;
    border-radius: 30px;
`;
export const DiaryImg = styled.div`
    background-image: url(${diary});
    background-size: 100% 100%;
    height: 20vh;
    width: 20vh;
`