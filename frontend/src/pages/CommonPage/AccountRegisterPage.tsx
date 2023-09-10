import React from 'react';
import BottomNav from '../../components/Common/BottomNav';
import BackPageButton from '../../components/Common/BackPageButton';
import AccountRegiter from '../../components/Common/AccountRegiter';
import {RegisterContainer} from './AccountRegisterPageStyles'

const AccountRegisterPage = () => {
    return (
        <RegisterContainer>
            <BackPageButton/>
            <AccountRegiter/>
            <BottomNav/>
        </RegisterContainer>
    );
};

export default AccountRegisterPage;