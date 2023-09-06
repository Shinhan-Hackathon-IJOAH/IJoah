import React from "react";
import { Input, Textarea } from "@material-tailwind/react";

const WriteDiary = () => {
  return (
    <div>
      <div className="w-72">
        <Input label="제목을 입력해주세요." crossOrigin={undefined} />
      </div>
      <div className="w-96">
        <Textarea label="내용을 입력해주세요." />
      </div>
    </div>
  );
};

export default WriteDiary;
