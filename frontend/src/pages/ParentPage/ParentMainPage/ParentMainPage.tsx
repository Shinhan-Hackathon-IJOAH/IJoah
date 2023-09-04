import React from 'react';
import ParentInfo from '../../../components/ParentMain/ParentInfo';
import PatternButton from '../../../components/ParentMain/PatternButton';
import GivMissionButton from '../../../components/ParentMain/GiveMissionButton';
import GiveMoneyButton from '../../../components/ParentMain/GiveMoneyButton';
import TradeListButton from '../../../components/ParentMain/TradeListButton';
import MissionButton from '../../../components/ParentMain/MissionButton';
import BottomNav from "../../../components/Common/BottomNav";
import Avatar from '@mui/material/Avatar';
import createprofile from '../../../asset/createprofile.png'
import { useNavigate } from 'react-router-dom';

const ParentMainPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <ParentInfo/>
            <Avatar alt="Remy Sharp" src="" />
            {/* 이거 map으로 연결된 아이디 나열 */}
            <button onClick={() => {
                navigate("/parent/register");
            }}>
            <Avatar alt="Remy Sharp" src={createprofile}/>
            </button>
            <GiveMoneyButton/>
            <GivMissionButton/>
            <TradeListButton/>
            <MissionButton/>
            <PatternButton/>
            <BottomNav/>
        </div>
    );
};

export default ParentMainPage;