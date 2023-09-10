import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { useUserStore } from "../../store/UserStore";
import {
  Logo,
  LoginContent,
  InputTag,
  SignupContainer,
  SignupAnchor,
  LoginButton,
} from "./LoginStyles";
import axios from "axios";
import Swal from "sweetalert2";
import { set } from "date-fns";

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
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

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
    if (emailId === "") {
      Swal.fire({
        icon: "error",
        title: "아이디를 입력해주세요.",
      });
      return;
    }
    if (password === "") {
      Swal.fire({
        icon: "error",
        title: "비밀번호를 입력해주세요.",
      });
      return;
    }

    const response = await axios
      .post(
        "https://ijoah01.duckdns.org/api/members/login",
        {
          email: emailId,
          password: password,
        }
        // 헤더는 백엔드랑 이야기 해야 함.
        // {
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/x-www-form-urlencoded",
        //   },
        // }
      )
      .then((response: any) => {
        console.log(response.data.data);
        console.log(response.data.accessToken);

        // localStorage에 JWT 토큰 저장
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        setAccessToken(response.data.data.accessToken);
        setRefreshToken(response.data.data.refreshToken);
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setMemberRole(response.data.data.memberRole);
        console.log(response.data.data.memberRole);
        console.log(memberRole);
        Swal.fire({
          icon: "success",
          title: "로그인에 성공했습니다.",
        });
        if (response.data.data.memberRole === "PARENT") {
          navigate("/parent");
        } else if (response.data.data.memberRole === "CHILD") {
          navigate("/child");
        }
      })
      .catch((error: any) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "로그인에 실패했습니다.",
          text: "다시 시도해주세요.",
        });
      });
  }

  return (
    <LoginContent>
      <Logo />
      <InputTag>
        <div className="flex w-64 flex-col gap-6">
          <Input
            color="orange"
            label="아이디"
            crossOrigin={undefined}
            onChange={handleIdChange}
            style={{ backgroundColor: "#ffffff" }}
          />
          <Input
            color="orange"
            label="비밀번호"
            type="password"
            onChange={handlePasswordChange}
            crossOrigin={undefined}
            style={{ backgroundColor: "#ffffff" }}
          />
        </div>
        <LoginButton>
          <Button color="orange" onClick={login}>
            로그인
          </Button>
        </LoginButton>
        <SignupContainer>
          <SignupAnchor
            onClick={() => {
              navigate("/emailauth");
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
