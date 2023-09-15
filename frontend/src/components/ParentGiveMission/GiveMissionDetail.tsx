import React, { useState, useEffect } from 'react';
import { Input, Textarea } from "@material-tailwind/react";
import axios from 'axios';
import { useSelectChildStore } from '../../store/SelectChildStore';
import { GiveMissionContainer, TitleTag, MissionInfoContainer, NameTag, InputTag, MissionButton } from './GiveMissionDetailStyles'
import Avatar from '@mui/material/Avatar';
import './Calendar.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import './Calendar.css';
import { useUserStore } from "../../store/UserStore"
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const GiveMissionDetail = () => {
    const navigate = useNavigate();
    const { accessToken, balance,id } = useUserStore();
    const pastMonth = new Date();
    const [startDay, setStartDay] = useState<string>('');
    const [endDay, setEndDay] = useState<string>('');
    const [missionDetail, setMissionDetail] = useState('');
    const [missionTitle, setMissionTitle] = useState('');
    const [missionReward, setMissionReward] = useState<number>(0); // 변경: 초기값을 0으로 설정
    const formattedMoney = missionReward.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const { childid, childname, childaccount, childimg } = useSelectChildStore();
    const defaultSelected: DateRange = {
        from: pastMonth,
    };
    const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

    useEffect(() => {
        setStartDay(format(range?.from || pastMonth, 'yyyy-MM-dd'));
    }, [range?.from]);

    useEffect(() => {
        setEndDay(format(range?.to || pastMonth, 'yyyy-MM-dd'));
    }, [range?.to]);

    useEffect(() => {
        if (missionReward > balance) {
            Swal.fire({
                icon: 'warning',
                title: '보유금액을 초과했습니다',
            });
            setMissionReward(0);
        }
    }, [missionReward]);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMissionTitle(event.target.value);
    };

    const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
        setMissionReward(Number(onlyNumbers));
    };

    const handleDetailChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMissionDetail(event.target.value);
    };

    const handleButton = () => {
        if (missionTitle === '') {
            Swal.fire({
                icon: 'warning',
                title: '미션 제목을 입력해주세요',
            });
        }
        else if (missionDetail === '') {
            Swal.fire({
                icon: 'warning',
                title: '세부 내용을 입력해주세요',
            });
        }
        else if (startDay === '') {
            Swal.fire({
                icon: 'warning',
                title: '시작 날을 선택해주세요',
            });
        }
        else if (endDay === '') {
            Swal.fire({
                icon: 'warning',
                title: '끝나는 날을 선택해주세요',
            });
        }
        else if (missionReward === 0) {
            Swal.fire({
                icon: 'warning',
                title: '보상을 입력해주세요',
            });
        }
        else {
            axios
                .post(
                    'https://j9c210.p.ssafy.io/api1/mission', { 
                        parentId: id,
                        childId: childid,
                        missionTitle: missionTitle,
                        missionContent: missionDetail,
                        missionReward: missionReward,
                        missionStartDate: startDay,
                        missionEndDate: endDay    
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    Swal.fire({
                        icon: 'success',
                        title: '미션 등록 완료',
                    });
                    navigate('/parent');
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <GiveMissionContainer>
            <div className="mt-8 flex items-center justify-center flex-col text-center text-2xl font-['HSYuji-Regular']">
                <MissionInfoContainer>
                    <Avatar
                        variant="circular"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        src={childimg}
                    />
                    <NameTag className="text-2xl text-center font-['HSYuji-Regular']">{childname}에게 미션 주기</NameTag>
                </MissionInfoContainer>
                <TitleTag>미션 제목</TitleTag>
                <Input
                    style={{ backgroundColor: "#ffffff" }}
                    color="orange"
                    label="미션 제목"
                    value={missionTitle}
                    onChange={handleTitleChange}
                    crossOrigin={undefined}
                />
                <TitleTag>기간 설정</TitleTag>
                <DayPicker
                    style={{
                        width: '80%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    id="test"
                    mode="range"
                    defaultMonth={pastMonth}
                    selected={range}
                    onSelect={setRange}
                    locale={ko}
                />
                <TitleTag>미션 용돈</TitleTag>
                <InputTag>
                    <Input
                        variant="static" label="미션 용돈" placeholder="금액" crossOrigin={undefined}
                        type="text" 
                        value={formattedMoney}
                        onChange={handleMoneyChange}
                        min={0}
                        max={balance}
                        style={{
                            fontSize: '25px',
                            textAlign: 'right',
                            direction: 'rtl',
                            paddingRight: '15px'
                        }}
                    />
                    <span>원</span>
                </InputTag>

                <TitleTag>미션 세부내용</TitleTag>
                <Textarea
                    style={{ backgroundColor: "#ffffff" }}
                    color="orange"
                    label="미션 세부 내용"
                    value={missionDetail}
                    onChange={handleDetailChange}
                />

                <MissionButton onClick={() => { handleButton() }}>미션 등록</MissionButton>
            </div>
            <div
                style={{ height: '150px' }}></div>

        </GiveMissionContainer>
    );
};

export default GiveMissionDetail;
