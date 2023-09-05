import React from 'react';
import GiveMissionDetail from '../../../components/ParentGiveMission/GiveMissionDetail';
import GiveMissionSetting from '../../../components/ParentGiveMission/GiveMissionSetting';
import {useNavigate} from 'react-router-dom';
const ParentGiveMissionPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <GiveMissionSetting/>
            <GiveMissionDetail />

            <button>미션 등록</button>
            <button onClick={()=>{
                navigate(-1);
            }}>뒤로 가기</button>
        </div>
    );
};

export default ParentGiveMissionPage;