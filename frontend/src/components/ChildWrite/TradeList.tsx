import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@material-tailwind/react";
import {
  BellIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

interface TradeList {
  id: number;
  bgColor: string;
  title: string;
  time: string;
  amount: string;
}

const TradeList = () => (
  <div className="mt-10">
    <div className="flex justify-center w-[100vw] font-['HSYuji-Regular']  text-2xl mb-5">
      오늘은 무엇을 샀나요?
    </div>
    <div className="container mx-auto w-[80vw] h-full  xl::w-[50vw]">
      <div className="relative wrap overflow-hidden p-h-full">
        <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>
        {/* 거래내역1 */}

        <div className="mb-8 flex justify-between items-center w-full right-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
          </div>
          <div className="order-1 bg-[#F8A70C] rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-2 font-bold text-white text-center text-md lg:text-xl font-['HSYuji-Regular']">
              거래내역 1
            </h3>
            <p className="text-sm leading-snug tracking-wide text-center text-white text-opacity-100 font-['HSYuji-Regular']">
              08시 40분
            </p>
            <p className="text-sm leading-snug tracking-wide text-center text-white text-opacity-100 font-['HSYuji-Regular']">
              5,000원
            </p>
          </div>
        </div>
        {/* 거래내역2 */}
        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
          </div>
          <div className="order-1 bg-[#FF8A3D] rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-2 font-bold text-white text-center text-md lg:text-xl font-['HSYuji-Regular']">
              거래내역 1
            </h3>
            <p className="text-sm leading-snug tracking-wide text-center text-white text-opacity-100 font-['HSYuji-Regular']">
              08시 40분
            </p>
            <p className="text-sm leading-snug tracking-wide text-center text-white text-opacity-100 font-['HSYuji-Regular']">
              5,000원
            </p>
          </div>
        </div>
        {/* 거래내역3 flex-row-reverse가 있고 없고 차이 => 즉, 홀수일때는 없고 짝수일때는 있게 설정하면 될듯. 컬러도 다르게! */}
        <div className="mb-8 flex justify-between  items-center w-full right-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto text-white font-semibold text-lg">3</h1>
          </div>
          <div className="order-1 bg-[#F8A70C] rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-2 font-bold text-white text-center text-md lg:text-xl font-['HSYuji-Regular']">
              거래내역 1
            </h3>
            <p className="text-sm leading-snug tracking-wide text-center text-white text-opacity-100 font-['HSYuji-Regular']">
              08시 40분
            </p>
            <p className="text-sm leading-snug tracking-wide text-center text-white text-opacity-100 font-['HSYuji-Regular']">
              5,000원
            </p>
          </div>
        </div>
        {/* 거래내역4 */}
        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
          </div>
          <div className="order-1 bg-[#FF8A3D] rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-2 font-bold text-white text-center text-md lg:text-xl font-['HSYuji-Regular']">
              거래내역 1
            </h3>
            <p className="text-sm leading-snug tracking-wide text-center text-white text-opacity-100 font-['HSYuji-Regular']">
              08시 40분
            </p>
            <p className="text-sm leading-snug tracking-wide text-center text-white text-opacity-100 font-['HSYuji-Regular']">
              5,000원
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default TradeList;
