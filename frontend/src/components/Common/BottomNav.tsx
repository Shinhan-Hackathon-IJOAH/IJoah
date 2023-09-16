import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useUserStore } from '../../store/UserStore';
import { BottomNavContent, HomeImg, AlarmImg, MenuImg } from './BottomNavStyles';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { Icon, Menu, Sidebar, } from 'semantic-ui-react';
import axios from 'axios';
import Swal from 'sweetalert2';
const BottomNav = () => {
  const { memberRole, accessToken, email, id, alarmData, setAlarmData,  } = useUserStore();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  // const [alarmData, setAlarmData] = useState<any[]>([]);
  const count = Object.keys(alarmData).length;

  // SSE 연결을 위한 테스트
  useEffect(() => {
    const eventSource = new EventSource(`https://j9c210.p.ssafy.io/api1/alarm/subscribe/${id}`);

    eventSource.addEventListener('sse', (event) => {
      if (event.data === 'connect completed') {
        console.log('SSE 연결 성공함');
        return;
      } else {
        console.log(event);
        axios
          .get(`https://j9c210.p.ssafy.io/api1/alarm/${email}`, {
            headers: {
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

        Swal.fire({
          icon: 'success',
          title: '새로운 알람이 도착했습니다!',
          text: event.data.content,
          confirmButtonColor: '#f8a70c',
        });

        console.log('sse통해 넘어오는 이벤트 데이터', event);
      }
    });

    // 컴포넌트가 언마운트될 때 SSE 연결을 닫습니다.
    return () => {
      eventSource.close();
    };
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

  useEffect(()=>{
    axios
      .get(`https://j9c210.p.ssafy.io/api1/tests/test`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
        if (error.response && error.response.status === 403) {
          navigate('/');
        } else {
          console.log('axios요류', error);
        }
      });
  },[])

  const handleLogoutClick = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    axios
      .get(`https://j9c210.p.ssafy.io/api1/members/logout`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log('로그아웃 성공');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        console.log('로그아웃 실패');
      });
  };

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
            <Menu.Item onClick={handleLogoutClick} as="a">
              <Icon name="sign-out" />
              로그아웃
            </Menu.Item>
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
