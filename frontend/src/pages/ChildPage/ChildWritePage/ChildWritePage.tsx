import React from "react";
import DiaryCalender from "../../../components/ChildWritePage/DiaryCalender";
import TradeList from "../../../components/ChildWritePage/TradeList";
const ChildWritePage = () => {
  return (
    <div>
      <div>오늘의 용돈일기를 작성해볼까요?</div>
      <TradeList></TradeList>
      <DiaryCalender></DiaryCalender>
    </div>
  );
};

export default ChildWritePage;
