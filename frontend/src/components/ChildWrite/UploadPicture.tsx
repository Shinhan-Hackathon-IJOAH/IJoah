import React from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useDiaryStore } from '../../store/DiaryStore';
import { Carousel } from '@material-tailwind/react';
interface State {
  selectedImages: string[];
}

const FileUpload: React.FC = () => {
  // store에서 picture, setPicture, file, setFile 가져오기
  const { picture, setPicture, file, setFile } = useDiaryStore();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFile(selectedFiles);
      console.log(file);
      const selectedImages: Blob[] = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result as string;
          const blob = new Blob([result], { type: file.type });
          selectedImages.push(blob);

          if (selectedImages.length === selectedFiles.length) {
            setPicture(selectedImages);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };

  return (
    <div className="w-[100vw]">
      <div className="mt-10 text-2xl text-center font-['HSYuji-Regular']">오늘 특별히 기록할 사진이 있나요 ?</div>
      {/*  */}
      <Carousel
        className="rounded-xl"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill('').map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
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

      {/* 사진 등록하기 */}
      <div className="flex justify-center">
        <label htmlFor="file-input">
          <div className="font-['HSYuji-Regular']">
            사진 등록하기
            <IconButton size="large" color="warning" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" id="file-input" multiple onChange={handleImageChange} />
              <PhotoCamera />
            </IconButton>
          </div>
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
