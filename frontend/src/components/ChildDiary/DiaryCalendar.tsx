import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import DiaryContent from './DiaryContent';
import axios from 'axios';
import { Button, select, Typography } from '@material-tailwind/react';
import { useUserStore } from '../../store/UserStore';
import { Icon } from 'semantic-ui-react';
import { useDiaryStore } from '../../store/DiaryStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import './CustomDatePicker.css';

export default function DateCalendarServerRequest() {
  const { date, setDate } = useDiaryStore();
  const { accessToken, id } = useUserStore();
  const [selectdate, setSelectDate] = useState('');
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [diaryId, setDiaryId] = useState<any>(null);
  const [diaryList, setDiaryList] = useState<any[]>([
    {
      id: 1,
      date: '2023-09-14',
    },
    {
      id: 2,
      date: '2023-09-10',
    },

    {
      id: 4,
      date: '2023-09-01',
    },
  ]);
  const includeDates = diaryList.map((diary) => new Date(diary.date)); //날짜들을 map함수를 사용해 Date 객체로 변환!
  // highlightedDates 배열에 일기가 있는 날짜를 설정
  const [contentVisible, setContentVisible] = useState(false); // 컨텐츠 보이기/숨기기 상태 추가
  const [calendarVisible, setCalendarVisible] = useState(true); // 달력 보이기/숨기기 상태 추가
  const handleShowCalendar = () => {
    setContentVisible(false);
    setCalendarVisible(true); // 달력 보이기
  };

  // 일기 리스트 get 요청 하는 함수
  const readDiaryList = () => {
    axios
      .get(`https://j9c210.p.ssafy.io/api1/diaries/list/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      .then((res) => {
        console.log('일기 리스트 불러오는 거 성공!');
        console.log(res.data);
        setDiaryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 들어올 때 일기 리스트 get 요청하기
  useEffect(() => {
    readDiaryList();
  }, []);

  // 선택한 날짜 바뀔 때마다 id추출하는 함수 실행하기
  useEffect(() => {
    findIdByDate(diaryList, selectdate);
  }, [selectdate]);

  // 선택한 날짜와 일치하는 id 추출하는 함수
  const findIdByDate = (diaryList: any[], selectdate: string) => {
    const selectDiary = diaryList.find((diary) => diary.date === selectdate);
    return selectDiary ? setDiaryId(selectDiary.id) : setDiaryId(null);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // includeDates 테스트 ( 여기 적힌 날들만 선택 가능하게 하는 것)
  return (
    <div className="h-[100vh]">
      {calendarVisible && (
        <div>
          <div className="flex flex-col justify-start mt-12 items-center h-screen">
            <div>
              <Typography variant="h3" className="text-center mt-10 font-['HSYuji-Regular']">
                읽고 싶은 용돈 일기를 <br></br>
                아래에서 골라주세요.{' '}
              </Typography>
            </div>

            <DatePicker
              className="custom-date-picker"
              locale={ko} // 언어설정
              dateFormat="yyyy년 MM월 dd일" // 날짜 형태
              shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
              selected={selectedDate}
              onChange={(e) => {
                const formattedDate = dayjs(e).format('YYYY-MM-DD');
                setSelectedDate(e); // 선택한 날짜를 상태에 업데이트합니다.
                setSelectDate(formattedDate); // 선택한 날짜를 상태에 업데이트합니다.
                setDate(formattedDate); // 스토어의 data 값도 업데이트합니다.
                findIdByDate(diaryList, selectdate);
                console.log(e); // 선택한 날짜를 콘솔에 출력합니다.
                console.log(date);
                setContentVisible(true); // 컨텐츠 보이기
                setCalendarVisible(false); // 달력 숨기기
              }}
              maxDate={new Date()}
              includeDates={includeDates} // 여기에 변환한 Date 객체를 전달합니다. -> 이렇게하면 일기 쓴 날만 선택 가능하게 됨.
              // 배열로 담으면 그곳이 강조됨.
              highlightDates={includeDates}
              inline
            />
          </div>
        </div>
      )}

      {contentVisible && (
        <div className="flex justify-center flex-col items-center">
          <div>
            <DiaryContent selectdate={selectdate} diaryId={diaryId} />
          </div>
          <div className="mb-10">
            <Button color="orange" onClick={handleShowCalendar} className="mb-10 w-56 h-14 text-xl">
              달력보기&nbsp;
              <Icon name="calendar check" className="h-24" onClick={handleShowCalendar}></Icon>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
