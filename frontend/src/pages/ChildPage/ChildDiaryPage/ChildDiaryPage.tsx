import React from 'react';
import ChildDiary from '../../../components/ChildDiary/DiaryCalendar';
import axios from 'axios';
import BottomNav from '../../../components/Common/BottomNav';

const ChildDiaryPage = () => {
  return (
    // 배경 겹침 하단바랑.
    // <div className="bg-[#ffecc8] overflow-auto">
    <div className="bg-white overflow-auto">
      <ChildDiary />
      <BottomNav />
    </div>
  );
};

export default ChildDiaryPage;
