import styled from "styled-components";
import missionlist from '../../asset/missionlist.png'
export const MissionListContainer = styled.div`
    height: 17vh;
    width: 100%;
    background-color: #FFB4A3;
    border-radius: 30px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
`;
export const MissionListImg = styled.div`
    background-image: url(${missionlist});
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