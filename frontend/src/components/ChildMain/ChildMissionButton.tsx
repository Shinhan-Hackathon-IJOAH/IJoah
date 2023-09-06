import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {MissionContainer,MissionImg} from "./ChildMissionButtonStyles"

const ChildMissionButton = () => {
  const navigate = useNavigate();
  return (
    <MissionContainer
    onClick={() => {
      navigate("/child/mission");
    }}>
      <MissionImg/>
        내 미션 확인하기
      
    </MissionContainer>
  );
};

export default ChildMissionButton;
