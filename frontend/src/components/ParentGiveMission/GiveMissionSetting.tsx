import React,{useState} from 'react';
const GiveMissionSetting = () => {
    const [missionTitle, setMissionTitle] = useState('');
    const [missionPeriod, setMissionPeriod] = useState('');
    const [missionReward, setMissionReward] = useState('');
    return (
        <div>

            <div>신한이 미션 부여 페이지</div>
            <input type="text" placeholder="미션 제목"></input>
            <input type="text" placeholder="기간"></input>
            <input type="text" placeholder="미션 보상"></input>

        </div>
    );
};

export default GiveMissionSetting;