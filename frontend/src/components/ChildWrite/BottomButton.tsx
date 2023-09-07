import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDiaryStore } from "../../store/DiaryStore";
import axios from "axios";
const BottomButton = () => {
  const { title, content, date, weatherMood, picture, voice } = useDiaryStore();
  const navigate = useNavigate();

  const writeDiary = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        memberId: 1,
        title: title,
        emotion: weatherMood,
        content: content,
        date: date,
        record: null,
        photo: picture,
      })
      .then((response: any) => {
        console.log("성공");

        console.log(response.data);
      })
      .catch((error: any) => {
        console.log("되겠냐");
        console.log(error);
      });
  };
  return (
    <div className="mt-10 flex justify-center gap-4">
      <Button
        onClick={() => {
          writeDiary();
        }}
        className="bg-[#FF8A3D]"
      >
        일기 쓰기
      </Button>
      <Button
        className="bg-[#F8A70C]"
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로 가기
      </Button>
    </div>
  );
};

export default BottomButton;
