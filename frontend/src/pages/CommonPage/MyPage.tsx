import React,{useState} from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input
  } from "@material-tailwind/react";
const MyPage = () => {

    // input창 입력값에 따라 state 변경하는 함수들
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangePassWord(e.target.value);
    };
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeEmail(e.target.value);
    };
    const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangePhoneNumber(e.target.value);
    };
    const handleChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeProfileImage(e.target.value);
    };

    // 내 정보 변경을 위한 state들
    const [changePassWord, setChangePassWord] = useState<string>("");
    const [changeEmail, setChangeEmail] = useState<string>("");
    const [changePhoneNumber, setChangePhoneNumber] = useState<string>("");
    const [changeProfileImage, setChangeProfileImage] = useState<any>([]);

    // 변경 요청 axios 함수들 (비밀번호, 이메일, 휴대폰 번호, 프로필 사진)
    return (
        
        
        <div className="flex flex-col items-center w-[100vw] h-[100vh]">
            <div>
            <Typography variant="h2" color="blue-gray" className="">프로필 변경 페이지</Typography>

            </div>
            <div>
        <Card className="mt-10">
          <CardHeader color="blue-gray" className="relative h-50">
            <img
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="profile-image"
            />
          </CardHeader>
          <CardFooter className="mt-5 pt-0 flex justify-center">
            <Button color="orange">프로필 사진 변경</Button>
          </CardFooter>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              변경할 정보를 입력하세요.
            </Typography>
            <Typography>
아이디
      <Input 
      label="asdf" disabled crossOrigin={false} />
            </Typography>
            <Typography>
비밀번호
      <Input 
      onChange={handleChangePassword}
      
      placeholder="변경할 비밀번호를 입력해주세요."  crossOrigin={false} />
            </Typography>
            <Typography>
이름
      <Input label="김하영" disabled crossOrigin={false} />
            </Typography>
            <Typography>
이메일
      <Input 
      onChange={handleChangeEmail}
      
      placeholder="변경할 이메일을 입력해주세요." crossOrigin={false} />
            </Typography>
            <Typography>
휴대폰 번호
      <Input
      onChange={handleChangePhoneNumber}
      placeholder="변경할 휴대폰 번호를 입력해주세요." crossOrigin={false} />
            </Typography>
          </CardBody>
          <Button color="orange" className="mb-5 w-2/3 flex justify-center ">내 정보 변경하기</Button>
        </Card>
        </div>
        </div>
      );}

export default MyPage;


// 유효성 검증을 위해 잠시 빼둔 코드
{/* <Typography
        variant="small"
        color="gray"
        className="mt-2 flex items-center gap-1 font-normal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="-mt-px h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
        Use at least 8 characters, one uppercase, one lowercase and one number.
      </Typography> */}