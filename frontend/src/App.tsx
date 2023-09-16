import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/LoginPage/SignUpPage';
import ChildDiaryPage from './pages/ChildPage/ChildDiaryPage/ChildDiaryPage';
import ChildMainPage from './pages/ChildPage/ChildMainPage/ChildMainPage';
import ChildMissionPage from './pages/ChildPage/ChildMissionPage/ChildMissionPage';
import ChildMissionDetailPage from './pages/ChildPage/ChildMissionPage/ChildMissionDetailPage';
import ChildRegisterPage from './pages/ChildPage/ChildRegisterPage/ChildRegisterPage';
import ChildTradePage from './pages/ChildPage/ChildTradePage/ChildTradePage';
import ChildWritePage from './pages/ChildPage/ChildWritePage/ChildWritePage';
import ParentGiveMissionPage from './pages/ParentPage/ParentGiveMissionPage/ParentGiveMissionPage';
import ParentGiveMoneyPage from './pages/ParentPage/ParentGiveMoneyPage/ParentGiveMoneyPage';
import ParentMainPage from './pages/ParentPage/ParentMainPage/ParentMainPage';
import ParentMissionPage from './pages/ParentPage/ParentMissionPage/ParentMissionPage';
import ParentMissionDetailPage from './pages/ParentPage/ParentMissionPage/ParentMissionDetailPage';
import ParentPatternPage from './pages/ParentPage/ParentPatternPage/ParentPatternPage';
import ParentRegisterPage from './pages/ParentPage/ParentRegisterPage/ParentRegisterPage';
import ParentTradePage from './pages/ParentPage/ParentTradePage/ParentTradePage';
import AlarmPage from './pages/CommonPage/AlarmPage';
import MenuPage from './pages/CommonPage/MenuPage';
import MyPage from './pages/CommonPage/MyPage';
import EmailAuthPage from './pages/LoginPage/EmailAuthPage';
import AccountRegisterPage from './pages/CommonPage/AccountRegisterPage';
import ShareDiaryPage from './pages/CommonPage/ShareDiaryPage';
import { Page404 } from './pages/CommonPage/Page404';
import DiaryCalendar2 from './components/ChildDiary/DiaryCalendar2';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/child" element={<ChildMainPage />} />
        <Route path="/child/diary" element={<ChildDiaryPage />} />
        <Route path="/child/mission" element={<ChildMissionPage />} />
        <Route path="/child/mission/detail/:missionid" element={<ChildMissionDetailPage />} />
        <Route path="/child/register" element={<ChildRegisterPage />} />
        <Route path="/child/trade" element={<ChildTradePage />} />
        <Route path="/child/write" element={<ChildWritePage />} />
        <Route path="/parent" element={<ParentMainPage />} />
        <Route path="/parent/givemission" element={<ParentGiveMissionPage />} />
        <Route path="/parent/givemoney" element={<ParentGiveMoneyPage />} />
        <Route path="/parent/mission" element={<ParentMissionPage />} />
        <Route path="/parent/mission/detail/:missionid" element={<ParentMissionDetailPage />} />
        <Route path="/parent/pattern" element={<ParentPatternPage />} />
        <Route path="/parent/register" element={<ParentRegisterPage />} />
        <Route path="/parent/trade" element={<ParentTradePage />} />
        <Route path="/alarm" element={<AlarmPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/emailauth" element={<EmailAuthPage />} />
        {/* 테스트용 라우터 추후에 삭제 필수 */}
        <Route path="/calendar" element={<DiaryCalendar2 />} />
        <Route path="/register/account" element={<AccountRegisterPage />} />
        <Route path="/share/:diaryid" element={<ShareDiaryPage />} />
        {/* 404 Not Found 예외 처리를 위한 페이지 추가 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
