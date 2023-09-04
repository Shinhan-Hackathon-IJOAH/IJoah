import React from 'react';
import ParentInfo from '../../../components/ParentMain/ParentInfo';
import PatternButton from '../../../components/ParentMain/PatternButton';
import GivMissionButton from '../../../components/ParentMain/GiveMissionButton';
import GiveMoneyButton from '../../../components/ParentMain/GiveMoneyButton';
import TradeListButton from '../../../components/ParentMain/TradeListButton';
import MissionButton from '../../../components/ParentMain/MissionButton';
import BottomNav from "../../../components/Common/BottomNav";

const ParentMainPage = () => {
    return (
        <div>
            <ParentInfo/>
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