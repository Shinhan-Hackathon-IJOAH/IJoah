import React from 'react';
import { useNavigate } from "react-router-dom";
import { GiveMissionContainer,GiveMissionImg,FontTag } from "./GiveMissionButtonStyles"
import {useSelectChildStore} from '../../store/SelectChildStore'
import {useUserStore} from "../../store/UserStore"
import Swal from 'sweetalert2';

const GivMissionButton = () => {
    const navigate = useNavigate();
    const {account} =useUserStore();
    const {childaccount}=useSelectChildStore();
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
            navigate("/parent/givemission")
        }
    }
    
    return (
        <GiveMissionContainer
        onClick={handleNav}>
            <GiveMissionImg/>
            <FontTag>미션주기</FontTag>
        </GiveMissionContainer>
    );
};

export default GivMissionButton;