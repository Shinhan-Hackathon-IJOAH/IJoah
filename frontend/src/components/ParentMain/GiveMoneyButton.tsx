import React from 'react';
import { useNavigate } from "react-router-dom";

const GiveMoneyButton = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button
            onClick={() => {
                navigate("/parent/givemoney");
              }}>
                용돈주기
            </button>
        </div>
    );
};

export default GiveMoneyButton;