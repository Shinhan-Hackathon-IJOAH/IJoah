import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Carousel, Textarea } from '@material-tailwind/react';
import { useUserStore } from '../../store/UserStore';
import { Icon } from 'semantic-ui-react';
import TradeList from '../ChildWrite/TradeList';
// import {Diary} from './DiaryContentStyles'
import axios from 'axios';
interface DiaryContentProps {
  selectdate: string;
  diaryId: string;
}
interface Diary {
  diaryId: number;
  title: string;
  content: string;
  emotion: string;
  diary_date: string;
  images: {
    storeFileName: string;
    diaryImageId: string;
    uploadFileName: string;
  }[];

  record: string;
}

const DiaryContent: React.FC<DiaryContentProps> = ({ selectdate, diaryId }) => {
  const { accessToken } = useUserStore();
  const [diary, setDiary] = useState<Diary>();

  // diaryId 값이 바뀔 때마다 axios get 요청하는 함수
  useEffect(() => {
    axios
      .get(`https://ijoah01.duckdns.org/api/diaries/${diaryId}`, {
        headers: {
          // Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log('일기 내용 불러오는 거 성공함');
        console.log(res.data);
        setDiary(res.data);
      })
      .catch((err) => {
        console.log('에러..');
        console.log(err);
      });
  }, [diaryId]);
  return (
    <div className="gap-14 flex flex-col lg:w-[35vw]">
      {/* 일기 쓴 날짜 */}
      <div className="text-center mt-10">
        <Typography className="font-['HSYuji-Regular']" variant="h2">
          날짜: 2023-09-16 {diary?.diary_date}
        </Typography>
      </div>

      {/* 제목 */}
      <div className="text-center mx-5 -mb-7">
        <Typography className="font-['HSYuji-Regular']" variant="h3">
          오늘은 잠을 못 잘 것 같습니다. {diary?.title}
        </Typography>
      </div>
      {/* 내용 */}
      {/* 거래내역 */}
      <div className=" flex justify-center items-center">
        <TradeList />
      </div>
      {/* 일기 쓴 날짜의 기분 날씨 */}
      <div className="">
        <div className="text-2xl text-center font-['HSYuji-Regular']">
          {diary?.diary_date} 9월 16일의 기분 날씨는 어땠나요 ?
        </div>
        <div className="flex mt-5 gap-4 justify-center">
          <div>
            <Avatar
              size="lg"
              alt="avatar"
              src="/weather/sunny.png"
              className={`border p-1 opacity-30 border-[#F8A70C] shadow-md shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
                diary?.emotion === 'sunny' ? 'ring-[red] ring-2 !opacity-100 border-[red]' : ''
              }`}
            />
          </div>
          <div>
            <Avatar
              size="lg"
              alt="avatar"
              src="/weather/sunrise.png"
              className={`border p-1 opacity-30 border-[#F8A70C] shadow-md shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
                diary?.emotion === 'sunrise' ? 'ring-[red] ring-2 !opacity-100 border-[red]' : ''
              }`}
            />
          </div>
          <div>
            <Avatar
              size="lg"
              alt="avatar"
              src="/weather/drop.png"
              className={`border p-1 border-[#F8A70C] opacity-30 shadow-md shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
                diary?.emotion === 'drop' ? 'ring-[red]  !opacity-100 ring-2 border-[red]' : ''
              }`}
            />
          </div>
          <div>
            <Avatar
              size="lg"
              alt="avatar"
              src="/weather/wind.png"
              className={`border p-1 border-[#F8A70C] shadow-md opacity-30 shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
                diary?.emotion === 'wind' ? 'ring-[red] ring-2 !opacity-100 border-[red]' : ''
              }`}
            />
          </div>
          <div>
            <Avatar
              size="lg"
              alt="avatar"
              src="/weather/thunder.png"
              className={`border p-1 border-[#F8A70C] shadow-md opacity-30 shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
                diary?.emotion === 'thunder' ? 'ring-[red] ring-2 !opacity-100 border-[red]' : ''
              }`}
            />
          </div>
        </div>
        <div className="mx-5 mt-10 flex flex-col items-center justify-center ">
          <Typography variant="h4" className="mt-10 text-center font-['HSYuji-Regular'] ">
            일기 내용
          </Typography>
          <div className="border rounded-lg border-[3px] border-orange-500 p-5 md:w-[50vw] lg:w-[35vw] bg-white">
            <Typography className="text-lg font-['HSYuji-Regular']">
              가나다라마바사 아자차카타파하 아자창ㄹ머ㅣ퍼ㅏㄴ아ㅓㄹㄴㅁ어ㅏ러ㅣㄴㅁㄹ머ㅏ이러아머ㅏㄴㅇ 동해물과
              백두산이 마르고 닳도록, 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이
              보전하세.
            </Typography>
          </div>
        </div>
        {/* <Textarea color="blue" label="Textarea Blue" className="bg-white" readOnly>
            {diary?.content}
          </Textarea> */}
      </div>

      <div>
        <Typography variant="h4" className="mt-7 mx-5 text-center font-['HSYuji-Regular']">
          사진
        </Typography>

        {diary == null ? (
          <div className="mb-10">
            <img
              className="h-96 w-96 w-full rounded-lg object-contain object-center shadow-xl"
              src="/diary/noImage.png"
              alt="noImage"
            />
            <Typography className="text-center text-md mt-10 font-['HSYuji-Regular']">
              해당일에 업로드한 사진이 없습니다<div className=""></div>
            </Typography>
          </div>
        ) : (
          ''
        )}
        {/* 일기 쓴 날짜의 사진 */}

        <Carousel
          className="rounded-xl"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill('').map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {diary?.images.map((image, index) => (
            // 각 이미지 객체에서 storeFileName에 접근
            <img
              className="h-96 w-96 w-full rounded-lg object-contain object-center shadow-xl shadow-blue-gray-900/50"
              key={index}
              src={`https://ijoah01.duckdns.org/api/diaries/image/${image.storeFileName}`}
              alt={`Selected ${index}`}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default DiaryContent;
