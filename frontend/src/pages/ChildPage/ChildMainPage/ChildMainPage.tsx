import React from "react";
import ChildInfo from "../../../components/ChildMain/ChildInfo";
import ChildMissionButton from "../../../components/ChildMain/ChildMissionButton";
import ReadDirayButton from "../../../components/ChildMain/ReadDirayButton";
import WriteDiaryButton from "../../../components/ChildMain/WriteDiaryButton";
import TradeListButton from "../../../components/ChildMain/TradeListButton";
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
