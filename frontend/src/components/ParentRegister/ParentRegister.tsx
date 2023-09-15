import React,{useState} from 'react';
import axios from 'axios';
import {RegisterContainer,ButtonContainer,TitleTag,InputTag} from './ParentRegisterStyles'
import { Input } from "@material-tailwind/react";
import {useUserStore} from "../../store/UserStore"
import BottomNav from '../Common/BottomNav';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const ParentRegister = () => {
    const [childid, setChildId] = useState('');
    const {accessToken,id} =useUserStore();
    const navigate = useNavigate();
    
    const registerChild=()=>{
        axios
            .post('https://j9c210.p.ssafy.io/api1/families/registchild',{
            parentId:id,
            childEmail:childid 
            },{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    },
            })
            .then((response) =>{
                console.log(response)
                Swal.fire({
                    icon: 'success',
                    title: '아이 등록 요청 완료',
                    text: '아이 아이디에서 수락해주세요'
                });
                navigate('/parent')
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    return (
        <RegisterContainer>
            <div className="mt-8 flex items-center justify-center flex-col text-center text-2xl font-['HSYuji-Regular']">
                <TitleTag>아이를 등록 해주세요</TitleTag>
                <div className="mt-10 w-64">
                <div className="mt-5">
                아이 아이디 입력
                <div className="mt-3">
                <Input 
                style={{ backgroundColor: "#ffffff" }}
                color="orange"
                label="아이 아이디"
                value={childid}
                crossOrigin={undefined} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setChildId(event.target.value)} />
                </div>
                </div>
                </div>
            </div>
            <ButtonContainer onClick={()=>{registerChild()}}>입력완료</ButtonContainer>
            <BottomNav/>
        </RegisterContainer>
    );
};

export default ParentRegister;