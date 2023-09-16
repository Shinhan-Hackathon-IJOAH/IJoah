import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemPrefix, Avatar, Card, Typography, CardHeader } from '@material-tailwind/react';
import {
  CircleStackIcon,
  BellIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';
import BackPageButton from '../Common/BackPageButton';
import axios from 'axios';
import { useUserStore } from '../../store/UserStore';
import BottomNav from '../Common/BottomNav';
import { IconButton } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ParentTradeList = () => {
  const navigate = useNavigate();
  const { accessToken, account } = useUserStore();
  // 더미데이터
  const dummyData = {
    accountNumber: '110111111111',
    balance: '331551',
    name: '김신한',
    bankTransactionResponses: [
      {
        date: '20230318',
        time: '154602',
        withdrawAccount: '0',
        depositAccount: '1404',
        content: '거래내역1',
        transactionBalance: '331551', //잔액
        type: '1', // 입출금 구분 1: 입금, 2:출금
        category: '1',
      },
    ],
  };

  const [res, setRes] = useState<any>(dummyData);
  useEffect(() => {
    axios
      .post(
        'https://j9c210.p.ssafy.io/api1/bank/transactions',
        {
          accountNumber: account,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        setRes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex justify-center">
      <Card className="w-[100vw] lg:w-[35vw]">
        <CardHeader
          color="orange"
          floated={true}
          shadow={true}
          className="m-0 h-[30vh] grid place-items-center rounded-none md:rounded-xl  px-4 text-center"
        >
          <div style={{ position: 'absolute', top: '15px', left: '15px' }}>
            <IconButton
              onClick={() => navigate(-1)}
              className="rounded-full bg-[#ea4335]  hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </IconButton>
          </div>
          <div className="rounded-full border border-white/10 bg-white/10 p-6 text-white">
            <CreditCardIcon className="h-[7vh] w-[7vh]" />
          </div>
          <div className="flex flex-col">
            <Typography variant="h3" color="white">
              {res.name}님의 거래내역
            </Typography>
            <Typography variant="small" color="white" className="underline mb-0">
              신한은행 {res.accountNumber}
            </Typography>
            <Typography variant="h4" color="white" className="mt-0">
              {res.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </Typography>
          </div>
        </CardHeader>
        <List>
          {res.bankTransactionResponses.map((transaction: any, index: any) => (
            <ListItem key={index}>
              <ListItemPrefix>
                <Avatar variant="circular" alt="candice" src="/img/face-1.jpg" />
              </ListItemPrefix>
              <div className="w-full flex justify-between">
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {transaction.content}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    {`${transaction.time.slice(0, 2)}:${transaction.time.slice(3, 5)}`}
                  </Typography>
                </div>
                <div>
                  {transaction.type === 1 ? (
                    // 원단위 절삭
                    <Typography variant="h6" color="green" className="text-end">
                      {transaction.depositAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                    </Typography>
                  ) : (
                    <Typography variant="h6" color="red" className="text-end">
                      {transaction.withdrawAmount === undefined
                        ? '0원'
                        : `-${transaction.withdrawAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}
                    </Typography>
                  )}
                  <Typography variant="small" color="blue-gray" className="font-normal text-end">
                    {transaction.transactionBalance === undefined
                      ? '0원'
                      : `${transaction.transactionBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}
                  </Typography>
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </Card>
      <div style={{height:'70px'}}/>
      <BottomNav />
    </div>
  );
};

export default ParentTradeList;
