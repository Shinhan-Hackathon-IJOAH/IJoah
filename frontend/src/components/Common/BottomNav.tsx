import React, { useState } from "react";
import {
  BottomNavContent,
  HomeImg,
  AlarmImg,
  MenuImg,
} from "./BottomNavStyles";

import { Icon, Menu, Sidebar, Segment, Header, Image } from "semantic-ui-react";

const BottomNav = () => {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = () => {
    setVisible(!visible);
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
        <div className="">
          <div>
            <Menu.Item as="a">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="gamepad" />
              Games
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="camera" />
              Channels
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
          <AlarmImg />
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
