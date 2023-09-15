import React,{useState, useEffect} from "react";
import ChildInfo from "../../../components/ChildMain/ChildInfo";
import ChildMissionButton from "../../../components/ChildMain/ChildMissionButton";
import ReadDirayButton from "../../../components/ChildMain/ReadDirayButton";
import WriteDiaryButton from "../../../components/ChildMain/WriteDiaryButton";
import TradeListButton from "../../../components/ChildMain/TradeListButton";
import BottomNav from "../../../components/Common/BottomNav";
import {ButtonColum,ChildMainPageContent,Logo,ButtonContainer,SideButtonContainer} from "./ChildMainPageStyles"
import {useUserStore} from "../../../store/UserStore"
import axios from "axios";




const ChildMainPage = () => {
  const {id,accessToken,setBalance,setName,setBirthDate,setEmail,setPhoneNumber,setProfileImage,setAccount,setMemberRole} =useUserStore()

  
  
  const getChildInfo = () =>{
    axios
    .get(`https://j9c210.p.ssafy.io/api1/members/child/${id}`, {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        },
    })
    .then((response) => {
      const childData = response.data.data;
      console.log(childData);
      setName(childData?.name || '');
      setBirthDate(childData?.birthDate || '');
      setAccount(childData?.account?.accountNumber || '');
      setEmail(childData?.email || '');
      setPhoneNumber(childData?.phoneNumber || '');
      setProfileImage(childData?.profileImage || '');
      setMemberRole(childData?.memberRole || '');
      setBalance(childData?.account?.balance || 0);
    })
    .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
    });
}


  useEffect (()=>{
    getChildInfo()
  },[])

  return (
    <ChildMainPageContent>
      <Logo />
      <ButtonColum>
      <ChildInfo />
      <ButtonContainer >
        <SideButtonContainer>
          <WriteDiaryButton />
          <ReadDirayButton />
        </SideButtonContainer>
        <SideButtonContainer>
          <TradeListButton />
          <ChildMissionButton />
        </SideButtonContainer>
      </ButtonContainer>
      </ButtonColum>
      <BottomNav />
    </ChildMainPageContent>
  );
};

export default ChildMainPage;
