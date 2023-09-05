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
    <div>
      <div className="w-72">
        <Input
          label="제목을 입력해주세요."
          value={title}
          onChange={handleTitleChange}
          crossOrigin={undefined}
        />
      </div>
      <div className="w-96">
        <Textarea
          label="내용을 입력해주세요."
          value={content}
          onChange={handleContentChange}
        />
      </div>
    </div>
  );
};

export default WriteDiary;
