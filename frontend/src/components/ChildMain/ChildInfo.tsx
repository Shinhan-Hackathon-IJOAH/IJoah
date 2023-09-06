import React from "react";
import { ChildInfoContainer } from "./ChildInfoStyles";
import { Avatar, Typography } from "@material-tailwind/react";
const ChildInfo = () => {
  return (
    <ChildInfoContainer>
      <div className="flex items-center gap-4">
        <Avatar
          // size 옵션 줄 수 있음.
          src="https://mblogthumb-phinf.pstatic.net/MjAxOTEyMTdfMTc1/MDAxNTc2NTYxNTQ3NzIx.p8eX1YYqm9QGjYLNCrlkBmCfzoj1wTOowHbEfYLv5zgg.mctQlrrCcMBGbMcxxwtApGnqVZGCf2AeqLUm0dF9rZkg.PNG.imagecompany/%EC%9C%A0%EC%95%84%ED%94%84%EB%A1%9C%ED%95%84%EC%82%AC%EC%A7%84_2.png?type=w800"
          alt="avatar"
          className="border border-[#F8A70C] shadow-xl shadow-[#F8A70C] ring-4 ring-[#F8A70C]"
        />
        <div>
          <Typography variant="h6">김하영</Typography>
          <Typography variant="small" color="gray" className="font-normal">
            일기 잘 쓰는 어린이
          </Typography>
        </div>
      </div>
    </ChildInfoContainer>
  );
};

export default ChildInfo;
