import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {TradeContainer,TradeImg} from "./TradeListButtonStyles"

const TradeListButton = () => {
  const navigate = useNavigate();
  return (
    <TradeContainer
    onClick={() => {
      navigate("/child/trade");
    }}>
      <TradeImg/>
        내 거래 내역
    </TradeContainer>
  );
};

export default TradeListButton;
