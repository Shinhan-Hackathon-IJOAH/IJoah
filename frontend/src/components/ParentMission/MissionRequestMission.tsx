import React from 'react';
import { useNavigate } from 'react-router-dom';
import {MissionItemContainer,RequestButton,FontTag,MissionTagContainer} from './MissionListItemStyles'
import axios from 'axios';

interface MissionListItemProps{
    missionid: string;
    missiontitle:string;
    missionnickname:string;
    missionamount:string;
}

const MissionRequestItem: React.FC<MissionListItemProps> = ({missionid,missiontitle,missionnickname,missionamount}) => {
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
            <RequestButton >요청중</RequestButton>
        </MissionItemContainer>
    );
};

export default MissionRequestItem;