import React, { useState } from "react";

import {useNavigate} from "react-router-dom";
import {
  BottomNavContent,
  HomeImg,
  AlarmImg,
  MenuImg,
} from "./BottomNavStyles";

import { Icon, Menu, Sidebar, Segment, Header, Image } from "semantic-ui-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleMenuClick = () => {
    setVisible(!visible);
  };
  const handleAlarmClick = () => {
    navigate("/alarm");
  };
  const handleHomeClick = () => {
    // 이거 스토어에서 불러와서 분기점 나눠서 memberRole에 따라 바꾸면 될듯?
    navigate("/child");
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
            <Menu.Item 
            onClick={()=>navigate("/mypage")}
            as="a">
              <Icon name="home" />
              프로필 수정
            </Menu.Item>
            <Menu.Item 
            onClick={()=>navigate("/register/account")}
            as="a">
              <Icon name="gamepad" />
              계좌 등록하기
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="camera" />
              엄빠/아이 등록하기
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
          <AlarmImg onClick={handleAlarmClick}/>
          <HomeImg />
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
