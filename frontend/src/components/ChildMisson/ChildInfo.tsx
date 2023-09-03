import React from 'react';
import Avatar from '@mui/material/Avatar';
import {Content} from './ChildInfoStyles'

const ChildInfo = () => {
    return (
        <Content>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            미션을 수행하고 용돈을 받아 볼까요?
        </Content>
    );
};

export default ChildInfo;