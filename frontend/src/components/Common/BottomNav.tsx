import React, { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/UserStore';
import { BottomNavContent, HomeImg, AlarmImg, MenuImg } from './BottomNavStyles';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { Icon, Menu, Sidebar, Segment, Header, Image } from 'semantic-ui-react';
import axios from 'axios';


const BottomNav = () => {
  const { memberRole,accessToken,email } = useUserStore();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [alarmData, setAlarmData] = useState<any[]>([]);
  const count = Object.keys(alarmData).length;

  useEffect(() => {
    axios
      .get(`https://ijoah01.duckdns.org/api/diaries/${email}`, {
        headers: {
          // Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log('알람 내용 불러오는 거 성공함');
        console.log(res.data);
        setAlarmData(res.data);
      })
      .catch((err) => {
        console.log('에러..');
        console.log(err);
      });
  }, []);

  const handleMenuClick = () => {
    setVisible(!visible);
  };
  const handleAlarmClick = () => {
    navigate('/alarm');
  };
  const handleHomeClick = () => {
    // 이거 스토어에서 불러와서 분기점 나눠서 memberRole에 따라 바꾸면 될듯?
    if (memberRole === 'PARENT') {
      navigate('/parent');
    }
    if (memberRole === 'CHILD') {
      navigate('/child');
    }
  };
  const handleRegisterClick = () => {
     navigate('/parent/register');
   
  };
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 7,
      top: 13,
      padding: '0 4px',
    },
  }));

  return (
    <div>
      {/* 사이드바 */}
      <Sidebar
        as={Menu}
        color="orange"
        animation="overlay"
        direction="right"
        icon="labeled"
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="thin"
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <Menu.Item onClick={() => navigate('/mypage')} as="a">
              <Icon name="user circle" />
              프로필 수정
            </Menu.Item>
            <Menu.Item onClick={() => navigate('/register/account')} as="a">
              <Icon name="won sign" />
              계좌 등록하기
            </Menu.Item>
            {memberRole === 'PARENT' && (
              <Menu.Item onClick={handleRegisterClick} as="a">
                <Icon name="child" />
                아이 등록하기
              </Menu.Item>
            )}
          </div>
          <div>
            <Menu.Item onClick={() => setVisible(false)} as="a">
              <Icon name="close" />
              닫기
            </Menu.Item>
          </div>
        </div>
      </Sidebar>
      <Sidebar.Pusher dimmed={visible}>
        <BottomNavContent>
          {count === 0 ? (
            <AlarmImg onClick={handleAlarmClick} />
          ) : (
            <StyledBadge badgeContent={count} color="secondary">
              <AlarmImg onClick={handleAlarmClick} />
            </StyledBadge>
          )}
          <HomeImg onClick={handleHomeClick} />
          <MenuImg onClick={handleMenuClick} />
        </BottomNavContent>
      </Sidebar.Pusher>
    </div>
  );
};

export default BottomNav;

// export default function App() {
//   return (
//     <div>
//       <BottomNav />

//     </div>
//   );
// }
