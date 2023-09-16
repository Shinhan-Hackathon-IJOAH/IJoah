import React from 'react';
import ChildDiary from '../../../components/ChildDiary/DiaryCalendar';
import axios from 'axios';
import BottomNav from '../../../components/Common/BottomNav';

const ChildDiaryPage = () => {
  return (
    <div className="bg-white overflow-auto">
      <ChildDiary />
      <BottomNav />
    </div>
  );
};

export default ChildDiaryPage;
