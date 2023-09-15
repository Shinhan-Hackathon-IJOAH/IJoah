import React from 'react';
import { ChildInfoContainer } from './ChildInfoStyles';
import { Avatar, Typography, Button } from '@material-tailwind/react';
import { useUserStore } from '../../store/UserStore';
import { useNavigate } from 'react-router-dom';
const ChildInfo = () => {
  const navigate = useNavigate();
  const { balance, name, account, profileImage } = useUserStore();
  return (
    <ChildInfoContainer>
      <div className="flex items-center gap-12">
        <Avatar
          size="lg"
          src={profileImage ? `https://j9c210.p.ssafy.io/api1/diaries/image/${profileImage}` : 'Moa_64.png'}
          alt="avatar"
          className="border border-[#F8A70C] shadow-lg shadow-[#F8A70C] ring-4 ring-[#F8A70C]"
        />
        <div>
          <Typography variant="h6">{name} 아이님</Typography>
          {account === '' ? (
            <>
              <Typography variant="small" color="gray" className="font-normal">
                계좌를 등록해주세요
              </Typography>
              <Button
                onClick={() => {
                  navigate('/register/account');
                }}
                className="bg-orange-500"
              >
                계좌 등록하기
              </Button>
            </>
          ) : (
            <>
              <Typography variant="small" color="gray" className="font-normal">
                {account}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                보유 자산: {balance}원
              </Typography>
            </>
          )}
        </div>
      </div>
    </ChildInfoContainer>
  );
};

export default ChildInfo;
