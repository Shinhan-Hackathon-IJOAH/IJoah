import React from 'react';
import {ParentInfoContainer} from './ParentInfoStyles'
import {Avatar,Typography} from "@material-tailwind/react";

const ParentInfo = () => {
    return (
        <ParentInfoContainer>
            <div className="flex items-center gap-4">
                <Avatar
                // size 옵션 줄 수 있음.
                src="https://mblogthumb-phinf.pstatic.net/MjAxOTEyMTdfMTc1/MDAxNTc2NTYxNTQ3NzIx.p8eX1YYqm9QGjYLNCrlkBmCfzoj1wTOowHbEfYLv5zgg.mctQlrrCcMBGbMcxxwtApGnqVZGCf2AeqLUm0dF9rZkg.PNG.imagecompany/%EC%9C%A0%EC%95%84%ED%94%84%EB%A1%9C%ED%95%84%EC%82%AC%EC%A7%84_2.png?type=w800"
                alt="avatar"
                className="border border-[#F8A70C] shadow-xl shadow-[#F8A70C] ring-4 ring-[#F8A70C]"
                />
                <div>
                <Typography variant="h6">부모님</Typography>
                <Typography variant="small" color="gray" className="font-normal">
                    134-2312-1256-12
                </Typography>
                {/* [지헌] 계좌번호 중간을 ***로 가리면 좋을듯 ( 일단 후순위 )  */}
                <Typography variant="small" color="gray" className="font-normal">
                    40000000원
                </Typography>
                </div>
            </div>
        </ParentInfoContainer>
    );
};

export default ParentInfo;