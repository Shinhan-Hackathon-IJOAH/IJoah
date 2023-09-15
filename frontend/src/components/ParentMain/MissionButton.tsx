import React from 'react';
import { useNavigate } from "react-router-dom";
import {MissionListContainer,MissionListImg,FontTag} from "./MissionButtonStyles"
import {useSelectChildStore} from '../../store/SelectChildStore'
import {useUserStore} from "../../store/UserStore"
import Swal from 'sweetalert2';

const MissionButton = () => {
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
            navigate("/parent/mission")
        }
    }
    

    return (
        <MissionListContainer
        onClick={handleNav}>
        <MissionListImg/>
            <FontTag>부여한 미션</FontTag>
        </MissionListContainer>
    );
};

export default MissionButton;