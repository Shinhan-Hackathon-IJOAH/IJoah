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

const Login = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  // 아이디,비밀번호 상태관리
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 아이디 세팅
  const handleIdChange = (event: any) => {
    setId(event.target.value);
  };
  // 패스워드 세팅
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  // 로그인 axios 함수
  async function login() {
    try {
      const response = await axios.post(
        "/api/auth/login",
        {
          id: id,
          password: password,
        },
        // 헤더는 백엔드랑 이야기 해야 함.
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data);

      // localStorage에 JWT 토큰 저장
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // accessToken을 통해 사용자 정보 가져오기
      const accessToken = localStorage.getItem("accessToken");

      const response2 = await axios.get("/api/users", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response2.data);
      //   await setUser(response2.data);
      if (response2.data.memberRole === "parent") {
        navigate("/parent");
      } else if (response2.data.memberRole === "child") {
        navigate("/child");
      }
    } catch (error) {
      console.log(error);
    }
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
            onChange={handlePasswordChange}
            crossOrigin={undefined}
            style={{ backgroundColor: "#ffffff" }}
          />
        </div>
        <LoginButton>
          <Button
            onClick={() => {
              navigate("/parent");
            }}
          >
            {" "}
            아이 화면으로
          </Button>
          <Button
            onClick={() => {
              navigate("/child");
            }}
          >
            부모 화면으로
          </Button>
        </LoginButton>
        <SignupContainer>
          <SignupAnchor
            onClick={() => {
              navigate("/signUp");
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
