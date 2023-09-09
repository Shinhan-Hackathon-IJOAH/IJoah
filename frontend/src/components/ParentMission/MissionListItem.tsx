import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MissionListItemProps{
    missionid: string;
    missiontitle:string;
    missionnickname:string;
    missionamount:string;
}

const MissionListItem: React.FC<MissionListItemProps> = ({missionid,missiontitle,missionnickname,missionamount}) => {
    const navigate = useNavigate();
    const detailClick = ()=>{
        navigate(`/child/mission/detail/${missionid}`)
    } 
    return (
        <div onClick={detailClick}>
            미션제목:{missiontitle}
            미션 보상:{missionamount}원
        </div>
    );
};

export default MissionListItem;