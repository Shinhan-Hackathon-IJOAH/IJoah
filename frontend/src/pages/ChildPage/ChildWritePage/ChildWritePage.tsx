import React, { useEffect } from "react";
import DiaryCalender from "../../../components/ChildWrite/DiaryCalender";
import TradeList from "../../../components/ChildWrite/TradeList";
import UploadPicture from "../../../components/ChildWrite/UploadPicture";
import VoiceRecord from "../../../components/ChildWrite/VoiceRecord";
import BottomButton from "../../../components/ChildWrite/BottomButton";
import MoodWeather from "../../../components/ChildWrite/MoodWeather";
import WriteDiary from "../../../components/ChildWrite/WriteDiary";
import { useDiaryStore } from "../../../store/DiaryStore";
import { Carousel } from "@material-tailwind/react";
const ChildWritePage = () => {
  const {
    setWeatherMood,
    setPicture,
    setVoice,
    setContent,
    setTitle,
    setDate,
  } = useDiaryStore();
  // 여기 들어왔을때 스토어 값 불러와서 useEffect활용해서 모두 초기화해주기.
  useEffect(() => {
    setTitle("");
    setContent("");
    setDate("");
    setPicture([]);
    setVoice("");
    setWeatherMood("");
  }, []);

  return (
    <div className="bg-[#ffecc8] w-[100vw]">
      <div className="h-[20vh] flex flex-col justify-center items-center text-3xl font-semibold font-['HSYuji-Regular']">
        <p className="text-center">김하영님,</p>
        <p className="text-center mt-2">용돈일기를 작성해볼까요?</p>
      </div>
      <DiaryCalender></DiaryCalender>
      <TradeList></TradeList>
      <MoodWeather></MoodWeather>
      <WriteDiary></WriteDiary>
      <UploadPicture></UploadPicture>
      {/* <VoiceRecord></VoiceRecord> */}
      <BottomButton></BottomButton>
    </div>
  );
};

export default ChildWritePage;
