import React,{useState} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input
} from "@material-tailwind/react";
import axios from "axios";
import { useSignUpStore } from "../../store/SignUpStore";
import { useNavigate } from "react-router-dom";
const EmailAuthCheck = () => {





    const navigate = useNavigate();
    const { isSendEmail, setIsSendEmail,realAuthCode,setRealAuthCode, isAuthEmail, setIsAuthEmail,signUpEmail,setSignUpEmail} = useSignUpStore();
    const [inputAuthCode,setInputAuthCode] = useState("");

    // 사용자가 입력한 인증번호 저장하기
    const handleInputAuthCdoe = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputAuthCode(e.target.value);
      };
    // 사용자가 입력한 인증번호 검증하기. 
    // 검증이 완료됐으면 isAuthEmail을 true로 바꿔준다.
    // 그리고 회원가입 페이지로 이동한다.
    const checkAuthCode = () => {
        const authCode: string = inputAuthCode.toString();
        axios.post("https://ijoah01.duckdns.org/api/emails/check",
        {
            email: signUpEmail,
            
            code: authCode,
        }
        )
        .then((response: any) => {
            console.log(response);
            console.log(response.data)
            setIsAuthEmail(true);
            alert(response.data);
            navigate("/signup");
        })
        .catch((error: any) => {
            console.log(error);
            alert(error.message)
        }
        );
    }
    

  return (
    <div
  className="flex justify-center items-center">
    <Card className="w-[100vw] lg:w-[35vw]">
  <CardHeader shadow={false} floated={false} className="h-96">
    <img
      src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
      alt="card-image"
      className="h-full w-full object-cover"
    />
  </CardHeader>
  <CardBody className="justify-center items-center flex flex-col">
    
    <div>
      <Typography color="blue-gray" className="font-medium">
        모아일기에 오신 것을 진심으로 환영합니다 !
      </Typography>
      </div>
      <div>
    <Typography
      variant="small"
      color="gray"
      className="font-normal opacity-75"
    >
      입력하신 이메일로 전송된 인증번호를 입력해주세요.
    </Typography>
    </div>
  </CardBody>
  <CardFooter className="pt-0">
    <Input crossOrigin={undefined} 
    onChange={handleInputAuthCdoe}
    label="인증코드 6자리를 입력해주세요."/>
      
    <Button
      ripple={false}
      fullWidth={true}
      className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
    onClick={checkAuthCode}
    >
      인증 번호 확인하기
    </Button>
  </CardFooter>
</Card>
</div>
  );
  };

export default EmailAuthCheck;
