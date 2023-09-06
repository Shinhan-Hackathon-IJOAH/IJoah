import React from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { useDiaryStore } from "../../store/DiaryStore";
const WriteDiary = () => {
  // 한번에 변수들을 들고오는 방법
  const { title, content, setTitle, setContent } = useDiaryStore();

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: any) => {
    setContent(event.target.value);
  };

  return (
    <div className="mt-16 flex justify-center flex-col text-center text-2xl font-['HSYuji-Regular']">
      <div>오늘의 용돈일기를 작성해주세요 !</div>
      <div className="w-[70vw] lg:w-[30vw] mt-6 flex justify-center mx-auto font-['HSYuji-Regular']">
        <Input
          style={{ backgroundColor: "#ffffff" }}
          color="orange"
          label="제목"
          value={title}
          onChange={handleTitleChange}
          crossOrigin={undefined}
        />
      </div>
      <div className="w-[70vw] lg:w-[30vw] mx-auto mt-7 text-2xl flex justify-center font-['HSYuji-Regular']">
        <Textarea
          style={{ backgroundColor: "#ffffff" }}
          color="orange"
          label="오늘 하루 무슨 일이 있었나요?"
          value={content}
          onChange={handleContentChange}
        />
      </div>
    </div>
  );
};

export default WriteDiary;
