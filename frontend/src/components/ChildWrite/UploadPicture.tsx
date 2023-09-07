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
  // const { picture, setPicture } = useDiaryStore();
  // 커스텀 훅을 사용하여 강화된 타입을 설정
  const { picture, setPicture } = useDiaryStore((state) => ({
    picture: state.picture,
    setPicture: (picture: string[]) => state.setPicture(picture),
  }));

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const imageUrl = URL.createObjectURL(files[i]);
        imageUrls.push(imageUrl);
      }
      setPicture(imageUrls);
      console.log(picture);
    }
  };

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
            src={imageUrl}
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

      {/*  */}
      {/* <Container maxWidth="md" sx={{ mt: 2 }}>
        <div className="flex">
          {picture.map((imageUrl, index) => (
            <img
              className="h-[100%] w-[100%] w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
              key={index}
              src={imageUrl}
              alt={`Selected ${index}`}
            />
          ))}
        </div>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          flexWrap={"nowrap"}
          spacing={2}
        >
         
        </Stack>
      </Container> */}
    </div>
  );
};

export default FileUpload;
