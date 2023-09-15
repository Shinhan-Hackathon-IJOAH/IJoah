import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Input } from '@material-tailwind/react';
import axios from 'axios';
import EmailAuthSend from './../../components/Login/EmailAuthSend';
import EmailAuthCheck from './../../components/Login/EmailAuthCheck';
import { useSignUpStore } from '../../store/SignUpStore';
import BackPageButton from '../../components/Common/BackPageButton';
const EmailAuthPage = () => {
  const { isSendEmail, setIsSendEmail } = useSignUpStore();

  return (
    <div>
      <BackPageButton/>
      {/* 이메일을 보냈으면 검증 페이지 보여주기, 아니면 이메일 입력 페이지 보여주기 */}
      {isSendEmail ? <EmailAuthCheck /> : <EmailAuthSend />}
    </div>
  );
};

export default EmailAuthPage;
