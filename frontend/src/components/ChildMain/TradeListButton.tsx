import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {TradeContainer,TradeImg,FontTag} from "./TradeListButtonStyles"

const TradeListButton = () => {
  const navigate = useNavigate();
  return (
    <TradeContainer
    onClick={() => {
      navigate("/child/trade");
    }}>
      
      <TradeImg/>
        <FontTag>내 거래 내역</FontTag> 
    </TradeContainer>
  );
};

export default TradeListButton;
