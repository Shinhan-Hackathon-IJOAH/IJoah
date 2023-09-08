import React from 'react';
import { useNavigate } from "react-router-dom";
import { GiveMoneyContainer } from "./GiveMoneyButtonStyles"
import {useSelectChildStore} from '../../store/SelectChildStore'

const GiveMoneyButton = () => {
    const navigate = useNavigate();
    const {childname}=useSelectChildStore();
    return (
        <GiveMoneyContainer
        onClick={() => {
            navigate("/parent/givemoney");
          }}>
            {childname}에게 용돈주기
        </GiveMoneyContainer>
    );
};

export default GiveMoneyButton;