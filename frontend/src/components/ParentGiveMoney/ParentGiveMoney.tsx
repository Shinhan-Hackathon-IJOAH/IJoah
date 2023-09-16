import React, { useState, useEffect } from 'react';
import { Input } from '@material-tailwind/react';
import {
  InputTag,
  NameTag,
  GiveMoneyContainer,
  ButtonContainer,
  GiveInfoContainer,
  SendButoon,
} from './ParentGiveMoneyStyles';
import axios from 'axios';
import { useSelectChildStore } from '../../store/SelectChildStore';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useUserStore } from './../../store/UserStore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ParentGiveMoney = () => {
  const navigate = useNavigate();
  const [givemoney, setGivemoney] = useState<number>(0);
  const { childid, childname, childaccount, childimg } = useSelectChildStore();
  const { balance, name, accessToken, account } = useUserStore();
  const formattedMoney = givemoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    setGivemoney(Number(onlyNumbers));
  };

  const giveMoney = () => {
    if (givemoney === 0) {
      Swal.fire({
        icon: 'warning',
        title: '용돈 금액 입력',
        text: `${childname}에게 보낼 금액을 입력해주세요`,
      });
    } else {
      axios
        .post(
          'https://j9c210.p.ssafy.io/api1/bank/transfer',
          {
            withdrawAccount: account,
            depositAccount: childaccount,
            amount: givemoney,
            withdrawContent: `${childname}에게 용돈`,
            depositContent: `${name}이 주신 용돈`,
            // balance: "900000",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: '용돈보내기 완료',
            text: `${childname}에게 ${givemoney}원 송금 완료`,
          });
          setGivemoney(0);
          navigate('/parent');
        })
        .catch((error) => {
          console.log(error);
          console.log(typeof balance);
          console.log(typeof givemoney);
          Swal.fire({
            icon: 'error',
            title: '용돈보내기 실패',
            text: '다시 시도해주세요.',
          });
        });
    }
  };

  useEffect(() => {
    if (givemoney > balance) {
      Swal.fire({
        icon: 'warning',
        title: '보유금액을 초과했습니다',
      });
      setGivemoney(0);
    }
  }, [givemoney, balance]);

  return (
    <GiveMoneyContainer>
      <GiveInfoContainer>
        <Avatar
          variant="circular"
          className="border-2 border-white hover:z-10 focus:z-10"
          src={`https://j9c210.p.ssafy.io/api1/diaries/image/${childimg}`}
        />
        <NameTag className="text-2xl text-center font-['HSYuji-Regular']">{childname}에게 용돈 보내주기</NameTag>
      </GiveInfoContainer>
      <InputTag>
        <Input
          variant="static"
          label="전송할 용돈"
          placeholder="금액"
          crossOrigin={undefined}
          type="text"
          pattern="\d*"
          value={formattedMoney}
          onChange={handleMoneyChange}
          min={0}
          max={balance}
          style={{
            fontSize: '25px',
            textAlign: 'right',
            direction: 'rtl',
            paddingRight: '15px',
          }}
        />
        <span>원</span>
      </InputTag>
      <ButtonContainer>
        <Button
          variant="outlined"
          onClick={() => {
            setGivemoney(givemoney + 1000);
          }}
        >
          1,000원
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setGivemoney(givemoney + 5000);
          }}
        >
          5,000원
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setGivemoney(givemoney + 10000);
          }}
        >
          10,000원
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setGivemoney(givemoney + 20000);
          }}
        >
          20,000원
        </Button>
      </ButtonContainer>
      <SendButoon onClick={giveMoney}>용돈 보내기</SendButoon>
    </GiveMoneyContainer>
  );
};

export default ParentGiveMoney;
