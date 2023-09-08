import React from 'react';
import { useNavigate } from "react-router-dom";
import { GiveMoneyContainer } from "./GiveMoneyButtonStyles"

const GiveMoneyButton = () => {
    const navigate = useNavigate();
    return (
        <GiveMoneyContainer
        onClick={() => {
            navigate("/parent/givemoney");
          }}>
            용돈주기
        </GiveMoneyContainer>
    );
};

export default GiveMoneyButton;