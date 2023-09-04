import React from 'react';
import ParentInfo from '../../../components/ParentMission/ParentInfo';
import MissionList from '../../../components/ParentMission/MissionList';
import { Content } from './ParentMissionPageStyles';

const ParentMissionPage = () => {
    return (
        <Content>
            <ParentInfo/>
            <MissionList/>
        </Content>
    );
};

export default ParentMissionPage;