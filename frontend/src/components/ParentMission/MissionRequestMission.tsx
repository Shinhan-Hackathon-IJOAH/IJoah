import React from 'react';
import { useNavigate } from 'react-router-dom';
import {MissionItemContainer,RequestButton,FontTag,MissionTagContainer} from './MissionListItemStyles'
import axios from 'axios';
import { IconButton } from "@material-tailwind/react";

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
            <IconButton color="green">
                ✔
            </IconButton>
            <IconButton color="red">
                ✖
            </IconButton>
        </MissionItemContainer>
    );
};

export default MissionRequestItem;