import React from 'react';
import { useNavigate } from "react-router-dom";
import { GiveMissionContainer } from "./GiveMissionButtonStyles"

const GivMissionButton = () => {
    const navigate = useNavigate();
    
    return (
        <GiveMissionContainer
        onClick={() => {
            navigate("/parent/givemission");
            }}>
            미션주기
        </GiveMissionContainer>
    );
};

export default GivMissionButton;