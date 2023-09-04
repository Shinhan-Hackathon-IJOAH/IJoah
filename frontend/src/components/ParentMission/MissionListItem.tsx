import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MissionListItemProps{
    missionid: string;
}

const MissionListItem: React.FC<MissionListItemProps> = ({missionid}) => {
    const navigate = useNavigate();
    const detailClick = ()=>{
        navigate(`/child/mission/detail/${missionid}`)
    } 
    return (
        <div onClick={detailClick}>
            {missionid}
        </div>
    );
};

export default MissionListItem;