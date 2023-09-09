import React from 'react';
import { useNavigate } from "react-router-dom";
import { TradeListContainer } from "./TradeListButtonStyles" 

const TradeListButton = () => {
    const navigate = useNavigate();
    return (
        <TradeListContainer
        onClick={() => {
            navigate("/parent/trade");
          }}>
            거래내역
        </TradeListContainer>
    );
};

export default TradeListButton;