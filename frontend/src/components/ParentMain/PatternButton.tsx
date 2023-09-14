import React from 'react';
import { useNavigate } from "react-router-dom";
import {PatternButtonContainer,PatternImg,FontTag} from "./PatternButtonStyles"

const PatternButton = () => {
    const navigate = useNavigate();
    return (
        <PatternButtonContainer
        onClick={() => {
            navigate("/parent/pattern");
          }}>
            <PatternImg/>
            <FontTag>내 아이소비패턴</FontTag>
        </PatternButtonContainer>
    );
};

export default PatternButton;