import React from 'react';
import { useNavigate } from 'react-router-dom';
import {MissionItemContainer,CompleteButton,FontTag,MissionTagContainer} from './MissionListItemStyles'
import axios from 'axios';

interface MissionListItemProps{
    missionid: string;
    missiontitle:string;
   
    missionamount:string;
}

const MissionListItem: React.FC<MissionListItemProps> = ({missionid,missiontitle,missionamount}) => {
    const navigate = useNavigate();
    const detailClick = ()=>{
        navigate(`/parent/mission/detail/${missionid}`)
    } 
    return (
        <MissionItemContainer >
            <MissionTagContainer onClick={detailClick}>
                <FontTag>
                미션제목:{missiontitle}
                </FontTag>
                <FontTag>
                미션 보상:{missionamount}원
                </FontTag>
            </MissionTagContainer>
            <CompleteButton>진행중</CompleteButton>
        </MissionItemContainer>
    );
};

export default MissionListItem;