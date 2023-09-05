import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { select } from "@material-tailwind/react";
import { useDiaryStore } from "../../store/DiaryStore";
const DiaryCalendar = () => {
  const { date, setDate } = useDiaryStore();
  // 초기 상태를 설정합니다. 선택한 날짜는 null로 시작합니다.
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2023-09-05"));
  // 날짜가 선택될 때 호출되는 함수를 정의합니다.
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            format="YYYY년 MM월 DD일"
            label="날짜를 선택해주세요."
            value={value}
            onChange={(newValue) => setDate(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>

      {/* 선택한 날짜를 출력하거나 사용할 수 있습니다. */}

      {/* {selectedDate} */}
      {/* {value} */}
    </div>
  );
};

export default DiaryCalendar;
