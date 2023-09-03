import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const WriteDiaryButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        color="red"
        onClick={() => {
          navigate("/child/write");
        }}
      >
        용돈일기장 쓰기
      </Button>
    </div>
  );
};

export default WriteDiaryButton;
