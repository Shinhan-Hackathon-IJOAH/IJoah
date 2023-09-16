import React, { useEffect, useState } from 'react';
import { MissionContainer, MissionInfoContainer, NameTag } from './MissionListStyles';
import MissionListItem from './MissionListItem';
import MissionCompleteItem from './MissionCompleteItem';
import MissionRequestItem from './MissionRequestMission';
import { Tab } from 'semantic-ui-react';
import axios from 'axios';
import { useSelectChildStore } from '../../store/SelectChildStore';
import { Avatar } from '@material-tailwind/react';
import { useUserStore } from '../../store/UserStore';

interface Mission {
  memberId: number;
  memberName: string;
  profileImage: {
    profileImageId: number;
    fileName: string;
  };
  compeleteMissions: {
    missionId: '';
    missionTitle: '';
    missionReward: '';
  }[];
  incompleteMissions: {
    missionId: '';
    missionTitle: '';
    missionReward: '';
  }[];
  checkingMissions: {
    missionId: '';
    missionTitle: '';
    missionReward: '';
  }[];
}

const MissionList = () => {
  const { childname, childimg } = useSelectChildStore();
  const { id, accessToken, memberRole,countDiary } = useUserStore();
  const [missionlist, setMissionList] = useState<Mission>();
  const getMissionList = () => {
    axios
      .post(
        `https://j9c210.p.ssafy.io/api1/missions/list`,
        {
          memberId: id,
          memberRole: memberRole,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((response) => {
        setMissionList(response.data.data);
        console.log(response.data.data);
        console.log('미션 불러오기 성공');
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };
  useEffect(() => {
    getMissionList();
  }, [countDiary]);
  const panes = [
    {
      menuItem: '진행미션',
      render: () => (
        <Tab.Pane>
          {missionlist?.incompleteMissions?.map((mission) => (
            <MissionListItem
              key={mission.missionId}
              missionid={mission.missionId}
              missiontitle={mission.missionTitle}
              missionamount={mission.missionReward}
            />
          ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: '완료미션',
      render: () => (
        <Tab.Pane>
          {missionlist?.compeleteMissions?.map((mission) => (
            <MissionCompleteItem
              key={mission.missionId}
              missionid={mission.missionId}
              missiontitle={mission.missionTitle}
              missionamount={mission.missionReward}
            />
          ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: '요청미션',
      render: () => (
        <Tab.Pane>
          {missionlist?.checkingMissions?.map((mission) => (
            <MissionRequestItem
              key={mission.missionId}
              missionid={mission.missionId}
              missiontitle={mission.missionTitle}
              missionamount={mission.missionReward}
            />
          ))}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <MissionContainer>
      <MissionInfoContainer>
        <Avatar
          size="lg"
          alt="avatar"
          variant="circular"
          className="border-2 border-white hover:z-10 focus:z-10"
          src={`https://j9c210.p.ssafy.io/api1/diaries/image/${childimg}`}
        />
        <NameTag className="text-2xl text-center font-['HSYuji-Regular']">{childname}의 미션</NameTag>
      </MissionInfoContainer>
      <Tab panes={panes} className="mt-8 flex-col items-center" />
    </MissionContainer>
  );
};

export default MissionList;
