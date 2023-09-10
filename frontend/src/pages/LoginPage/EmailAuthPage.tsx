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
import EmailAuthSend from "./../../components/Login/EmailAuthSend";
import EmailAuthCheck from "./../../components/Login/EmailAuthCheck";
import { useSignUpStore } from "../../store/SignUpStore";
const EmailAuthPage = () => {
    const { isSendEmail, setIsSendEmail } = useSignUpStore();
    


  return <div
  >
    <EmailAuthSend></EmailAuthSend>
   {isSendEmail? (<EmailAuthCheck/>) : <EmailAuthSend/> } 
</div>;
};

export default EmailAuthPage;
