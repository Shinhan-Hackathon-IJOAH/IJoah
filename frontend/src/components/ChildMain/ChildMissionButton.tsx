import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {MissionContainer,MissionImg,FontTag} from "./ChildMissionButtonStyles"

const ChildMissionButton = () => {
  const navigate = useNavigate();
  return (
    <MissionContainer
    onClick={() => {
      navigate("/child/mission");
    }}>
      <MissionImg/>
      <FontTag>내 미션 확인하기</FontTag>  
      
    </MissionContainer>
  );
};

export default ChildMissionButton;
