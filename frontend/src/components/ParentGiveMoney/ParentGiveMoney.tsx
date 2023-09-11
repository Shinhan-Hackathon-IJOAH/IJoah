import React,{useState} from 'react';
import { Input } from "@material-tailwind/react";
import {InputTag,NameTag,GiveMoneyContainer,ButtonContainer,GiveInfoContainer,SendButoon} from "./ParentGiveMoneyStyles"
import axios from 'axios';
import {useSelectChildStore} from '../../store/SelectChildStore'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useUserStore } from './../../store/UserStore';


const ParentGiveMoney = () => {
    const [givemoney, setGivemoney] = useState(0);
    const {childid,childname,childaccount,childimg}=useSelectChildStore();
    const {balance,name} = useUserStore();
    const formattedMoney = givemoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Remove non-digit characters
        setGivemoney(Number(onlyNumbers));
      };

    const giveMoney = () =>{
        axios
            .post("https://ijoah01.duckdns.org/api/bank/transfer",{
                withdrawAccount: balance, // 출금할 계좌
                depositAccount: childaccount, // 입금할 계좌 
                amount: givemoney, 
                withdrawContent: `${childname}에게 용돈`, //출금자에게 표시될 문자 
                depositContent: `${name}이 주신 용돈`,
            })
            .then((response)=>{
                console.log(response)
                setGivemoney(0)
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
                    type="text" pattern="\d*"
                    value={formattedMoney}
                    onChange={handleMoneyChange}
                    min={0}
                    style={{ fontSize: '25px',textAlign: 'right',
                    direction: 'rtl',paddingRight: '15px'   }} 
                     />
                     <span>원</span>
            </InputTag>
                <ButtonContainer>
                    <Button variant="outlined" onClick={()=>{setGivemoney(givemoney+1000)}}>1000원</Button>
                    <Button variant="outlined" onClick={()=>{setGivemoney(givemoney+5000)}}>5000원</Button>
                    <Button variant="outlined" onClick={()=>{setGivemoney(givemoney+10000)}}>10000원</Button>
                    <Button variant="outlined" onClick={()=>{setGivemoney(givemoney+20000)}}>200000원</Button>
                </ButtonContainer>
            <SendButoon onClick={giveMoney}>용돈 보내기</SendButoon>

            {/* 용돈 보냈을시 알림창 띄워야함 */}
        </GiveMoneyContainer>
    );
};

export default ParentGiveMoney;