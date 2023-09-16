import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WriteContainer, WriteImg, FontTag } from './WriteDiaryButtonStyles';
import { useUserStore } from '../../store/UserStore';
import Swal from 'sweetalert2';

const WriteDiaryButton = () => {
  const navigate = useNavigate();
  const { account } = useUserStore();
  const handleNav = () => {
    if (account === '') {
      Swal.fire({
        icon: 'warning',
        title: '계좌를 등록해주세요',
      });
    } else {
      navigate('/child/write');
    }
  };
  return (
    <WriteContainer onClick={handleNav}>
      <FontTag>용돈일기장 쓰기</FontTag>
      <WriteImg />
    </WriteContainer>
  );
};

export default WriteDiaryButton;
