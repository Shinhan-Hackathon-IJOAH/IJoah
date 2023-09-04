import React from 'react';
import { useNavigate } from "react-router-dom";

const GivMissionButton = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <button onClick={() => {
            navigate("/parent/givemission");
            }}>
                미션주기
            </button>
        </div>
    );
};

export default GivMissionButton;