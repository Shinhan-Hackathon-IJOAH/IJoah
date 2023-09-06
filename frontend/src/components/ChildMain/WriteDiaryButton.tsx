import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {WriteContainer,WriteImg} from "./WriteDiaryButtonStyles"
const WriteDiaryButton = () => {
  const navigate = useNavigate();
  return (
    <WriteContainer
    onClick={() => {
      navigate("/child/write");
    }}>
      용돈일기장 쓰기
      <WriteImg/>
    </WriteContainer>
  );
};

export default WriteDiaryButton;
