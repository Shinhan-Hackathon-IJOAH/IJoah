import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MissionItemContainer, RequestButton, FontTag, MissionTagContainer } from './MissionListItemStyles';
import axios from 'axios';
import { IconButton } from '@material-tailwind/react';
import { useUserStore } from '../../store/UserStore';
import Swal from 'sweetalert2';

interface MissionListItemProps {
  missionid: string;
  missiontitle: string;
  missionamount: string;
}

const MissionRequestItem: React.FC<MissionListItemProps> = ({ missionid, missiontitle, missionamount }) => {
  const { id, memberRole, accessToken } = useUserStore();
  const navigate = useNavigate();
  const detailClick = () => {
    navigate(`/parent/mission/detail/${missionid}`);
  };
  const approve = () => {
    axios
      .post(
        'https://j9c210.p.ssafy.io/api1/missions/check',
        {
          memberId: id,
          memberRole: memberRole,
          missionId: missionid,
          isAccept: 'true',
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '미션 완료',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const refuse = () => {
    axios
      .post(
        'https://j9c210.p.ssafy.io/api1/missions/check',
        {
          memberId: id,
          memberRole: memberRole,
          missionId: missionid,
          isAccept: 'false',
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: 'error',
          title: '미션 실패',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <MissionItemContainer>
      <MissionTagContainer onClick={detailClick}>
        <FontTag>미션제목:{missiontitle}</FontTag>
        <FontTag>미션 보상:{missionamount}원</FontTag>
      </MissionTagContainer>
      <IconButton color="green" onClick={approve}>
        ✔
      </IconButton>
      <IconButton color="red" onClick={refuse}>
        ✖
      </IconButton>
    </MissionItemContainer>
  );
};

export default MissionRequestItem;
