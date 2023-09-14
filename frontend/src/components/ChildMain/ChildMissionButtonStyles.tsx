import styled from "styled-components";
import mission from "../../asset/mission.png"

export const MissionContainer = styled.div`
    height: 31vh;
    width: 100%;
    background-color: #FF8A3D;
    border-radius: 30px;
    font-family: 'HSYuji-Regular';
    display:flex;
    flex-direction: column;
    align-items: center;
`;

export const MissionImg = styled.div`
    background-image: url(${mission});
    background-size: 100% 100%;
    height: 70%;
    width: 70%;
    margin-top:10px;
`
export const FontTag = styled.div`
    font-family: 'HSYuji-Regular';
    height: 23%;
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    
`