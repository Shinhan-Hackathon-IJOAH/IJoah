import React,{useEffect,useState} from 'react';
import {RegisterContainer,ButtonContainer,TitleTag,InputTag} from './ChildRegisterStyles'
import ChildRegisterItem from './ChildRegisterItem';
import axios from 'axios';

interface Register{
    register: {
        id: '';
        name:'';
        amount:'';
        }[];
}

const ChildRegister = () => {
    const [registerlist, setRegisterList] = useState<Register>();
    const getRegisterList = () =>{
        axios
        .get(`....`, {
            headers: {
            Authorization: `Bearer`,
            },
        })
        .then((response) => {
            setRegisterList(response.data.data); 
            console.log(response.data.data);
        })
        .catch((error) => {
            console.error('데이터 가져오기 오류:', error);
        });
    }
    useEffect(()=>{
        getRegisterList()
    },[])
    return (
        <RegisterContainer>
            <div className="mt-8 flex items-center justify-center flex-col text-center text-2xl font-['HSYuji-Regular']">
            <TitleTag>아이등록 요청</TitleTag>
            { registerlist?.register.map((register)=><ChildRegisterItem name={register.name}/>)}
            <ChildRegisterItem name={'김성준'}/>
            </div>
        </RegisterContainer>
    );
};

export default ChildRegister;