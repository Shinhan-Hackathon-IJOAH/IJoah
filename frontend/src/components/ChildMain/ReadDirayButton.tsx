import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const ReadDirayButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => {
          navigate("/child/diary");
        }}
        color="green"
      >
        일기 읽기
      </Button>
    </div>
  );
};

export default ReadDirayButton;
