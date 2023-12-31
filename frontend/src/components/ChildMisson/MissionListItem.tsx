import React from 'react';
import { useNavigate } from 'react-router-dom';
import {MissionItemContainer,CompleteButton,FontTag,MissionTagContainer} from './MissionListItemStyles'
import axios from 'axios';
import { useUserStore } from '../../store/UserStore';
import Swal from 'sweetalert2';

interface MissionListItemProps{
    missionid: string;
    missiontitle:string;
    missionamount:string;
}

const MissionListItem: React.FC<MissionListItemProps> = ({missionid,missiontitle,missionamount}) => {
    const navigate = useNavigate();
    const {id,memberRole,accessToken,countDiary,setCountDiary} =useUserStore();
    const complete = () => {
        axios
            .post('https://j9c210.p.ssafy.io/api1/missions/check',{
                memberId: id,
                memberRole: memberRole, 
                missionId: missionid,
                isAccept: "true"
            },
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            )
            .then((response)=>{
                console.log(response)
                Swal.fire({
                    icon: 'success',
                    title: '미션 완료 요청',
                  });
                setCountDiary(countDiary+1)
            })
            .catch((error)=>{
                console.log(error)
                console.log(missionid)
            })
    }
    const detailClick = ()=>{
        navigate(`/child/mission/detail/${missionid}`)
    } 
    return (
        <MissionItemContainer >
            <MissionTagContainer onClick={detailClick}>
                <FontTag>
                미션제목:{missiontitle}
                </FontTag>
                <FontTag>
                미션 보상:{missionamount}원
                </FontTag>
            </MissionTagContainer>
            <CompleteButton onClick={complete}>완료 요청</CompleteButton>
        </MissionItemContainer>
    );
};

export default MissionListItem;