
import React from 'react';
import ParentRegister from '../../../components/ParentRegister/ParentRegister';
import {RegisterContainer} from './ParentRegisterPageStyles'
import BottomNav from '../../../components/Common/BottomNav'
import BackPageButton from '../../../components/Common/BackPageButton';
const ParentRegisterPage = () => {
    return (
        <RegisterContainer>
            <BackPageButton/>
            <ParentRegister/>
            <BottomNav/>
        </RegisterContainer>
    );
};

export default ParentRegisterPage;