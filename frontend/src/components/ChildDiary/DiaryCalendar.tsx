import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import DiaryContent from "./DiaryContent";
import axios from "axios";
import { Button, select } from "@material-tailwind/react";
function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs();

// function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
//   const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
// const isSelected =
//   !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
// function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: string[] }) {
//   const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
//    // 해당 날짜가 highlightedDates 배열에 포함되어 있는지 확인
//    const isSelected = highlightedDays.includes(props.day.format('YYYY-MM-DD'));
function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDates?: string[] }
) {
  const { highlightedDates = [], day, outsideCurrentMonth, ...other } = props;

  // 해당 날짜가 highlightedDates 배열에 포함되어 있는지 확인
  const isSelected = highlightedDates.includes(props.day.format("YYYY-MM-DD"));

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌚" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

///

export default function DateCalendarServerRequest() {
  const [selectdate, setSelectDate] = useState("");
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState<number[]>([]);
  const [diaryId, setDiaryId] = useState<any>(null);
  const [diaryList, setDiaryList] = useState<any[]>([]); // 초기값을 null로 설정
  // highlightedDates 배열에 일기가 있는 날짜를 설정
  const [contentVisible, setContentVisible] = useState(false); // 컨텐츠 보이기/숨기기 상태 추가
  const [calendarVisible, setCalendarVisible] = useState(true); // 달력 보이기/숨기기 상태 추가
  const handleShowCalendar = () => {
    setContentVisible(false);
    setCalendarVisible(true); // 달력 보이기
  };
  useEffect(() => {
    if (diaryList !== null) {
      // diaryList가 null이 아닌 경우에만 highlightedDates 배열을 생성
      const highlightedDates = diaryList.map((diary) => diary.date);
      setHighlightedDays(highlightedDates);
    }
  }, [diaryList]);
  //
  // 일기 리스트 get 요청
  const readDiaryList = () => {
    axios
      .get("https://ijoah01.duckdns.org/api/diaries/list/1")
      .then((res) => {
        console.log("일기 리스트 불러오는 거 성공함");
        console.log(res.data);
        setDiaryList(res.data);
      })
      .catch((err) => {
        console.log("에러..");
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

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <div className="h-[100vh]">
      <div>
        {calendarVisible && (
          <div className="flex justify-center items-center h-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={initialValue}
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    highlightedDays,
                  } as any,
                }}
                onChange={(newDate: dayjs.Dayjs | null) => {
                  if (newDate) {
                    setSelectDate(newDate.format("YYYY-MM-DD"));
                    // 선택한 날짜와 일치하는 id 추출하는 함수
                    findIdByDate(diaryList, selectdate);
                    // id값 불러오기
                    console.log(diaryId);
                    setContentVisible(true); // 컨텐츠 보이기
                    setCalendarVisible(false); // 달력 숨기기
                  }
                }}
              />
            </LocalizationProvider>
          </div>
        )}
      </div>

      {contentVisible && (
        <div className="flex justify-center flex-col items-center">
          <div>
            <DiaryContent selectdate={selectdate} diaryId={diaryId} />
          </div>
          <div>
            <Button color="teal" onClick={handleShowCalendar} className="mb-4">
              달력보기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
