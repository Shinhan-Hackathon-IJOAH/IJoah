import React from 'react';

import { useNavigate } from 'react-router-dom';
import { MissionContainer, MissionImg, FontTag } from './ChildMissionButtonStyles';
import { useUserStore } from '../../store/UserStore';
import Swal from 'sweetalert2';

const ChildMissionButton = () => {
  const navigate = useNavigate();
  const { account } = useUserStore();
  const handleNav = () => {
    if (account === '') {
      Swal.fire({
        icon: 'warning',
        title: '계좌를 등록해주세요',
      });
    } else {
      navigate('/child/mission');
    }
  };
  return (
    <MissionContainer onClick={handleNav}>
      <MissionImg />
      <FontTag>내 미션 확인하기</FontTag>
    </MissionContainer>
  );
};

export default ChildMissionButton;
