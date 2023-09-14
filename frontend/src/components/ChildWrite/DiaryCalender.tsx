import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { select } from '@material-tailwind/react';
import { useDiaryStore } from '../../store/DiaryStore';
import { useUserStore } from '../../store/UserStore';
import axios from 'axios';
import { set } from 'date-fns';
const DiaryCalendar = () => {
  // 초기 상태를 설정합니다. 선택한 날짜는 null로 시작합니다.
  // const { accessToken } = useUserStore();
  const { date, setDate } = useDiaryStore();
  // 날짜가 선택될 때 호출되는 함수를 정의합니다.
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2023-09-05'));
  //const dateFormat = dayjs(date).format("YYYY-MM-DD"); 이렇게 하면 2021-09-23 이런식으로 변환됨. 참고하자

  return (
    <div className="flex justify-center mt-2 ">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
          // 미래는 선택 못하는 옵션.
          disableFuture
          ={true}
            label="날짜를 선택해주세요"
            onChange={(newDate: dayjs.Dayjs | null) => {
              if (newDate) {
                setDate(newDate.format('YYYY-MM-DD'));
              }
            }}
            format="YYYY년-MM월-DD일"
            sx={{ marginBottom: '1rem' }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default DiaryCalendar;
