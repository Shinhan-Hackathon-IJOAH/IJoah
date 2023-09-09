import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ParentGiveMoney from '../../../components/ParentGiveMoney/ParentGiveMoney';
import BottomNav from '../../../components/Common/BottomNav';
import {GiveMoneyContent} from './ParentGinveMoneyStyles'
import BackPageButton from '../../../components/Common/BackPageButton';

const ParentGiveMoneyPage = () => {

    return (
        <GiveMoneyContent>
            <BackPageButton/>
            <ParentGiveMoney/>
            <BottomNav/>
        </GiveMoneyContent>
    );
};

export default ParentGiveMoneyPage;