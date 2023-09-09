import React from "react";
import { MissionBox } from "./MissionListStyles";
import MissionListItem from "./MissionListItem";
import { Tab } from "semantic-ui-react";

const MissionList = () => {
  const panes = [
    { menuItem: "종료된 미션", render: () => <Tab.Pane>종료된 미션</Tab.Pane> },
    { menuItem: "완료된 미션", render: () => <Tab.Pane>미션 완료</Tab.Pane> },
    {
      menuItem: "진행중 미션",
      render: () => <Tab.Pane>진행중 미션?</Tab.Pane>,
    },
  ];
  return (
    <div>
      <Tab panes={panes} />

      <MissionBox>
        <MissionListItem missionid="1" />
      </MissionBox>
    </div>
  );
};

export default MissionList;
