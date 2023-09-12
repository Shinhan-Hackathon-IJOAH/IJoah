import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button, Input } from "@material-tailwind/react";
import { useUserStore } from '../../store/UserStore';
import { Logo, LoginContent, InputTag, SignupContainer, SignupAnchor, LoginButton } from './LoginStyles';
import axios from 'axios';
import Swal from 'sweetalert2';
import { set } from 'date-fns';
import logo from '../../asset/logo.png';
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from '@material-tailwind/react';
const Login = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    memberRole,
    setMemberRole,
  } = useUserStore();
  const navigate = useNavigate();

  // 아이디,비밀번호 상태관리
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');

  // 아이디 세팅
  const handleIdChange = (event: any) => {
    setEmailId(event.target.value);
  };
  // 패스워드 세팅
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  // 로그인 axios 함수
  async function login() {
    if (emailId === '') {
      Swal.fire({
        icon: 'error',
        title: '아이디를 입력해주세요.',
      });
      return;
    }
    if (password === '') {
      Swal.fire({
        icon: 'error',
        title: '비밀번호를 입력해주세요.',
      });
      return;
    }

    const response = await axios
      .post(
        'https://ijoah01.duckdns.org/api/members/login',
        {
          email: emailId,
          password: password,
        },
    
      )
      .then((response: any) => {
        console.log(response.data.data);
        console.log(response.data.accessToken);

        // localStorage에 JWT 토큰 저장
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        setAccessToken(response.data.data.accessToken);
        setRefreshToken(response.data.data.refreshToken);
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setMemberRole(response.data.data.memberRole);
        console.log(response.data.data.memberRole);
        console.log(memberRole);
        Swal.fire({
          icon: 'success',
          title: '로그인에 성공했습니다.',
        });
        if (response.data.data.memberRole === 'PARENT') {
          navigate('/parent');
        } else if (response.data.data.memberRole === 'CHILD') {
          navigate('/child');
        }
      })
      .catch((error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: '로그인에 실패했습니다.',
          text: '다시 시도해주세요.',
        });
      });
  }

  return (
    // <div className="flex justify-center items-center h-screen bg-[#F8A70C;]">
    // <div className="flex justify-center items-center h-screen bg-[#FFECC8]">
    //   <Card className="w-96 lg:w-[40vw] lg:h-[80vh]">
    //     <img src={logo} alt="logo" className="z-10" />

    //     {/* <CardHeader variant="gradient" className="mb-4 grid h-40 w-100 lg:h-[25vh] place-items-center bg-[#FFECC8]"> */}
    //     {/* <img src={logo} alt="logo" className="z-10 absolute top-0 left-0 w-full h-full" /> */}
    //     {/* <Typography variant="h3" color="white">
    //         모아 일기
    //       </Typography> */}
    //     {/* </CardHeader> */}
    //     <CardBody className="flex flex-col gap-4">
    //       <Input color="orange" label="Email을 입력해주세요." size="lg" crossOrigin={undefined} />
    //       <Input color="orange" label="비밀번호를 입력해주세요." size="lg" crossOrigin={undefined} />
    //       <div className="-ml-2.5">
    //         <Checkbox label="아이디 저장하기" crossOrigin={undefined} />
    //       </div>
    //     </CardBody>
    //     <CardFooter className="pt-0">
    //       <Button variant="gradient" color="orange" fullWidth>
    //         로그인
    //       </Button>
    //       <Typography variant="small" className="mt-6 flex justify-center">
    //         아직 회원이 아니신가요?
    //         <Typography
    //           as="a"
    //           onClick={() => {
    //             navigate('/emailauth');
    //           }}
    //           variant="small"
    //           color="blue-gray"
    //           className="ml-1 font-bold"
    //         >
    //           회원가입하기
    //         </Typography>
    //       </Typography>
    //     </CardFooter>
    //   </Card>
    // </div>
    <LoginContent>
      <Logo />
      <InputTag>
          <Input
            color="orange"
            label="아이디"
            crossOrigin={undefined}
            onChange={handleIdChange}
            style={{ backgroundColor: '#ffffff' }}
          />
          <Input
            color="orange"
            label="비밀번호"
            type="password"
            onChange={handlePasswordChange}
            crossOrigin={undefined}
            style={{ backgroundColor: '#ffffff' }}
          />
        <LoginButton>
          <Button color="orange" onClick={login} className="lg:w-[20vw] w-[65vw] ">
            로그인
          </Button>
        </LoginButton>
        <SignupContainer>
          <SignupAnchor
            onClick={() => {
              navigate('/emailauth');
            }}
          >
            아직 회원이 아니신가요?
          </SignupAnchor>
        </SignupContainer>
      </InputTag>
    </LoginContent>
  );
};

export default Login;
