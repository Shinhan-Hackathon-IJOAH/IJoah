import React from "react";
import { ChildInfoContainer } from "./ChildInfoStyles";

const ChildInfo = () => {
  return (
    <div>
      <ChildInfoContainer>
        <div>아이 프로필 사진</div>
        <div>아이 닉네임</div>
        {/* [지헌] 계좌번호 중간을 ***로 가리면 좋을듯 ( 일단 후순위 )  */}
        <div>계좌번호</div>
        <div>잔액</div>
      </ChildInfoContainer>
    </div>
  );
};

export default ChildInfo;
