import React from 'react';
import { useNavigate } from "react-router-dom";

const TradeListButton = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button
            onClick={() => {
                navigate("/parent/trade");
              }}>
                거래내역
            </button>
        </div>
    );
};

export default TradeListButton;