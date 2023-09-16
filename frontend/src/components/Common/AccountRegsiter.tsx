import React, { useState } from 'react';
import axios from 'axios';
import { Input, Typography, Button } from '@material-tailwind/react';
import { useUserStore } from '../../store/UserStore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AccountRegister = () => {
  const [account, SetAccount] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmTag, setConfifmTag] = useState<string>('');
  const { accessToken, id, memberRole } = useUserStore();
  const navigate = useNavigate();

  const AccountSend = () => {
    axios
      .post(
        'https://j9c210.p.ssafy.io/api1/bank/startoneauth',
        {
          accountNumber: account,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
          memberId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        setShowConfirm(true);
        Swal.fire({
          icon: 'success',
          title: '계좌 등록 성공',
        });
        if (memberRole === 'PARENT') {
          navigate('/parent');
        }
        if (memberRole === 'CHILD') {
          navigate('/child');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-screen grid grid-rows-4">
      <div className="row-span-2 flex flex-col items-center justify-center mt-28">
        <Typography className="font-['HSYuji-Regular'] text-6xl">계좌 등록하기</Typography>
        <div className="flex justify-center w-80">
          <Input
            className="bg-white"
            color="orange"
            type="string"
            label="등록할 계좌를 입력해주세요."
            value={account}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => SetAccount(event.target.value)}
            crossOrigin={undefined}
          />
        </div>
        <div className="flex justify-center w-80">
          <Button
            className="w-full mt-5 text-[16px] font-medium bg-[#00c68e] font-['HSYuji-Regular']"
            onClick={AccountSend}
          >
            내 계좌에 1원 전송
          </Button>
        </div>
      </div>
      <div className="row-span-1 flex flex-col justify-start items-center">
        {showConfirm && (
          <div className="text-center flex justify-center items-center flex-col w-screen">
            <div className="text-[16px] font-semibold mb-5 font-['HSYuji-Regular']">
              자신의 계좌에 적힌 messege를 입력해 주세요.
            </div>
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
              <Button
                className="w-full mt-5 text-[16px] font-medium bg-[#00c68e] font-['HSYuji-Regular']"
                onClick={AccountCofirm}
              >
                확인하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountRegister;
