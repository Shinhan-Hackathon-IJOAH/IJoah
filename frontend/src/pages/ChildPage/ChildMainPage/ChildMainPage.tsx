import React from "react";
import ChildInfo from "../../../components/ChildMainPage/ChildInfo";
import ChildMissionButton from "../../../components/ChildMainPage/ChildMissionButton";
import ReadDirayButton from "../../../components/ChildMainPage/ReadDirayButton";
import WriteDiaryButton from "../../../components/ChildMainPage/WriteDiaryButton";
import TradeListButton from "../../../components/ChildMainPage/TradeListButton";
import BottomNav from "../../../components/Common/BottomNav";

import { Button } from "@material-tailwind/react";
const ChildMainPage = () => {
  return (
    <div>
      <ChildInfo />
      <ChildMissionButton />
      <ReadDirayButton />
      <WriteDiaryButton />
      <TradeListButton />

      <BottomNav />
    </div>
  );
};

export default ChildMainPage;
