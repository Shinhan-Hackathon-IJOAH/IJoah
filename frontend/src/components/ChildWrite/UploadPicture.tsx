import React from "react";

const UploadPicture = () => {
  return <div>
    <hr></hr>
    사진 업로드하기
    <button>사진 올리기</button>
    <input type="file" accept="image/*"></input>
  </div>;
};

export default UploadPicture;
