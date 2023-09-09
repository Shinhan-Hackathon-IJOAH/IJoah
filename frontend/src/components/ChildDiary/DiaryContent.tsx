import React, { useEffect, useState } from "react";
import { Avatar, Typography } from "@material-tailwind/react";
// import {Diary} from './DiaryContentStyles'
import axios from "axios";
interface DiaryContentProps {
  selectdate: string;
  diaryId: string;
}

const DiaryContent: React.FC<DiaryContentProps> = ({ selectdate, diaryId }) => {
  const [diary, setDiary] = useState<any>([]);

  // diaryId 값이 바뀔 때마다 axios get 요청하는 함수
  useEffect(() => {
    axios
      .get(`https://ijoah01.duckdns.org/api/diaries/${diaryId}`)
      .then((res) => {
        console.log("일기 내용 불러오는 거 성공함");
        console.log(res.data);
        setDiary(res.data);
      })
      .catch((err) => {
        console.log("에러..");
        console.log(err);
      });
  }, [diaryId]);
  return (
    <div>
      {/* 일기 쓴 날짜 */}
      <div>
        <Typography variant="h3">날짜 : {diary.diary_date}</Typography>
      </div>

      {/* 제목 */}
      <div>
        <Typography variant="h3">제목 : {diary.title}</Typography>
      </div>
      {/* 내용 */}
      <div>
        <Typography variant="h3">내용 : {diary.content}</Typography>
      </div>

      {/* 일기 쓴 날짜의 기분 날씨 */}
      <div className="mt-10">
        <div className="text-2xl text-center font-['HSYuji-Regular']">
          {diary.diary_date} 의 기분 날씨는 어땠나요 ?
        </div>
        <div className="flex mt-5 gap-4 justify-center">
          <div>
            <Avatar
              size="lg"
              alt="avatar"
              src="/weather/sunny.png"
              className={`border p-1 opacity-30 border-[#F8A70C] shadow-md shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
                diary.emotion === "sunny"
                  ? "ring-[red] ring-2 !opacity-100 border-[red]"
                  : ""
              }`}
            />
          </div>
          <div>
            <Avatar
              size="lg"
              alt="avatar"
              src="/weather/sunrise.png"
              className={`border p-1 opacity-30 border-[#F8A70C] shadow-md shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
                diary.emotion === "sunrise"
                  ? "ring-[red] ring-2 !opacity-100 border-[red]"
                  : ""
              }`}
            />
          </div>
          <div>
            <Avatar
              size="lg"
              alt="avatar"
              src="/weather/drop.png"
              className={`border p-1 border-[#F8A70C] opacity-30 shadow-md shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
                diary.emotion === "drop"
                  ? "ring-[red]  !opacity-100 ring-2 border-[red]"
                  : ""
              }`}
            />
          </div>
          <div>
            <Avatar
              size="lg"
              alt="avatar"
              src="/weather/wind.png"
              className={`border p-1 border-[#F8A70C] shadow-md opacity-30 shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
                diary.emotion === "wind"
                  ? "ring-[red] ring-2 !opacity-100 border-[red]"
                  : ""
              }`}
            />
          </div>
          <div>
            <Avatar
              size="lg"
              alt="avatar"
              src="/weather/thunder.png"
              className={`border p-1 border-[#F8A70C] shadow-md opacity-30 shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
                diary.emotion === "thunder"
                  ? "ring-[red] ring-2 !opacity-100 border-[red]"
                  : ""
              }`}
            />
          </div>
        </div>
      </div>
      {/* <div>날짜:{selectdate}</div> */}
      {/* {diaryId, title, content, emotion, diary_date, images, record} */}
      <div>아이디 :{diary.diaryId}</div>
      <div>제목 :{diary.title}</div>
      <div>내용 :{diary.content}</div>
      <div>기분 :{diary.emotion}</div>
      <div>날짜 :{diary.diary_date}</div>
      {/* <div>사진 :{diary.images[0]}</div> */}
      {/* <div>음성 :{diary.record}</div> */}
    </div>
  );
};

export default DiaryContent;
