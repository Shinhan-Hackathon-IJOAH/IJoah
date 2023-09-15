import styled from "styled-components";
import detail from '../../../asset/missiondetail.png'

export const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
`
export const FontTag = styled.div`
    font-family: 'HSYuji-Regular';
    font-size: 14px;
    margin-top: 3px;
    margin-top: 45px;
    margin-left: 45px;
`
export const MiniTitle = styled.div`
    font-family: 'HSYuji-Regular';
    font-size: 18px;
    margin-top: 35px;
    margin-left: 45px;
    width:78%
`

export const Title = styled.div`
    font-family: 'HSYuji-Regular';
    font-size: 30px;
    margin-top: 40px;
`
export const BackGroundContainer = styled.div`
background-image: url(${detail});
background-size: 100% 100%;
height: 70vh;
width: 50vh;
margin-top:5px;
`