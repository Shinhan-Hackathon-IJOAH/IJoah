import React from 'react';
import BottomNav from '../../components/Common/BottomNav';
import BackPageButton from '../../components/Common/BackPageButton';
import AccountRegister from '../../components/Common/AccountRegsiter';
import { RegisterContainer } from './AccountRegisterPageStyles';

const AccountRegisterPage = () => {
  return (
    // <RegisterContainer>
    <div>
      <BackPageButton />
      <AccountRegister />
      <BottomNav />
    </div>
    // </RegisterContainer>
  );
};

export default AccountRegisterPage;
