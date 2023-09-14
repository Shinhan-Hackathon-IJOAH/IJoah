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

interface Profile {
  memberId: number,
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  memberRole: string;
  account: {
      accountId: number;
      name: string;
      balance: number;
      accountNumber: string;

  }
  profileImage: {
      profileImageId: number;
      fileName: string;

  };
  parent:{
      memberId: number
      name: string;
      email: string;
      phoneNumber: string;
      birthDate: string;
      memberRole: string;
      account: {
          accountId: number;
          name: string;
          balance: number;
          accountNumber: string;
      }
      profileImage: {
          profileImageId: number;
          fileName: string;
      };
}[];
}



const ChildMainPage = () => {
  const {id,accessToken,setBalance,setName,setBirthDate,setEmail,setPhoneNumber,setProfileImage,setAccount,setMemberRole} =useUserStore()

  const [childprofile, setChildProfile] = useState<Profile>();
  
  
  const getChildInfo = () =>{
    axios
    .get(`https://j9c210.p.ssafy.io/api1/members/child/${id}`, {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        },
    })
    .then((response) => {
        setChildProfile(response.data.data); 
        console.log(response.data.data);
        setName(response.data.data.name)
        setBirthDate(response.data.data.birthDate)
        setAccount(response.data.data.account.accountNumber)
        setEmail(response.data.data.email)
        setPhoneNumber(response.data.data.phoneNumber)
        setProfileImage(response.data.data.profileImage)
        setMemberRole(response.data.data.memberRole)
        setBalance(response.data.data.account.balance)
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
