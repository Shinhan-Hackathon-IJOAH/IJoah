import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {WriteContainer,WriteImg,FontTag} from "./WriteDiaryButtonStyles"
const WriteDiaryButton = () => {
  const navigate = useNavigate();
  return (
    <WriteContainer
    onClick={() => {
      navigate("/child/write");
    }}>
      <FontTag>용돈일기장 쓰기</FontTag>
      <WriteImg/>
    </WriteContainer>
  );
};

export default WriteDiaryButton;
