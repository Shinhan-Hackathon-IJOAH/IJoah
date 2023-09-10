import React,{useEffect, useState} from 'react';
import { MissionContainer,MissionInfoContainer,NameTag } from './MissionListStyles';
import MissionListItem from './MissionListItem';
import { Tab } from "semantic-ui-react";
import axios from 'axios';
import {useSelectChildStore} from '../../store/SelectChildStore'
import Avatar from '@mui/material/Avatar';

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
    const getMissionList = () =>{
        axios
        .get(`....`, {
            headers: {
            Authorization: `Bearer`,
            },
        })
        .then((response) => {
            setMissionList(response.data.result); 
            console.log(response.data.result);
        })
        .catch((error) => {
            console.error('데이터 가져오기 오류:', error);
        });
    }
    useEffect(()=>{
        getMissionList()
    },[])
    const panes = [
        { menuItem: "진행중인 미션", render: () => <Tab.Pane>진행중인 미션
            {missionlist?.progress.map((mission)=>(
                <MissionListItem missionid={mission.id} missiontitle={mission.title} missionamount={mission.amount} missionnickname={mission.nickname}/>
            ))}
            <MissionListItem missionid= '1' missiontitle='얼른 api 주세요' missionamount='80808080' missionnickname='김성준'/>
        </Tab.Pane> },
        { menuItem: "완료된 미션", render: () => <Tab.Pane>완료된 미션
            {missionlist?.compelete.map((mission)=>(
                <MissionListItem missionid={mission.id} missiontitle={mission.title} missionamount={mission.amount} missionnickname={mission.nickname}/>
            ))}
        </Tab.Pane> },
        { menuItem: "완료 요청된 미션", render: () => <Tab.Pane>완료요청된 미션
            {missionlist?.request.map((mission)=>(
                <MissionListItem missionid={mission.id} missiontitle={mission.title} missionamount={mission.amount} missionnickname={mission.nickname}/>
            ))}
        
        </Tab.Pane>,
        },
      ];
    return (
        <MissionContainer>
            <MissionInfoContainer>
                <Avatar
                        variant="circular"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        src={childimg}
                        />
                <NameTag className="text-2xl text-center font-['HSYuji-Regular']">{childname}의 미션</NameTag>
            </MissionInfoContainer>
            <Tab panes={panes} className="mt-8"/>
        </MissionContainer>
    );
};

export default MissionList;