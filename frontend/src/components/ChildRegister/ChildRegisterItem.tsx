import React from 'react';
import axios from 'axios';
import { IconButton } from "@material-tailwind/react";
import {ChildRegisterContainer,Titletag,ButtonContainer} from './ChildRegisterItemStyles'


interface RegisterItemProps{
    name:string;
}

const ChildRegisterItem: React.FC<RegisterItemProps> = ({name}) => {
    return (
        <ChildRegisterContainer>
            <Titletag>{name}에게서 등록요청이 왔습니다.</Titletag>
            <ButtonContainer>
                <IconButton color="green">
                    ✔
                </IconButton>
                <IconButton color="red">
                    ✖
                </IconButton>
            </ButtonContainer>
        </ChildRegisterContainer>
    );
};

export default ChildRegisterItem;