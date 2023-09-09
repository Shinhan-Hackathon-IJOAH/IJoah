import React,{useState} from 'react';
import { Input } from "@material-tailwind/react";
import {InputTag,NameTag,GiveMoneyContainer,ButtonContainer,GiveInfoContainer,SendButoon} from "./ParentGiveMoneyStyles"
import axios from 'axios';
import {useSelectChildStore} from '../../store/SelectChildStore'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';


const ParentGiveMoney = () => {
    const [givemoney, setGivemoney] = useState('');
    const {childid,childname,childaccount,childimg}=useSelectChildStore();

    const giveMoney = () =>{
        axios
            .post("https://ijoah01.duckdns.org/api/bank/transfer",{
                withdrawAccount: "110111222222", // 출금할 계좌
                depositAccount: "110222333333", // 입금할 계좌 
                amount: givemoney, 
                withdrawContent: "하위~", //출금자에게 표시될 문자 
                depositContent: "하위~~~~"
                // givemoney: givemoney,
                // account:childaccount
            })
            .then((response)=>{
                console.log(response)
            })
            .catch((error)=>
            console.log(error))
    }
    return (
        <GiveMoneyContainer>
            <GiveInfoContainer>
                <Avatar
                        variant="circular"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        src={childimg}
                        />
                <NameTag className="text-2xl text-center font-['HSYuji-Regular']">{childname}에게 용돈 보내주기</NameTag>
            </GiveInfoContainer>
            <InputTag>
                    <Input 
                    variant="static" label="전송할 용돈" placeholder="금액"  crossOrigin={undefined}
                    type="number" pattern="\d*"
                    value={givemoney}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setGivemoney(event.target.value)
                    }
                    min={0}
                    style={{ fontSize: '25px',textAlign: 'right',
                    direction: 'rtl',paddingRight: '15px'   }} 
                     />
                     <span>원</span>
            </InputTag>
                <ButtonContainer>
                    <Button variant="outlined" onClick={()=>{setGivemoney('1000')}}>1000원</Button>
                    <Button variant="outlined" onClick={()=>{setGivemoney('5000')}}>5000원</Button>
                    <Button variant="outlined" onClick={()=>{setGivemoney('10000')}}>10000원</Button>
                    <Button variant="outlined" onClick={()=>{setGivemoney('20000')}}>200000원</Button>
                </ButtonContainer>
            <SendButoon onClick={giveMoney}>용돈 보내기</SendButoon>
        </GiveMoneyContainer>
    );
};

export default ParentGiveMoney;