import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const TradeListButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => {
          navigate("/child/trade");
        }}
        color="green"
      >
        내 거래 내역
      </Button>
    </div>
  );
};

export default TradeListButton;
