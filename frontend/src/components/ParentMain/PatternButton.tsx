import React from 'react';
import { useNavigate } from "react-router-dom";
import {PatternButtonContainer} from "./PatternButtonStyles"

const PatternButton = () => {
    const navigate = useNavigate();
    return (
        <PatternButtonContainer
        onClick={() => {
            navigate("/parent/pattern");
          }}>
            내아이소비패턴
        </PatternButtonContainer>
    );
};

export default PatternButton;