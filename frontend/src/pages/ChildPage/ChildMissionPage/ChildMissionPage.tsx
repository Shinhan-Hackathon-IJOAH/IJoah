import React from 'react';
import ChildInfo from '../../../components/ChildMisson/ChildInfo';
import MissionList from '../../../components/ChildMisson/MissionList';
import { Content } from './ChildMissionPageStyles';

const ChildMissionPage = () => {
    return (
        <Content>
            <ChildInfo/>
            <MissionList/>
        </Content>
        
    );
};

export default ChildMissionPage;