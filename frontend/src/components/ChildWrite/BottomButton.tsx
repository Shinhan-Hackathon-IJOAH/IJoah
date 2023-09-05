import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDiaryStore } from "../../store/DiaryStore";
const BottomButton = () => {
  const { title, content, date, weatherMood, picture, voice } = useDiaryStore();
  const navigate = useNavigate();

  return (
    <div>
      <Button>일기 등록하기</Button>
      <Button
        onClick={() => {
          console.log(title);
          console.log(content);
          console.log(date);
          console.log(weatherMood);
          console.log(picture);
          console.log(voice);

          navigate(-1);
        }}
      >
        뒤로 가기
      </Button>
    </div>
  );
};

export default BottomButton;
