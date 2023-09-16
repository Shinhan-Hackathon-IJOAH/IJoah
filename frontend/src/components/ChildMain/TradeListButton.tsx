import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {TradeContainer,TradeImg,FontTag} from "./TradeListButtonStyles"
import {useUserStore} from "../../store/UserStore"
import Swal from 'sweetalert2';

const TradeListButton = () => {
  const navigate = useNavigate();
  const {account} =useUserStore();
  const handleNav =() =>{
    if (account===''){
        Swal.fire({
            icon: 'warning',
            title: '계좌를 등록해주세요',
          });
    }
    else{
        navigate("/child/trade")
    }
}
  return (
    <TradeContainer
    onClick={handleNav}>
      
      <TradeImg/>
        <FontTag>내 거래 내역</FontTag> 
    </TradeContainer>
  );
};

export default TradeListButton;
