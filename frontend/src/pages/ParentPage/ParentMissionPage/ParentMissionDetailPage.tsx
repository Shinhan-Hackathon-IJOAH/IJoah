import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import BottomNav from '../../../components/Common/BottomNav';
import axios from 'axios';
import {DetailContainer,FontTag,Title,BackGroundContainer} from './ParentMissionDetailPageStyles'
import BackPageButton from '../../../components/Common/BackPageButton';
import {useUserStore} from "../../../store/UserStore"

interface MissionDetail{
        id: number,
        title:string,
        content: string,
        reward: number,
        startDate: string,
        endDate: string,
        accomplishment: string,
        writer: {
            memberId: number,
            name: string,
            email: string,
            phoneNumber: string,
            birthDate: string,
            gender: string,
            memberRole: string,
            account: {
                accountId: number,
                name: string,
                balance: number,
                accountNumber: string
            }
        },
        challenger: {
            memberId: number,
            name: string,
            email: string,
            phoneNumber: string,
            birthDate: string,
            gender: string,
            memberRole: string,
            account: {
                accountId: number,
                name: string,
                balance: number,
                accountNumber: string
            }
        }
    }


const ParentMissionDetailPage = () => {

    const { missionid } = useParams<{ missionid: string }>();
    const [missioninfo,setMissionInfo] = useState<MissionDetail>();
    const {accessToken} =useUserStore();

    const getMissionDetail = ()=>{
        axios
            .get(`/api/missions/${missionid}}`, {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response)=>{
                console.log(response)
                setMissionInfo(response.data.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    useEffect(()=>{
        getMissionDetail()
    },[])

    return (
        <DetailContainer>
            <BackPageButton/>
            <Title>{missioninfo?.challenger.name}김신한에게 부여한 미션</Title>
                <BackGroundContainer>
                    <FontTag>미션제목:{missioninfo?.title}</FontTag>
                    <FontTag>미션 세부내용:{missioninfo?.content}</FontTag>
                    <FontTag>미션 시작 날짜: {missioninfo?.startDate}</FontTag>
                    <FontTag>미션 끝나는 날짜: {missioninfo?.endDate}</FontTag>
                    <FontTag>미션 상태:{missioninfo?.accomplishment}</FontTag>
                    <FontTag>미션 보상: {missioninfo?.reward}원</FontTag>
                </BackGroundContainer>
            <BottomNav/>
        </DetailContainer>
    );
};

export default ParentMissionDetailPage;