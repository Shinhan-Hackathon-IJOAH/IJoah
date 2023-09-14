import React,{useEffect, useState} from 'react';
import { MissionContainer,MissionInfoContainer,NameTag } from './MissionListStyles';
import MissionListItem from './MissionListItem';
import MissionCompleteItem from './MissionCompleteItem';
import MissionRequestItem from './MissionRequestMission';
import { Tab } from "semantic-ui-react";
import axios from 'axios';
import {useSelectChildStore} from '../../store/SelectChildStore'
import {Avatar} from "@material-tailwind/react";
import {useUserStore} from "../../store/UserStore"

interface Mission {
    compelete: {
        id: '';
        title: '';
        nickname:'';
        amount:'';
        }[];
    progress: {
        id: '';
        title: '';
        nickname:'';
        amount:'';
        }[];
    request: {
        id: '';
        title: '';
        nickname:'';
        amount:'';
        }[];
  }

const MissionList = () => {
    const {childname,childimg}=useSelectChildStore();
    const [missionlist, setMissionList] = useState<Mission>();
    const {accessToken} =useUserStore()
    const getMissionList = () =>{
        axios
        .get(`....`, {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            setMissionList(response.data.data); 
            console.log(response.data.data);
        })
        .catch((error) => {
            console.error('데이터 가져오기 오류:', error);
        });
    }
    useEffect(()=>{
        getMissionList()
    },[])
    const panes = [
        { menuItem: "진행미션", render: () => <Tab.Pane>
            {missionlist?.progress.map((mission)=>(
                <MissionListItem missionid={mission.id} missiontitle={mission.title} missionamount={mission.amount} missionnickname={mission.nickname}/>
            ))}
            <MissionListItem missionid= '1' missiontitle='얼른 api 주세요' missionamount='80808080' missionnickname='김성준'/>
            <MissionListItem missionid= '1' missiontitle='얼른 api 주세요' missionamount='80808080' missionnickname='김성준'/>
        </Tab.Pane> },
        { menuItem: "완료미션", render: () => <Tab.Pane>
            {missionlist?.compelete.map((mission)=>(
                <MissionCompleteItem missionid={mission.id} missiontitle={mission.title} missionamount={mission.amount} missionnickname={mission.nickname}/>
            ))}
            <MissionCompleteItem missionid='1' missiontitle='얼른 api 주세요' missionamount='80808080' missionnickname='김성준'/>
        </Tab.Pane> },
        { menuItem: "요청미션", render: () => <Tab.Pane>
            {missionlist?.request.map((mission)=>(
                <MissionRequestItem missionid={mission.id} missiontitle={mission.title} missionamount={mission.amount} missionnickname={mission.nickname}/>
            ))}
            <MissionRequestItem missionid='1' missiontitle='얼른 api 주세요' missionamount='80808080' missionnickname='김성준'/>
        </Tab.Pane>,
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
                src="https://mblogthumb-phinf.pstatic.net/MjAxOTEyMTdfMTc1/MDAxNTc2NTYxNTQ3NzIx.p8eX1YYqm9QGjYLNCrlkBmCfzoj1wTOowHbEfYLv5zgg.mctQlrrCcMBGbMcxxwtApGnqVZGCf2AeqLUm0dF9rZkg.PNG.imagecompany/%EC%9C%A0%EC%95%84%ED%94%84%EB%A1%9C%ED%95%84%EC%82%AC%EC%A7%84_2.png?type=w800"
                />
                <NameTag className="text-2xl text-center font-['HSYuji-Regular']">{childname}의 미션</NameTag>
            </MissionInfoContainer>
            <Tab panes={panes} className="mt-8 flex-col items-center"/>
        </MissionContainer>
    );
};

export default MissionList;