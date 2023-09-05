import React from 'react';
import Avatar from '@mui/material/Avatar';
import {Content} from "./ParentInfoStyles"

const ParentInfo = () => {
    return (
        <Content>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            선택한 사람 이름 미션 리스트
        </Content>
    );
};

export default ParentInfo;