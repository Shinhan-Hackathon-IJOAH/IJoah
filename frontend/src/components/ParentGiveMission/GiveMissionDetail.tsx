import React, {useState,useEffect} from 'react';
import { Input, Textarea } from "@material-tailwind/react";
import axios from 'axios';
import {useSelectChildStore} from '../../store/SelectChildStore';
import {GiveMissionContainer,TitleTag,MissionInfoContainer,NameTag,InputTag,MissionButton} from './GiveMissionDetailStyles'
import Avatar from '@mui/material/Avatar';
import './Calendar.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import './Calendar.css';

// const pastMonth = new Date();

const GiveMissionDetail = () => {
    const pastMonth = new Date();
    const [startDay, setStartDay] = useState<string>('');
    const [endDay, setEndDay] = useState<string>('');
    const [missionDetail, setMissionDetail] = useState('');
    const [missionTitle, setMissionTitle] = useState('');
    const [missionReward, setMissionReward] = useState('');
    const {childid,childname,childaccount,childimg}=useSelectChildStore();
    const defaultSelected: DateRange = {
        from: pastMonth,
      };
    const [range, setRange] = useState<DateRange | undefined>(defaultSelected);


    useEffect(() => {
        // range.from이 변경될 때마다 startDay 업데이트
        setStartDay(format(range?.from || pastMonth, 'yyyy-MM-dd'));
    }, [range?.from]);
    
    useEffect(() => {
        // range.to가 변경될 때마다 endDay 업데이트
        setEndDay(format(range?.to || pastMonth, 'yyyy-MM-dd'));
    }, [range?.to]);

    const handleTitleChange = (event: any) => {
        setMissionTitle(event.target.value);
      };
    
      const handleDetailChange = (event: any) => {
        setMissionDetail(event.target.value);
      };

    const handleButton = () =>{
        axios
            .post(
                'https://ijoah01.duckdns.org/api/mission',{missionTitle,missionDetail,missionReward}
            )
            .then((response)=>{
                console.log(response)
            })
            .catch((error)=>{
                console.log(error)
            })

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
                    variant="static" label="미션 용돈" placeholder="금액"  crossOrigin={undefined}
                    type="number" pattern="\d*"
                    value={missionReward}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setMissionReward(event.target.value)
                    }
                    min={0}
                    style={{ fontSize: '25px',textAlign: 'right',
                    direction: 'rtl',paddingRight: '15px'   }} 
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
                
                <MissionButton onClick={()=>{handleButton()}}>미션 등록</MissionButton>
            </div>
            <div
            style={{height:'150px'}}></div>
            
        </GiveMissionContainer>
    );
};

export default GiveMissionDetail;