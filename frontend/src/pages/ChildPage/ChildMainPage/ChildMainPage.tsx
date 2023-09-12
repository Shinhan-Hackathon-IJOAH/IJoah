import React,{useState, useEffect} from "react";
import ChildInfo from "../../../components/ChildMain/ChildInfo";
import ChildMissionButton from "../../../components/ChildMain/ChildMissionButton";
import ReadDirayButton from "../../../components/ChildMain/ReadDirayButton";
import WriteDiaryButton from "../../../components/ChildMain/WriteDiaryButton";
import TradeListButton from "../../../components/ChildMain/TradeListButton";
import BottomNav from "../../../components/Common/BottomNav";
import {ChildMainPageContent,Logo,ButtonContainer,SideButtonContainer} from "./ChildMainPageStyles"
import {useUserStore} from "../../../store/UserStore"
import axios from "axios";

interface Profile {
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  account: number;
  profileImage: string;
  parent:
      {
          name: string;
          email: string;
          phoneNumber: string;
          birthDate: string;
          account: number;
          profileImage: string;
      }[];
}
interface Balance{
  accountNumber:string;
  balance:string;
}



const ChildMainPage = () => {
  const {accessToken,account,setBalance,setName,setBirthDate,setEmail,setPhoneNumber,setProfileImage,setAccount} =useUserStore()

  const [childprofile, setChildProfile] = useState<Profile>();
  const [childbalance, setChildBalance] = useState<Balance>();
  
  const getChildInfo = () =>{
    axios
    .get(`https://ijoah01.duckdns.org/api/members/login`, {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        },
    })
    .then((response) => {
        setChildProfile(response.data.data); 
        console.log(response.data.data);
        setName(childprofile?.name)
        setBirthDate(childprofile?.birthDate)
        setAccount(childprofile?.account)
        setEmail(childprofile?.email)
        setPhoneNumber(childprofile?.phoneNumber)
        setProfileImage(childprofile?.profileImage)
        getChildAccount();
    })
    .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
    });
  }
  const getChildAccount = () =>{
    axios
    .post('https://ijoah01.duckdns.org/api/bank/balance',
    {accountNumber:account},
        {headers: {
        Authorization: `Bearer ${accessToken}`,
        },
    })
    .then((response) => {
        setChildBalance(response.data.data); 
        console.log(response.data.data);
        setBalance(childbalance?.balance)
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
      <BottomNav />
    </ChildMainPageContent>
  );
};

export default ChildMainPage;
