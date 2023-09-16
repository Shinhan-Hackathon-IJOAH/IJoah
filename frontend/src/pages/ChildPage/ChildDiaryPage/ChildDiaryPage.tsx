import React from 'react';
import ChildDiary from '../../../components/ChildDiary/DiaryCalendar';
import axios from 'axios';
import BottomNav from '../../../components/Common/BottomNav';
import BackPageButton from '../../../components/Common/BackPageButton';

const ChildDiaryPage = () => {
  return (
    <div className="bg-white overflow-auto">
      <BackPageButton/>
      <ChildDiary />
      <BottomNav />
    </div>
  );
};

export default ChildDiaryPage;
