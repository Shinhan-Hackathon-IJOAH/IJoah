import React from 'react';
import ChildInfo from '../../../components/ChildMain/ChildInfo';
import ChildMissionButton from '../../../components/ChildMain/ChildMissionButton';
import ReadDirayButton from '../../../components/ChildMain/ReadDirayButton';
import WriteDiaryButton from '../../../components/ChildMain/WriteDiaryButton';
import TradeListButton from '../../../components/ChildMain/TradeListButton';
import BottomNav from '../../../components/Common/BottomNav';
import { Button } from '@material-tailwind/react';
import { ChildMainPageContent, Logo, ButtonContainer, SideButtonContainer } from './ChildMainPageStyles';

const ChildMainPage = () => {
  return (
    <ChildMainPageContent>
      <Logo />
      <ChildInfo />
      <ButtonContainer >
        <SideButtonContainer>
          <WriteDiaryButton />
          <ReadDirayButton />
        </SideButtonContainer>
        <SideButtonContainer>
          <TradeListButton />
          <ChildMissionButton />
        </SideButtonContainer>
      </ButtonContainer>
      <BottomNav />
    </ChildMainPageContent>
  );
};

export default ChildMainPage;
