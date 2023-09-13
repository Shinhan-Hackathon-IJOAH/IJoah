
import React from 'react';
import ParentRegister from '../../../components/ParentRegister/ParentRegister';
import {RegisterContainer} from './ParentRegisterPageStyles'
import BottomNav from '../../../components/Common/BottomNav'

const ParentRegisterPage = () => {
    return (
        <RegisterContainer>
            <ParentRegister/>
            <BottomNav/>
        </RegisterContainer>
    );
};

export default ParentRegisterPage;