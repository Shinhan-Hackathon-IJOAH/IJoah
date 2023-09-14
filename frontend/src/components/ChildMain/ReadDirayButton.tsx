import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ReadContainer,DiaryImg,FontTag } from "./ReadDiaryButtonStyles"

const ReadDirayButton = () => {
  const navigate = useNavigate();
  return (
    <ReadContainer
    onClick={() => {
      navigate("/child/diary");
    }}>
      <DiaryImg/>
      <FontTag>일기 읽기</FontTag>
    </ReadContainer>
  );
};

export default ReadDirayButton;
