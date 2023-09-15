import React, { useState } from 'react';
import axios from 'axios';
import { Input, Typography, Button } from '@material-tailwind/react';
import { RegisterButton, RegisterContainer } from './AccountRegisterStyles';

const AccountRegister = () => {
  const [account, SetAccount] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmTag, setConfifmTag] = useState<string>('');

  const AccountSend = () => {
    axios
      .post(
        'https://j9c210.p.ssafy.io/api1/bank/startoneauth',
        {
          accountNumber: account,
        },
        {
          headers: {
            Authorization: `Bearer`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        setShowConfirm(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AccountCofirm = () => {
    axios
      .post(
        'https://j9c210.p.ssafy.io/api1/bank/checkoneauth',
        {
          accountNumber: account,
          message: confirmTag,
        },
        {
          headers: {
            Authorization: `Bearer`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        setShowConfirm(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // <RegisterContainer>

    <div className="h-screen grid grid-rows-4">
      <div className="row-span-2 flex flex-col items-center justify-center mt-28">
        <Typography className="font-['HSYuji-Regular'] text-6xl" >계좌 등록하기</Typography>
        <div className="flex justify-center w-80">
          <Input
            className="bg-white"
            color="orange"
            type="number"
            pattern="\d*"
            label="등록할 계좌를 입력해주세요."
            value={account}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => SetAccount(event.target.value)}
            crossOrigin={undefined}
          />
        </div>
        <div className="flex justify-center w-80">
          <Button className="w-full mt-5 text-[16px] font-medium bg-[#00c68e] font-['HSYuji-Regular']" onClick={AccountSend}>
            내 계좌에 1원 전송
          </Button>
        </div>
      </div>
      <div className="row-span-1 flex flex-col justify-start items-center">
      {showConfirm && (
          <div className="text-center flex justify-center items-center flex-col w-screen">
            <div className="text-[16px] font-semibold mb-5 font-['HSYuji-Regular']">자신의 계좌에 적힌 messege를 입력해 주세요.</div>
            <div className="flex justify-center w-64">
            <Input
              className=""
              style={{ backgroundColor: '#ffffff' }}
              color="orange"
              type="string"
              label="계좌 확인 메세지를 입력해주세요."
              value={confirmTag}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfifmTag(event.target.value)}
              crossOrigin={undefined}
            />
            </div>
            <div className="flex justify-center w-64">
              <Button className="w-full mt-5 text-[16px] font-medium bg-[#00c68e] font-['HSYuji-Regular']" onClick={AccountCofirm}>
                확인하기
              </Button>
            </div>
          </div>
      )}
      </div>
    </div>
    // </RegisterContainer>
  );
};

export default AccountRegister;
