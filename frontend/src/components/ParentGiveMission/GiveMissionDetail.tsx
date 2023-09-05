import React, {useState} from 'react';

const GiveMissionDetail = () => {
    const [missionDetail, setMissionDetail] = useState('');
    return (
        <div>
            <input type="text" placeholder="미션 내용"></input>
            
        </div>
    );
};

export default GiveMissionDetail;