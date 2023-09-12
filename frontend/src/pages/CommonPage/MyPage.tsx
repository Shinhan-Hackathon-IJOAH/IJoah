import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Input } from '@material-tailwind/react';
import axios from 'axios';
import { useUserStore } from '../../store/UserStore';
const MyPage = () => {
  const { accessToken, email, phoneNumber, name } = useUserStore();

  // input창 입력값에 따라 state 변경하는 함수들
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePassWord(e.target.value);
  };
  const handleChangePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePasswordCheck(e.target.value);
  };

  // 내 정보 변경을 위한 state들
  const [changePassWord, setChangePassWord] = useState<string>('');
  const [changeProfileImage, setChangeProfileImage] = useState<File | null>(null);

  const [changePasswordCheck, setChangePasswordCheck] = useState<string>('');

  // 변경 요청 axios 함수들 (비밀번호, 이메일, 휴대폰 번호, 프로필 사진)
  return (
    <div className="flex flex-col items-center w-[100vw] h-[100vh]">
      <Typography variant="h2" color="blue-gray" className="font-['HSYuji-Regular']">
        프로필 변경 페이지
      </Typography>

      <div>
        <Card className="mt-10 w-full flex justify-center">
          <CardHeader color="white" className="">
            {changeProfileImage ? (
              <img src={URL.createObjectURL(changeProfileImage)} alt="profile-image" />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="profile-image"
              />
            )}
          </CardHeader>
          <CardFooter className="mt-5 pt-0 flex justify-center flex-col items-center">
            {/* <div>
              <Typography color="blue-gray">
                프로필 사진을 변경하려면 아래 하단의 '파일 선택' 버튼을 누르고 사진을 업로드해주세요.
              </Typography>
            </div> */}
            <div>
              {/* <div className="font-['HSYuji-Regular']">
                사진 등록하기
                <IconButton size="large" color="warning" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" id="file-input" onChange={handleImageChange} />
                  <PhotoCamera />
                </IconButton>
              </div> */}
              <div className="font-['HSYuji-Regular'] text-center text-2xl font-semibold">
                <label htmlFor="file-input">
                  {/* 희창이가 이상하다 함. */}
                  <div className="font-['HSYuji-Regular']">프로필 사진 변경</div>
                  <Input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    // hidden
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const selectedImage = e.target.files[0] as File;
                        setChangeProfileImage(selectedImage);
                      }
                    }}
                    crossOrigin={false}
                  />
                </label>
              </div>
            </div>
          </CardFooter>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2 font-['HSYuji-Regular']">
              변경할 정보를 입력하세요.
            </Typography>
            <Typography className="font-['HSYuji-Regular']">
              이메일ID
              <Input label={email} disabled crossOrigin={false} />
            </Typography>
            <Typography className="font-['HSYuji-Regular']">
              비밀번호
              <div></div>
              <Input
                onChange={handleChangePassword}
                placeholder="변경할 비밀번호를 입력해주세요."
                type="password"
                crossOrigin={false}
              />
            </Typography>
            <Typography className="font-['HSYuji-Regular']">
              비밀번호 확인
              <Input
                type="password"
                onChange={handleChangePasswordCheck}
                placeholder="비밀번호를 다시 입력해주세요."
                crossOrigin={false}
              />
            </Typography>
            <Typography className="font-['HSYuji-Regular']">
              이름
              <Input label={name} disabled crossOrigin={false} />
            </Typography>
            <Typography className="font-['HSYuji-Regular']">
              휴대폰 번호
              <Input label={phoneNumber} disabled crossOrigin={false} />
            </Typography>
          </CardBody>
          <div className="p-6">
            <Button color="orange" className="mb-5 w-full text-lg font-['HSYuji-Regular']">
              내 정보 변경하기
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyPage;
