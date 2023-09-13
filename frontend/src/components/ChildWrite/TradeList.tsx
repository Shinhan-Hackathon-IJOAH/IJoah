import React, { useEffect, useState } from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from '@material-tailwind/react';
import { BellIcon, ArchiveBoxIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

import axios from 'axios';
import { useDiaryStore } from '../../store/DiaryStore';
import { useUserStore } from '../../store/UserStore';
interface TradeList {
  id: number;
  bgColor: string;
  title: string;
  time: string;
  amount: string;
}

const TradeList = () => {
  const { date } = useDiaryStore();
  const { accessToken } = useUserStore();
  // const dummyData = {
  //   accountNumber: '110111222222',
  //   balance: 100000,
  //   name: '김신한',
  //   bankTransactionResponses: [
  //     {
  //       date: '2023-09-02',
  //       time: '14:25:00',
  //       withdrawAmount: 10000,
  //       depositAmount: 0,
  //       content: '다이소',
  //       transactionBalance: 1200000,
  //       type: 2,
  //       category: 2,
  //     },
  //     {
  //       date: '2023-09-02',
  //       time: '14:25:00',
  //       withdrawAmount: 10000,
  //       depositAmount: 0,
  //       content: '다이소',
  //       transactionBalance: 1200000,
  //       type: 2,
  //       category: 2,
  //     },
  //     {
  //       date: '2023-09-02',
  //       time: '14:25:00',
  //       withdrawAmount: 10000,
  //       depositAmount: 0,
  //       content: '다이소',
  //       transactionBalance: 1200000,
  //       type: 2,
  //       category: 2,
  //     },
  //     {
  //       date: '2023-09-02',
  //       time: '14:25:00',
  //       withdrawAmount: 10000,
  //       depositAmount: 0,
  //       content: '다이소',
  //       transactionBalance: 1200000,
  //       type: 2,
  //       category: 2,
  //     },
  //     {
  //       date: '2023-09-02',
  //       time: '14:25:00',
  //       withdrawAmount: 10000,
  //       depositAmount: 0,
  //       content: '다이소',
  //       transactionBalance: 1200000,
  //       type: 2,
  //       category: 2,
  //     },
  //   ],
  // };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    return `${month} ${day}일`;
  };

  const [oneDayTransaction, setOneDayTransaction] = useState<any[]>([]);

  // 이 부분 때문에 무한 루프 에러 뜸.
  // useEffect(() => {
  //   setOneDayTransaction(dummyData.bankTransactionResponses);
  // }, []);

  // 날짜 바뀔때마다 useEffect 쏘는 곳.
  useEffect(() => {
    axios
      .post(
        'https://ijoah01.duckdns.org/api/bank/oneday-transactions',
        {
          date: date,
          accountNumber: '110111222222',
        },
        {
          headers: {
            // Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        setOneDayTransaction(res.data.bankTransactionResponses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

  return (
    <div className="mt-10">
      <div className="flex justify-center w-[100vw] font-['HSYuji-Regular']  text-2xl mb-5">{formatDate(date)}에는 무엇을 샀나요?</div>
      <div className="container mx-auto w-[80vw] h-full xl::w-[50vw]">
        <div className="relative wrap overflow-hidden p-h-full">
          <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>

          { oneDayTransaction.length === 0 ? (
          <Typography className="text-center" variant='h6'>아직 거래 내역이 없어요 !</Typography>) : 
          
          (oneDayTransaction.map((transaction, index) => (
            <div
              key={index}
              className={`mb-8 flex justify-between items-center w-full ${
                index % 2 === 0 ? 'right-timeline flex-row-reverse' : 'left-timeline'
              }`}
            >
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
              </div>
              <div
                className={`order-1 rounded-lg shadow-xl w-5/12 px-6 py-4
                ${index % 2 === 0 ? 'bg-[#FF8A3D]' : 'bg-[#F8A70C]'}
                `}
              >
                <h3 className="mb-2 font-bold text-white text-center text-md lg:text-xl font-['HSYuji-Regular']">
                  {transaction.content}
                </h3>
                <p className="text-sm leading-snug tracking-wide text-center text-white text-opacity-100 font-['HSYuji-Regular']">
                  {transaction.time}
                </p>
                <p className="text-sm leading-snug tracking-wide text-center text-white text-opacity-100 font-['HSYuji-Regular']">
                  {transaction.type === 1 ? `+${transaction.depositAmount}원` : `-${transaction.withdrawAmount}원`}
                </p>
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};
export default TradeList;
