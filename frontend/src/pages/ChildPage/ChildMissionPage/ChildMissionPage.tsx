import React from 'react';
import MissionList from '../../../components/ChildMisson/MissionList';
import { Content } from './ChildMissionPageStyles';
import BottomNav from '../../../components/Common/BottomNav';
import BackPageButton from '../../../components/Common/BackPageButton';

const ChildMissionPage = () => {
    return (
        <Content>
            <BackPageButton/>
            <MissionList/>
            <BottomNav/>
        </Content>
        
    );
};

export default ChildMissionPage;