import React from 'react';
import { useNavigate } from "react-router-dom";
import { GiveMoneyContainer,GiveMoneyImg,FontTag } from "./GiveMoneyButtonStyles"
import {useSelectChildStore} from '../../store/SelectChildStore'
import {useUserStore} from "../../store/UserStore"
import Swal from 'sweetalert2';

const GiveMoneyButton = () => {
    const navigate = useNavigate();
    const {childname,childaccount}=useSelectChildStore();
    const {account} =useUserStore();
    const handleNav =() =>{
        if (account===''){
            Swal.fire({
                icon: 'warning',
                title: '계좌를 등록해주세요',
              });
        }
        else if(childaccount===''){
            Swal.fire({
                icon: 'warning',
                title: '아이를 선택해주세요',
              });}
        else{
            navigate("/parent/givemoney")
        }
    }
    return (
        <GiveMoneyContainer
        onClick={handleNav}>
            <GiveMoneyImg/>
            <FontTag>
            {childname}에게 용돈주기
            </FontTag>
        </GiveMoneyContainer>
    );
};

export default GiveMoneyButton;