import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDiaryStore } from "../../store/DiaryStore";
import axios from "axios";
const BottomButton = () => {
  const { title, content, date, weatherMood, picture, voice, file } =
    useDiaryStore();
  const navigate = useNavigate();

  const writeDiary = () => {
    const formData = new FormData();
    const info = {
      memberId: "1",
      title: title,
      emotion: weatherMood,
      content: content,
      date: date,
    };
    formData.append(
      "info",
      new Blob([JSON.stringify(info)], { type: "application/json" })
    );

    for (let i = 0; i < file.length; i++) {
      const a = file[i]; // 각 파일은 file 객체입니다.
      console.log(a);
      formData.append("images", a);
    }
    const voiceBlob = new Blob([voice]);
    formData.append("record", voiceBlob);
    console.log(formData);

    axios
      .post("https://ijoah01.duckdns.org/api/diaries/", formData)
      .then((response: any) => {
        console.log("성공");
        console.log(response.blob);
      })
      .catch((error: any) => {
        console.log("제목", title, typeof title);
        console.log("내용", content, typeof content);
        console.log("날짜", date, typeof date);
        console.log("기분", weatherMood, typeof weatherMood);
        console.log("사진", file, typeof picture);
        console.log("음성", voice, typeof voice);

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
