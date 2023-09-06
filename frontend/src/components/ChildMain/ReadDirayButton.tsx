import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ReadContainer,DiaryImg } from "./ReadDiaryButtonStyles"

const ReadDirayButton = () => {
  const navigate = useNavigate();
  return (
    <ReadContainer
    onClick={() => {
      navigate("/child/diary");
    }}>
      <DiaryImg/>
      일기 읽기
    </ReadContainer>
  );
};

export default ReadDirayButton;
