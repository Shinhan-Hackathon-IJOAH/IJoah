import React from 'react';
import { useNavigate } from "react-router-dom";
import { TradeListContainer,TradeImg,FontTag } from "./TradeListButtonStyles" 
import {useUserStore} from "../../store/UserStore"
import Swal from 'sweetalert2';

const TradeListButton = () => {
    const navigate = useNavigate();
    const {account} =useUserStore();
    const handleNav =() =>{
        if (account===''){
            Swal.fire({
                icon: 'warning',
                title: '계좌를 등록해주세요',
              });
        }
        else{
            navigate("/parent/trade")
        }
    }
    return (
        <TradeListContainer
        onClick={handleNav}>
            <TradeImg/>
            <FontTag>내 거래내역</FontTag>
        </TradeListContainer>
    );
};

export default TradeListButton;