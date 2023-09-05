import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ParentGiveMoney from '../../../components/ParentGiveMoney/ParentGiveMoney';

const ParentGiveMoneyPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <ParentGiveMoney/>
            <button>용돈 보내기</button>
            <button onClick={()=> {
                navigate(-1);
            }}>뒤로 가기</button>
        </div>
    );
};

export default ParentGiveMoneyPage;