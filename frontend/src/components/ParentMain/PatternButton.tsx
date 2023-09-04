import React from 'react';
import { useNavigate } from "react-router-dom";

const PatternButton = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button
            onClick={() => {
                navigate("/parent/pattern");
              }}>
                내아이소비패턴
            </button>
        </div>
    );
};

export default PatternButton;