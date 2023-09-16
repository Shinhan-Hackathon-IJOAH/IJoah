import React from 'react';
import GiveMissionDetail from '../../../components/ParentGiveMission/GiveMissionDetail';
import {useNavigate} from 'react-router-dom';
import BottomNav from '../../../components/Common/BottomNav'
import {GiveMissionContent} from './ParentGiveMissionStyles'
import BackPageButton from '../../../components/Common/BackPageButton'

const ParentGiveMissionPage = () => {
    const navigate = useNavigate();
    return (
        <GiveMissionContent>
            <BackPageButton/>
            <GiveMissionDetail />
            <BottomNav/>
        </GiveMissionContent>
    );
};

export default ParentGiveMissionPage;