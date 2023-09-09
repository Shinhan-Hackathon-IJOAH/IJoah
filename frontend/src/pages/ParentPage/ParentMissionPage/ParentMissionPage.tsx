import React from 'react';
import MissionList from '../../../components/ParentMission/MissionList';
import { Content } from './ParentMissionPageStyles';
import BottomNav from '../../../components/Common/BottomNav';
import BackPageButton from '../../../components/Common/BackPageButton';

const ParentMissionPage = () => {
    return (
        <Content>
            <BackPageButton/>
            
            <MissionList/>
            <BottomNav/>
        </Content>
    );
};

export default ParentMissionPage;