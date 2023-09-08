import React from 'react';
import GiveMissionDetail from '../../../components/ParentGiveMission/GiveMissionDetail';
import {useNavigate} from 'react-router-dom';
import BottomNav from '../../../components/Common/BottomNav'

const ParentGiveMissionPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <GiveMissionDetail />
            <button onClick={()=>{
                navigate(-1);
            }}>뒤로 가기</button>
            <BottomNav/>
        </div>
    );
};

export default ParentGiveMissionPage;