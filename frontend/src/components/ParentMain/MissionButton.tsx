import React from 'react';
import { useNavigate } from "react-router-dom";
import {MissionListContainer,MissionListImg,FontTag} from "./MissionButtonStyles"

const MissionButton = () => {
    const navigate = useNavigate();
    return (
        <MissionListContainer
        onClick={() => {
            navigate("/parent/mission");
          }}>
        <MissionListImg/>
            <FontTag>부여한 미션</FontTag>
        </MissionListContainer>
    );
};

export default MissionButton;