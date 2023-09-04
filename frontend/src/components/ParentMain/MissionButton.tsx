import React from 'react';
import { useNavigate } from "react-router-dom";

const MissionButton = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button
            onClick={() => {
                navigate("/parent/mission");
              }}>
                부여한 미션내역
            </button>
        </div>
    );
};

export default MissionButton;