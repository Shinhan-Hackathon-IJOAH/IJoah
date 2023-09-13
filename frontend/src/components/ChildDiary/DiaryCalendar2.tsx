// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { ko } from 'date-fns/locale';
// const DiaryCalendar2 = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

//   return (
//     <DatePicker
//       locale={ko} // 언어설정
//       dateFormat="yyyy년 MM월 dd일" // 날짜 형태
//       shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
//       minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
//       maxDate={new Date()} // maxDate 이후 날짜 선택 불가
//       selected={selectedDate}
//       onChange={(date) => setSelectedDate(date)}
//     />
//   );
// };

// export default DiaryCalendar2;

//////////////////////// 위에는 datepicker

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

import 'react-calendar/dist/Calendar.css';
function DiaryCalendar2() {
  const mark = ['2023-09-12', '2023-09-13', '2023-09-14'];
  const [value, onChange] = useState(new Date());

  return (
    <div>
      {/* <Calendar
        // onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
        formatDay={(locale, date) => moment(date).format('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
        value={value}
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        // navigationLabel={null}
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
        className="mx-auto w-full text-sm border-b"
        tileContent={({ date, view }) => {
          // 날짜 타일에 컨텐츠 추가하기 (html 태그)
          // 추가할 html 태그를 변수 초기화
          let html = [];
          // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
          if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
            html.push(<div className="dot"></div>);
          }
          // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
          return (
            <>
              <div className="flex justify-center items-center absoluteDiv">{html}</div>
            </>
          );
        }}
      /> */}
    </div>
  );
}
export default DiaryCalendar2;
