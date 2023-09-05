import React, { useEffect } from "react";
import DiaryCalender from "../../../components/ChildWrite/DiaryCalender";
import TradeList from "../../../components/ChildWrite/TradeList";
import UploadPicture from "../../../components/ChildWrite/UploadPicture";
import VoiceRecord from "../../../components/ChildWrite/VoiceRecord";
import BottomButton from "../../../components/ChildWrite/BottomButton";
import MoodWeather from "../../../components/ChildWrite/MoodWeather";
import WriteDiary from "../../../components/ChildWrite/WriteDiary";
import { useDiaryStore } from "../../../store/DiaryStore";

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
    setPicture("");
    setVoice("");
    setWeatherMood("");
  }, []);

  return (
    <div>
      <div>오늘의 용돈일기를 작성해볼까요?</div>
      <hr></hr>
      <TradeList></TradeList>
      <hr></hr>
      <DiaryCalender></DiaryCalender>
      <hr></hr>
      <MoodWeather></MoodWeather>
      <WriteDiary></WriteDiary>
      <hr></hr>
      <UploadPicture></UploadPicture>
      <hr></hr>
      <VoiceRecord></VoiceRecord>
      <hr></hr>
      <BottomButton></BottomButton>
    </div>
  );
};

export default ChildWritePage;
