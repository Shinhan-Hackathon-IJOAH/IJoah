import React, { useEffect, useState } from "react";
import { Avatar, Typography, Carousel } from "@material-tailwind/react";
// import {Diary} from './DiaryContentStyles'
import axios from "axios";
interface DiaryContentProps {
  selectdate: string;
  diaryId: string;
}
interface Diary {
  diaryId: number;
  title: string;
  content: string;
  emotion: string;
  diary_date: string;
  images: {
    storeFileName: string;
    diaryImageId: string;
    uploadFileName: string;
  }[];

  record: string;
}

const DiaryContent: React.FC<DiaryContentProps> = ({ selectdate, diaryId }) => {
  const [diary, setDiary] = useState<Diary>();

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
        <Typography variant="h3">날짜 : {diary?.diary_date}</Typography>
      </div>

      {/* 제목 */}
      <div>
        <Typography variant="h3">제목 : {diary?.title}</Typography>
      </div>
      {/* 내용 */}
      <div>
        <Typography variant="h3">내용 : {diary?.content}</Typography>
      </div>

      {/* 일기 쓴 날짜의 기분 날씨 */}
      <div className="mt-10">
        <div className="text-2xl text-center font-['HSYuji-Regular']">
          {diary?.diary_date} 의 기분 날씨는 어땠나요 ?
        </div>
        <div className="flex mt-5 gap-4 justify-center">
          <div>
            <Avatar
              size="lg"
              alt="avatar"
              src="/weather/sunny.png"
              className={`border p-1 opacity-30 border-[#F8A70C] shadow-md shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
                diary?.emotion === "sunny"
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
                diary?.emotion === "sunrise"
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
                diary?.emotion === "drop"
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
                diary?.emotion === "wind"
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
                diary?.emotion === "thunder"
                  ? "ring-[red] ring-2 !opacity-100 border-[red]"
                  : ""
              }`}
            />
          </div>
        </div>
      </div>

      {/* 일기 쓴 날짜의 사진 */}
      <Carousel
        className="rounded-xl"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {diary?.images.map((image, index) => (
          // 각 이미지 객체에서 storeFileName에 접근
          <img
            className="h-96 w-96 w-full rounded-lg object-contain object-center shadow-xl shadow-blue-gray-900/50"
            key={index}
            src={`https://ijoah01.duckdns.org/api/diaries/image/${image.storeFileName}`}
            alt={`Selected ${index}`}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default DiaryContent;
