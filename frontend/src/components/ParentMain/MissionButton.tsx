import React from 'react';
import { useNavigate } from "react-router-dom";
import {MissionListContainer} from "./MissionButtonStyles"

const MissionButton = () => {
    const navigate = useNavigate();
    return (
        <MissionListContainer
        onClick={() => {
            navigate("/parent/mission");
          }}>
            부여한 미션내역
        </MissionListContainer>
    );
};

export default MissionButton;