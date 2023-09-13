import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Input } from '@material-tailwind/react';
import axios from 'axios';
import { useSignUpStore } from '../../store/SignUpStore';
import Swal from 'sweetalert2';
const EmailAuthPage = () => {
  const { isSendEmail, setIsSendEmail, signUpEmail, setSignUpEmail } = useSignUpStore();
  const [isloadingAxios, setIsLoadingText] = React.useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpEmail(e.target.value);
  };

  // 이메일 인증하기 버튼 눌렀을 때 실행 될 2개의 함수.
  const handleClick = () => {
    if (signUpEmail === '') {
      Swal.fire({
        icon: 'error',
        title: '이메일을 입력해주세요.',
        text: '다시 시도해주세요.',
      });
      return;
    }
    setIsLoadingText(true);
    sendEmailAuth();
  };

  // 사용자로부터 입력받은 이메일 인증을 axios로 보내고 성공하면 isSendEmail을 true로 바꿔준다.
  const sendEmailAuth = () => {
    axios
      .post('https://ijoah01.duckdns.org/api/emails/send' + `?email=${signUpEmail}`)
      .then((response: any) => {
        console.log(response);
        console.log(response.data);
        setIsSendEmail(true);
      })
      .catch((error: any) => {
        console.log(error);
        console.log(signUpEmail);
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
          <img src="/auth/authSendEmail.gif" alt="card-image" className="h-full w-full object-cover" />
        </CardHeader>
        <CardBody className="justify-center items-center flex flex-col">
          <div>
            <Typography variant="h3" color="blue-gray" className="font-semibold font-['HSYuji-Regular']">
              <>
                모아일기에 오신 것을
                <br /> 진심으로 환영합니다 !
              </>
            </Typography>
          </div>
          <div className="mt-5">
            <Typography variant="h5" color="gray" className="font-normal opacity-75 font-['HSYuji-Regular']">
              가입하실 이메일을 하단에 입력해주세요.
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <div>
            <Input
              color="orange"
              crossOrigin={undefined}
              onChange={handleEmail}
              label="가입하실 이메일을 입력해주세요."
            />
          </div>
          <div>
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-orange-500 mt-5 text-white text-md shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 font-['HSYuji-Regular']"
              onClick={handleClick}
            >
              이메일 인증하기
            </Button>
          </div>
          <Typography variant="small" color="gray" className="text-center mt-3 font-['HSYuji-Regular']">
            {isloadingAxios ? (
              <>
                회원님의 이메일로 인증코드가 전송되었습니다. <br /> 잠시 후 인증 코드 입력 페이지로 이동합니다.
              </>
            ) : (
              ''
            )}
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailAuthPage;
