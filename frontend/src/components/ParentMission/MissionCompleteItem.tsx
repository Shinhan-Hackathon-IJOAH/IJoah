import React from 'react';
import { useNavigate } from 'react-router-dom';
import {MissionItemContainer,FontTag,MissionTagContainer,CompeleteFont} from './MissionListItemStyles'


interface MissionListItemProps{
    missionid: string;
    missiontitle:string;
    missionnickname:string;
    missionamount:string;
}

const MissionCompleteItem: React.FC<MissionListItemProps> = ({missionid,missiontitle,missionnickname,missionamount}) => {
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
            <CompeleteFont>완료</CompeleteFont>
        </MissionItemContainer>
    );
};

export default MissionCompleteItem;