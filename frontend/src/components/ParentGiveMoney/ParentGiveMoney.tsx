import React,{useState} from 'react';
import { Input } from "@material-tailwind/react";
import {InputTag,NameTag,GiveMoneyContainer,ButtonContainer,GiveInfoContainer,SendButoon} from "./ParentGiveMoneyStyles"
import axios from 'axios';
import {useSelectChildStore} from '../../store/SelectChildStore'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useUserStore } from './../../store/UserStore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ParentGiveMoney = () => {
    const navigate = useNavigate();
    const [givemoney, setGivemoney] = useState(0);
    const {childid,childname,childaccount,childimg}=useSelectChildStore();
    const {balance,name,accessToken,account} = useUserStore();
    const formattedMoney = givemoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Remove non-digit characters
        setGivemoney(Number(onlyNumbers));
      };

    const giveMoney = () =>{
        if (givemoney===0){
            Swal.fire({
                icon: 'warning',
                title: '용돈 금액 입력',
                text: `${childname}에게 보낼 금액을 입력해주세요`,
              });
        }
        else{
        axios
            .post("https://j9c210.p.ssafy.io/api1/bank/transfer",{
                withdrawAccount: account, 
                depositAccount: childaccount, 
                amount: givemoney, 
                withdrawContent: `${childname}에게 용돈`,
                depositContent: `${name}이 주신 용돈`,
            },{
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response)=>{
                console.log(response)
                Swal.fire({
                    icon: 'success',
                    title: '용돈보내기 완료',
                    text: `${childname}에게 ${givemoney}원 송금 완료`,
                  });
                setGivemoney(0)
                navigate('/parent');
            })
            .catch((error)=>
            console.log(error))
            Swal.fire({
                icon: 'error',
                title: '용돈보내기 실패',
                // text: '다시 시도해주세요.',
              });
            }
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
                    max={balance}
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
        </GiveMoneyContainer>
    );
};

export default ParentGiveMoney;