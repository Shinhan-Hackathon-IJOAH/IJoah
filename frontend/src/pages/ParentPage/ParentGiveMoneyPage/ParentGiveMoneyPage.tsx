import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ParentGiveMoney from '../../../components/ParentGiveMoney/ParentGiveMoney';
import BottomNav from '../../../components/Common/BottomNav';
import {GiveMoneyContent} from './ParentGinveMoneyStyles'

const ParentGiveMoneyPage = () => {
    const navigate = useNavigate();

    return (
        <GiveMoneyContent>
            <ParentGiveMoney/>
            <button onClick={()=> {
                navigate(-1);
            }}>뒤로 가기</button>
            <BottomNav/>
        </GiveMoneyContent>
    );
};

export default ParentGiveMoneyPage;