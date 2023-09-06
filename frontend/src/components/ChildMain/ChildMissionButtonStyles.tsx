import styled from "styled-components";
import mission from "../../asset/mission.png"

export const MissionContainer = styled.div`
    height: 27vh;
    width: 38vw;
    background-color: #FF8A3D;
    border-radius: 30px;
`;

export const MissionImg = styled.div`
    background-image: url(${mission});
    background-size: 100% 100%;
    height: 20vh;
    width: 20vh;
`