import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ReadContainer,DiaryImg,FontTag } from "./ReadDiaryButtonStyles"
import {useUserStore} from "../../store/UserStore"
import Swal from 'sweetalert2';

const ReadDirayButton = () => {
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
          navigate("/child/diary")
      }
  }
  return (
    <ReadContainer
    onClick={handleNav}>
      <DiaryImg/>
      <FontTag>일기 읽기</FontTag>
    </ReadContainer>
  );
};

export default ReadDirayButton;
