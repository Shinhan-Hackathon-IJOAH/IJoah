import React from "react";
import DiaryCalender from "../../../components/ChildWrite/DiaryCalender";
import TradeList from "../../../components/ChildWrite/TradeList";
import UploadPicture from "../../../components/ChildWrite/UploadPicture";
import VoiceRecord from "../../../components/ChildWrite/VoiceRecord";
import BottomButton from "../../../components/ChildWrite/BottomButton";
import MoodWeather from "../../../components/ChildWrite/MoodWeather";
import WriteDiary from "../../../components/ChildWrite/WriteDiary";

const ChildWritePage = () => {
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
