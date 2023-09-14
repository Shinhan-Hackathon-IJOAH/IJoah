import React from 'react';
import { useNavigate } from "react-router-dom";
import { GiveMissionContainer,GiveMissionImg,FontTag } from "./GiveMissionButtonStyles"
import {useSelectChildStore} from '../../store/SelectChildStore'

const GivMissionButton = () => {
    const navigate = useNavigate();

    return (
        <GiveMissionContainer
        onClick={() => {
            navigate("/parent/givemission");
            }}>
            <GiveMissionImg/>
            <FontTag>미션주기</FontTag>
        </GiveMissionContainer>
    );
};

export default GivMissionButton;