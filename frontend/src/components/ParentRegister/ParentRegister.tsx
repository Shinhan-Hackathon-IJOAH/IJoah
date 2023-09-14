import React,{useState} from 'react';
import axios from 'axios';
import {RegisterContainer,ButtonContainer,TitleTag,InputTag} from './ParentRegisterStyles'
import { Input } from "@material-tailwind/react";
import {useUserStore} from "../../store/UserStore"
import BottomNav from '../Common/BottomNav';


const ParentRegister = () => {
    const [childaccount, setChildAccount] = useState('');
    const [childid, setChildId] = useState('');
    const {accessToken} =useUserStore()
    const registerChild=()=>{
        axios
            .post('https://ijoah01.duckdns.org/api/member/child-regist',{childaccount,childid},{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    },
            })
            .then((response) =>{
                console.log(response)
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    return (
        <RegisterContainer>
            <div className="mt-8 flex items-center justify-center flex-col text-center text-2xl font-['HSYuji-Regular']">
                <TitleTag>아이를 등록 해주세요</TitleTag>
                {/* <InputTag> */}
                <div className="mt-10 w-64">
                    {/* <div>
                    아이 계좌 정보 입력
                    <div className="mt-3">
                <Input
                style={{ backgroundColor: "#ffffff" }}
                color="orange"
                label="아이 계좌"
                value={childaccount}
                crossOrigin={undefined} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setChildAccount(event.target.value)} />
                </div>
                </div> */}
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
                {/* </InputTag> */}
            </div>
            <ButtonContainer onClick={()=>{registerChild()}}>입력완료</ButtonContainer>
            <BottomNav/>
        </RegisterContainer>
    );
};

export default ParentRegister;