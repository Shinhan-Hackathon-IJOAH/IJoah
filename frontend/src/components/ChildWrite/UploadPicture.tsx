import React, { ChangeEvent, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import { useDiaryStore } from "../../store/DiaryStore";
import { Carousel } from "@material-tailwind/react";
interface State {
  selectedImages: string[];
}

const FileUpload: React.FC = () => {
  const { picture, setPicture } = useDiaryStore((state) => ({
    picture: state.picture,
    setPicture: (picture: any[]) => state.setPicture(picture),
  }));
  // const { picture, setPicture } = useDiaryStore();
  const [imageList, setImageList] = useState<Blob[]>([]);
  // const [a, setA] = useState<any[]>([]);
  // 원래 있던 건데 formData 시도해보려고.
  // const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files) {
  //     const imageUrls: string[] = [];
  //     const reader = new FileReader();

  //     const processImage = (index: number) => {
  //       if (index < files.length) {
  //         reader.onload = () => {
  //           const imageUrl = reader.result as string;
  //           imageUrls.push(imageUrl);

  //           if (imageUrls.length === files.length) {
  //             // 모든 이미지를 변환하고 나면 state를 업데이트합니다.
  //             setPicture(imageUrls);
  //           } else {
  //             // 다음 이미지를 변환합니다.
  //             processImage(index + 1);
  //           }
  //         };

  //         // 이미지 변환을 시작합니다.
  //         reader.readAsDataURL(files[index]);
  //       }
  //     };

  //     // 첫 번째 이미지 변환을 시작합니다.
  //     processImage(0);
  //   }
  // };
  /////////////////////BLOB////////////////////////

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const selectedImages: Blob[] = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result as string;
          const blob = new Blob([result], { type: file.type });
          selectedImages.push(blob);

          // if (selectedImages.length === selectedFiles.length) {
          //   setImageList([...imageList, ...selectedImages]);
          // }
          if (selectedImages.length === selectedFiles.length) {
            setImageList([...imageList, ...selectedImages]);
            setPicture([...imageList, ...selectedImages]);
            // setA([...a, ...selectedImages]);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };

  ///////////////////////////File///////////////////////////////

  console.log(imageList);
  console.log(picture);

  return (
    <div className="w-[100vw]">
      <div className="mt-10 text-2xl text-center font-['HSYuji-Regular']">
        오늘 특별히 기록할 사진이 있나요 ?
      </div>
      {/*  */}
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
        {picture.map((imageUrl, index) => (
          <img
            className="h-96 w-96 w-full rounded-lg object-contain object-center shadow-xl shadow-blue-gray-900/50"
            key={index}
            // URL을 blob으로 바꾸자.
            src={URL.createObjectURL(imageUrl)}
            alt={`Selected ${index}`}
          />
        ))}
      </Carousel>

      {/*  */}
      <div className="flex justify-center">
        <label htmlFor="file-input">
          <div className="font-['HSYuji-Regular']">
            사진 등록하기
            <IconButton
              size="large"
              color="warning"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                id="file-input"
                multiple
                onChange={handleImageChange}
              />
              <PhotoCamera />
            </IconButton>
          </div>
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
