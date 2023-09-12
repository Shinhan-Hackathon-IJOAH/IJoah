import React, { useEffect } from 'react';
import DiaryCalender from '../../../components/ChildWrite/DiaryCalender';
import TradeList from '../../../components/ChildWrite/TradeList';
import UploadPicture from '../../../components/ChildWrite/UploadPicture';
import VoiceRecord from '../../../components/ChildWrite/VoiceRecord';
import BottomButton from '../../../components/ChildWrite/BottomButton';
import MoodWeather from '../../../components/ChildWrite/MoodWeather';
import WriteDiary from '../../../components/ChildWrite/WriteDiary';
import { useDiaryStore } from '../../../store/DiaryStore';
import BackPageButton from '../../../components/Common/BackPageButton';
const ChildWritePage = () => {
  const { date, setDate } = useDiaryStore();
  return (
    <div className="bg-[#ffecc8] w-[100vw] h-screen overflow-auto">
      <BackPageButton></BackPageButton>
      <div className="h-[20vh] flex flex-col justify-center items-center text-3xl font-semibold font-['HSYuji-Regular']">
        <p className="text-center">김하영님,</p>
        <p className="text-center mt-2">용돈일기를 작성해볼까요?</p>
      </div>
      <DiaryCalender></DiaryCalender>
      <div className="h-full">
        {date !== '' && (
          <div>
            <TradeList></TradeList>
            <MoodWeather></MoodWeather>
            <WriteDiary></WriteDiary>
            <UploadPicture></UploadPicture>
            <BottomButton></BottomButton>
            {/* <VoiceRecord></VoiceRecord> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildWritePage;
