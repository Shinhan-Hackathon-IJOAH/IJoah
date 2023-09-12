import React, { useState, useEffect } from 'react';
import ParentInfo from '../../../components/ParentMain/ParentInfo';
import PatternButton from '../../../components/ParentMain/PatternButton';
import GivMissionButton from '../../../components/ParentMain/GiveMissionButton';
import GiveMoneyButton from '../../../components/ParentMain/GiveMoneyButton';
import TradeListButton from '../../../components/ParentMain/TradeListButton';
import MissionButton from '../../../components/ParentMain/MissionButton';
import BottomNav from "../../../components/Common/BottomNav";
import Avatar from '@mui/material/Avatar';
import createprofile from '../../../asset/createprofile.png'
import { useNavigate } from 'react-router-dom';
import { ParentMainPageContent,Logo,ButtonContainer,SideButtonContainer,ButtonColum} from "./ParentMainPageStyles"
import axios from 'axios';
import {useUserStore} from "../../../store/UserStore"
import {useSelectChildStore} from "../../../store/SelectChildStore"

interface Profile {
    memberId: number,
    name: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
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
    children:{
        memberId: number
        name: string;
        email: string;
        phoneNumber: string;
        birthDate: string;
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
  

  
const dummyProfile: Profile = {
    memberId: 3,
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    birthDate: "1990-01-01",
    account: {
      accountId: 1,
      name: "John Doe Account",
      balance: 5000.00,
      accountNumber: "123456789",
    },
    profileImage: {
      profileImageId: 1,
      fileName: "john-doe-profile.jpg",
    },
    children: [
      {
        memberId: 3,
        name: "Child 1",
        email: "child1@example.com",
        phoneNumber: "111-222-3333",
        birthDate: "2010-05-15",
        account: {
          accountId: 2,
          name: "Child 1 Account",
          balance: 1000.00,
          accountNumber: "987654321",
        },
        profileImage: {
          profileImageId: 2,
          fileName: "child1-profile.jpg",
        },
      },
      {
        memberId: 4,
        name: "Child 2",
        email: "child2@example.com",
        phoneNumber: "111-222-3333",
        birthDate: "2010-05-15",
        account: {
          accountId: 4,
          name: "Child 1 Account",
          balance: 1000.00,
          accountNumber: "987654321",
        },
        profileImage: {
          profileImageId: 2,
          fileName: "child1-profile.jpg",
        },
      },
    ],
  };

const ParentMainPage = () => {
    const {setChildName,setChildAccount,setChildImg}=useSelectChildStore();
    const {name,accessToken,setBalance,setName,setBirthDate,setEmail,setPhoneNumber,setProfileImage,setAccount} =useUserStore()
    const navigate = useNavigate();
    const [parentprofile, setParentProfile] = useState<Profile>();
    
    // const getParentInfo = () =>{
    //     axios
    //     .get(`https://ijoah01.duckdns.org/api/members/login`, {
    //         headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //         },
    //     })
    //     .then((response) => {
    //         // setParentProfile(response.data.data); 
    //         // console.log(response.data.data);
    //         setName(parentprofile?.name)
    //         setBirthDate(parentprofile?.birthDate)
    //         setAccount(parentprofile?.account.accountNumber)
    //         setEmail(parentprofile?.email)
    //         setPhoneNumber(parentprofile?.phoneNumber)
    //         setProfileImage(parentprofile?.profileImage)
    //     })
    //     .catch((error) => {
    //         console.error('데이터 가져오기 오류:', error);
    //     });
    // }


    
    useEffect(() => {
        // getParentInfo();
        // setParentProfile(dummyProfile);
        setName(dummyProfile?.name)
        setBirthDate(dummyProfile?.birthDate)
        setAccount(dummyProfile?.account.accountNumber)
        setEmail(dummyProfile?.email)
        setPhoneNumber(dummyProfile?.phoneNumber)
        setProfileImage(dummyProfile?.profileImage)
        setBalance(dummyProfile?.account.balance)

      }, []);

    return (
        <ParentMainPageContent>
            <Logo/>
            <ButtonColum>
            <ParentInfo/>
            <div className="flex items-center w-full ">
            {dummyProfile?.children.map((child) => (
                    <button 
                        onClick={() => {
                        setChildAccount(child.account);
                        setChildName(child.name);
                        setChildImg(child.profileImage);
                    }}>
                    <Avatar
                    variant="circular"
                    className="border-2 border-white hover:z-10 focus:z-10"
                    src={child.profileImage.fileName}
                    />
                    </button>
                ))}
                {/* {parentprofile?.children.map((child) => (
                    <button 
                        onClick={() => {
                        setChildAccount(child.account);
                        setChildName(child.name);
                        setChildImg(child.profileImage);
                    }}>
                    <Avatar
                    variant="circular"
                    className="border-2 border-white hover:z-10 focus:z-10"
                    src={child.profileImage.fileName}
                    />
                    </button>
                ))} */}
                <button onClick={() => {
                navigate("/parent/register");
                }}>
                <Avatar
                    variant="circular"
                    alt="user 5"
                    className="border-2 border-white hover:z-10 focus:z-10"
                    src={createprofile}
                />
                </button>
            </div>
            <GiveMoneyButton/>
            <ButtonContainer>
                <SideButtonContainer>
                    <GivMissionButton/>
                    <MissionButton/>
                </SideButtonContainer>
                <SideButtonContainer>
                    <TradeListButton/>
                    <PatternButton/>
                </SideButtonContainer>
            </ButtonContainer>
            </ButtonColum>
            <BottomNav/>
        </ParentMainPageContent>
    );
};

export default ParentMainPage;