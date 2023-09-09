import React from 'react';
import { useNavigate } from "react-router-dom";
import { GiveMissionContainer } from "./GiveMissionButtonStyles"
import {useSelectChildStore} from '../../store/SelectChildStore'

const GivMissionButton = () => {
    const navigate = useNavigate();
    const {childname}=useSelectChildStore();

    return (
        <GiveMissionContainer
        onClick={() => {
            navigate("/parent/givemission");
            }}>
            {childname}에게 미션주기
        </GiveMissionContainer>
    );
};

export default GivMissionButton;