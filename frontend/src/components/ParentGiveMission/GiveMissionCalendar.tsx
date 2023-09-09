import React, { useState, useEffect } from 'react';
import { ko } from 'date-fns/locale';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import './Calendar.css';

const pastMonth = new Date();

const GiveMissionCalendar: React.FC = () => {
  const defaultSelected: DateRange = {
    from: pastMonth,
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const [startDay, setStartDay] = useState<string>('');
  const [endDay, setEndDay] = useState<string>('');
  let footer: React.ReactNode = null;

  useEffect(() => {
    // range.from이 변경될 때마다 startDay 업데이트
    setStartDay(format(range?.from || pastMonth, 'yyyy-MM-dd'));
  }, [range?.from]);

  useEffect(() => {
    // range.to가 변경될 때마다 endDay 업데이트
    setEndDay(format(range?.to || pastMonth, 'yyyy-MM-dd'));
  }, [range?.to]);


  return (
    <div>
      <DayPicker
        style={{
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
      이전 날;{startDay}
      끝나는 날:{endDay}
    </div>
  );
};

export default GiveMissionCalendar;
