import React from 'react';
import {BottomNavContent,HomeImg,AlarmImg,MenuImg} from './BottomNavStyles'


const BottomNav = () => {
  return (
    <BottomNavContent>
      <AlarmImg/>
      <HomeImg/>
      <MenuImg/>
    </BottomNavContent>
  );
};



export default BottomNav;