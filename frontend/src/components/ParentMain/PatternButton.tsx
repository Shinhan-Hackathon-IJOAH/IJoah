import React from 'react';
import { useNavigate } from "react-router-dom";
import {PatternButtonContainer,PatternImg,FontTag} from "./PatternButtonStyles"
import {useSelectChildStore} from '../../store/SelectChildStore'
import {useUserStore} from "../../store/UserStore"
import Swal from 'sweetalert2';

const PatternButton = () => {
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
            navigate("/parent/pattern")
        }
    }
    return (
        <PatternButtonContainer
        onClick={handleNav}>
            <PatternImg/>
            <FontTag>내 아이소비패턴</FontTag>
        </PatternButtonContainer>
    );
};

export default PatternButton;