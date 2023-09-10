import React from "react";
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
const EmailAuthPage = () => {
    const { isSendEmail, setIsSendEmail,signUpEmail,setSignUpEmail } = useSignUpStore();


  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpEmail(e.target.value);
  };

// 사용자로부터 입력받은 이메일 인증을 axios로 보내고 성공하면 isSendEmail을 true로 바꿔준다.
 const sendEmailAuth = () => {
    axios.post("https://ijoah01.duckdns.org/api/emails/send"+`?email=${signUpEmail}`)
      .then((response: any) => {
        console.log(response);
        console.log(response.data)
        setIsSendEmail(true);
      }
      )
      .catch((error: any) => {
        console.log(error);
        console.log(signUpEmail)
      }
      );
  };




  return <div
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
      가입하실 이메일을 하단에 입력해주세요
    </Typography>
    </div>
  </CardBody>
  <CardFooter className="pt-0">
    <Input crossOrigin={undefined} 
    onChange={handleEmail}
    label="가입하실 이메일을 입력해주세요."/>
      
    <Button
      ripple={false}
      fullWidth={true}
      className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
    onClick={sendEmailAuth}
    >
      이메일 인증하기
    </Button>
  </CardFooter>
</Card>
</div>;
};

export default EmailAuthPage;
