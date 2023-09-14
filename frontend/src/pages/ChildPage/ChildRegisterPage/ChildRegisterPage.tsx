import React from 'react';
import BackPageButton from '../../../components/Common/BackPageButton';
import BottomNav from '../../../components/Common/BottomNav';
import ChildRegister from '../../../components/ChildRegister/ChildRegister';
import {RegisterContainer} from './ChildRegisterPageStyles'
const ChildRegisterPage = () => {
    return (
        <RegisterContainer>
            <BackPageButton/>
            <ChildRegister/>
            <BottomNav/>
        </RegisterContainer>
    );
};

export default ChildRegisterPage;