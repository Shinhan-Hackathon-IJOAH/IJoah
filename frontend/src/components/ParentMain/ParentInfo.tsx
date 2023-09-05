import React from 'react';
import {ParentInfoContainer} from './ParentInfoStyles'
import Avatar from '@mui/material/Avatar';

const ParentInfo = () => {
    return (
        <ParentInfoContainer>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <div>부모 닉네임</div>
            {/* [지헌] 계좌번호 중간을 ***로 가리면 좋을듯 ( 일단 후순위 )  */}
            <div>계좌번호</div>
            <div>잔액</div>
        </ParentInfoContainer>
    );
};

export default ParentInfo;