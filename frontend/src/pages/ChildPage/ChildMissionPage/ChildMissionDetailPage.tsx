import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import BottomNav from '../../../components/Common/BottomNav';
import axios from 'axios';
import {DetailContainer,FontTag,Title,BackGroundContainer,MiniTitle} from './ChildMissionDetailPageStyles'
import BackPageButton from '../../../components/Common/BackPageButton';
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


const ChildMissionDetailPage = () => {

    const { missionid } = useParams<{ missionid: string }>();
    const [missioninfo,setMissionInfo] = useState<MissionDetail>();

    const getMissionDetail = ()=>{
        axios
            .get(`https://j9c210.p.ssafy.io/api1/missions/${missionid}`, {
                headers: {
                Authorization: `Bearer`,
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
            <Title>{missioninfo?.writer.name}님이 부여한 미션</Title>
                <BackGroundContainer>
                    <MiniTitle>미션제목</MiniTitle>
                    <FontTag>{missioninfo?.title}</FontTag>
                    <MiniTitle>미션 세부내용</MiniTitle>
                    <FontTag>{missioninfo?.content}</FontTag>
                    <MiniTitle>미션 시작 날짜</MiniTitle>
                    <FontTag>{missioninfo?.startDate}</FontTag>
                    <MiniTitle>미션 끝나는 날짜</MiniTitle>
                    <FontTag>{missioninfo?.endDate}</FontTag>
                    <MiniTitle>미션 상태</MiniTitle>
                    <FontTag>{missioninfo?.accomplishment}</FontTag>
                    <MiniTitle>미션 보상</MiniTitle>
                    <FontTag>{missioninfo?.reward}원</FontTag>
                </BackGroundContainer>
            <BottomNav/>
        </DetailContainer>
    );
};

export default ChildMissionDetailPage;