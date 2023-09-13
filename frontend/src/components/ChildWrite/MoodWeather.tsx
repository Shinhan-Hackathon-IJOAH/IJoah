import React, { useState } from 'react';
import { Avatar } from '@material-tailwind/react';
import { useDiaryStore } from '../../store/DiaryStore';

const MoodWeather = () => {
  const { weatherMood, setWeatherMood } = useDiaryStore();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodClick = (mood: string) => {
    if (weatherMood === mood) {
      // 이미 선택된 버튼을 다시 클릭하면 선택 해제
      setWeatherMood(null);
    } else {
      // 다른 버튼을 클릭하면 선택한 버튼 갱신
      setWeatherMood(mood);
    }
  };

  const isMoodSelected = (mood: string) => {
    return weatherMood === mood;
  };

  return (
    <div className="mt-10">
      <div className="text-2xl text-center font-['HSYuji-Regular']">오늘의 기분 날씨는 어떤가요 ?</div>
      <div className="flex mt-5 gap-4 justify-center">
        <div>
          <Avatar
            size="lg"
            alt="avatar"
            src="/weather/sunny.png"
            className={`border p-1 border-[#F8A70C] shadow-md shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
              isMoodSelected('sunny') ? 'ring-[red] border-[red]' : ''
            }`}
            onClick={() => {
              handleMoodClick('sunny');
            }}
          />
        </div>
        <div>
          <Avatar
            size="lg"
            alt="avatar"
            src="/weather/sunrise.png"
            className={`border p-1 border-[#F8A70C] shadow-md shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
              isMoodSelected('sunrise') ? 'ring-[red] border-[red]' : ''
            }`}
            onClick={() => {
              handleMoodClick('sunrise');
            }}
          />
        </div>
        <div>
          <Avatar
            size="lg"
            alt="avatar"
            src="/weather/drop.png"
            className={`border p-1 border-[#F8A70C] shadow-md shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
              isMoodSelected('drop') ? 'ring-[red] border-[red]' : ''
            }`}
            onClick={() => {
              handleMoodClick('drop');
            }}
          />
        </div>
        <div>
          <Avatar
            size="lg"
            alt="avatar"
            src="/weather/wind.png"
            className={`border p-1  border-[#F8A70C] shadow-md shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
              isMoodSelected('wind') ? 'ring-[red] border-[red]' : ''
            }`}
            onClick={() => {
              handleMoodClick('wind');
            }}
          />
        </div>

        <div>
          <Avatar
            size="lg"
            alt="avatar"
            src="/weather/thunder.png"
            //보더 넣을거면 참고하기 className="border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
            className={`border border-[#F8A70C] p-1 shadow-md shadow-[#F8A70C] ring-2 ring-[#F8A70C] ${
              isMoodSelected('thunder') ? 'ring-[red] border-[red]' : ''
            }`}
            onClick={() => {
              handleMoodClick('thunder');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MoodWeather;
