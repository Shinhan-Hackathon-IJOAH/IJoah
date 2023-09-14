import React from 'react';
import { useNavigate } from "react-router-dom";
import { TradeListContainer,TradeImg,FontTag } from "./TradeListButtonStyles" 

const TradeListButton = () => {
    const navigate = useNavigate();
    return (
        <TradeListContainer
        onClick={() => {
            navigate("/parent/trade");
          }}>
            <TradeImg/>
            <FontTag>내 거래내역</FontTag>
        </TradeListContainer>
    );
};

export default TradeListButton;