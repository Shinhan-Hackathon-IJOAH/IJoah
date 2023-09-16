import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button, Input } from "@material-tailwind/react";
import { useUserStore } from '../../store/UserStore';
import { Logo, LoginContent, InputTag, SignupContainer, SignupAnchor, LoginButton } from './LoginStyles';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Input, Checkbox, Button } from '@material-tailwind/react';
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
    id,
    setId,
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
      await Swal.fire({
        icon: 'error',
        title: '아이디를 입력해주세요.',
      });
      return;
    } else if (password === '') {
      await Swal.fire({
        icon: 'error',
        title: '비밀번호를 입력해주세요.',
      });
      return;
    }

    try {
      const response = await axios
        .post('https://j9c210.p.ssafy.io/api1/members/login', {
          email: emailId,
          password: password,
        })
        .then((response: any) => {
          console.log(response.data.data);

          // localStorage에 JWT 토큰 저장
          localStorage.setItem('accessToken', response.data.data.accessToken);
          localStorage.setItem('refreshToken', response.data.data.refreshToken);
          setAccessToken(response.data.data.accessToken);
          setRefreshToken(response.data.data.refreshToken);
          setName(response.data.data.name);
          setEmail(response.data.data.email);
          setMemberRole(response.data.data.memberRole);
          setId(response.data.data.id);
          Swal.fire({
            icon: 'success',
            title: '로그인에 성공했습니다.',
          });

          if (response.data.data.memberRole === 'PARENT') {
            navigate('/parent');
          } else if (response.data.data.memberRole === 'CHILD') {
            navigate('/child');
          }
        });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: '로그인에 실패했습니다.',
        text: '다시 시도해주세요.',
      });
    }
  }
  // 엔터키 감지해서 로그인하기
  const activeEnter = (event: any) => {
    if (event.key === 'Enter') {
      login();
    }
  };

  return (
    <LoginContent>
      <Logo />
      <InputTag>
        <Input
          color="orange"
          label="아이디"
          crossOrigin={undefined}
          onChange={handleIdChange}
          onKeyDown={(event) => activeEnter(event)}
          style={{ backgroundColor: '#ffffff' }}
        />
        <Input
          color="orange"
          label="비밀번호"
          type="password"
          onChange={handlePasswordChange}
          onKeyDown={(event) => activeEnter(event)}
          crossOrigin={undefined}
          style={{ backgroundColor: '#ffffff' }}
        />
        <LoginButton>
          <Button color="orange" onClick={login} className="lg:w-[20vw] w-[65vw] font-['HSYuji-Regular'] text-[16px] ">
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
