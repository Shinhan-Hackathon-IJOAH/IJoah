import React from 'react';
import { MissionBox } from './MissionListStyles';
import MissionListItem from './MissionListItem';

const MissionList = () => {
    return (
        <div>
            <button>미션</button>
            <button>종료된 미션</button>
            <button>완료 요청된 미션</button>
            <MissionBox>
                <MissionListItem missionid= '1' />
            </MissionBox>

        </div>
    );
};

export default MissionList;