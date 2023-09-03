import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const ChildMissionButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/child/mission");
        }}
      >
        내 미션 확인하기
      </Button>
    </div>
  );
};

export default ChildMissionButton;
