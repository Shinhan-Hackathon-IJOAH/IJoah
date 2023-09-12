import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Input } from '@material-tailwind/react';
import axios from 'axios';
import { useSignUpStore } from '../../store/SignUpStore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const EmailAuthCheck = () => {
  const navigate = useNavigate();
  const {
    isSendEmail,
    setIsSendEmail,
    realAuthCode,
    setRealAuthCode,
    isAuthEmail,
    setIsAuthEmail,
    signUpEmail,
    setSignUpEmail,
  } = useSignUpStore();
  const [inputAuthCode, setInputAuthCode] = useState('');

  // 사용자가 입력한 인증번호 저장하기
  const handleInputAuthCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAuthCode(e.target.value);
  };
  // 사용자가 입력한 인증번호 검증하기.
  // 검증이 완료됐으면 isAuthEmail을 true로 바꿔준다.
  // 그리고 회원가입 페이지로 이동한다.
  const checkAuthCode = () => {
    const authCode: string = inputAuthCode.toString();
    axios
      .post('https://ijoah01.duckdns.org/api/emails/check', {
        email: signUpEmail,
        code: authCode,
      })
      .then((response: any) => {
        console.log(response.data);
        setIsAuthEmail(true);
        Swal.fire({
          icon: 'success',
          title: '이메일 인증에 성공했습니다.',
          // text: '모아일기에 오신 것을 환영합니다.',
        });
        navigate('/signup');
      })
      .catch((error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: '이메일 인증에 실패했습니다.',
          text: '다시 시도해주세요.',
        });
      });
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card className="w-[100vw] lg:w-[32vw]">
        <CardHeader shadow={false} floated={false} className="h-[22rem] shadow-md">
          {/* <img
            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          /> */}
          <img src="/auth/authCheckEmail.gif" alt="card-image" className="h-full w-full object-cover" />
        </CardHeader>
        <CardBody className="justify-center items-center flex flex-col">
          <div>
            <Typography variant="h3" color="blue-gray" className="font-semibold">
              <>
                모아일기에 오신 것을
                <br /> 진심으로 환영합니다 !
              </>
            </Typography>
          </div>
          <div className="mt-5">
            <Typography variant="h5" color="gray" className="font-normal opacity-75">
              입력하신 이메일로 전송된 인증번호를 입력해주세요.
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <div>
            <Input
              color="orange"
              crossOrigin={undefined}
              onChange={handleInputAuthCode}
              label="인증코드 6자리를 입력해주세요."
            />
          </div>
          <div>
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-orange-500 mt-5 text-white text-md shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              onClick={checkAuthCode}
            >
              인증 번호 확인하기
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailAuthCheck;
