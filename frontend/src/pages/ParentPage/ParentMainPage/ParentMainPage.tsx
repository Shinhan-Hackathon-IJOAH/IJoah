import React, { useState, useEffect } from 'react';
import ParentInfo from '../../../components/ParentMain/ParentInfo';
import PatternButton from '../../../components/ParentMain/PatternButton';
import GivMissionButton from '../../../components/ParentMain/GiveMissionButton';
import GiveMoneyButton from '../../../components/ParentMain/GiveMoneyButton';
import TradeListButton from '../../../components/ParentMain/TradeListButton';
import MissionButton from '../../../components/ParentMain/MissionButton';
import BottomNav from '../../../components/Common/BottomNav';
import Avatar from '@mui/material/Avatar';
import createprofile from '../../../asset/createprofile.png';
import { useNavigate } from 'react-router-dom';
import { ParentMainPageContent, Logo, ButtonContainer, SideButtonContainer, ButtonColum } from './ParentMainPageStyles';
import axios from 'axios';
import { useUserStore } from '../../../store/UserStore';
import { useSelectChildStore } from '../../../store/SelectChildStore';


interface Profile {
  memberId: number;
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
  };
  profileImage: {
    profileImageId: number;
    fileName: string;
  };
  children: {
    memberId: number;
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
    };
    profileImage: {
      profileImageId: number;
      fileName: string;
    };
  }[];
}

const ParentMainPage = () => {
  const { setChildName, setChildAccount, setChildImg} = useSelectChildStore();
  const {
    id,
    accessToken,
    setBalance,
    setName,
    setBirthDate,
    setEmail,
    setPhoneNumber,
    setProfileImage,
    setAccount,
    setMemberRole,
  } = useUserStore();
  const navigate = useNavigate();
  const [parentprofile, setParentProfile] = useState<Profile>();

  const getParentInfo = () => {
    axios
      .get(`https://j9c210.p.ssafy.io/api1/members/parent/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const parentData = response.data.data;
        setParentProfile(parentData);
        console.log(response.data.data);
        setName(parentData?.name || '');
        setBirthDate(parentData?.birthDate || '');
        setAccount(parentData?.account?.accountNumber || '');
        setEmail(parentData?.email || '');
        setPhoneNumber(parentData?.phoneNumber || '');
        setProfileImage(parentData?.profileImage?.fileName || '');
        setMemberRole(parentData?.memberRole || '');
        setBalance(parentData?.account?.balance || 0);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };

  useEffect(() => {
    getParentInfo();
  }, []);

  return (
    <ParentMainPageContent>
      <Logo />
      <ButtonColum>
        <ParentInfo />
        <div className="flex items-center w-full ">

          {parentprofile?.children.map((child) => (
            <button
              onClick={() => {
                setChildAccount(child.account);
                setChildName(child.name);
                if (child.profileImage) {
                  setChildImg(child.profileImage.fileName);
                }
              }}
            >
              <Avatar
                variant="circular"
                className="border-2 border-white hover:z-10 focus:z-10"
                src={
                  child.profileImage
                    ? `https://j9c210.p.ssafy.io/api1/diaries/image/${child.profileImage.fileName}`
                    : 'Moa_64.png'
                }
              />
            </button>
          ))}
          <button
            onClick={() => {
              navigate('/parent/register');
            }}
          >
            <Avatar
              variant="circular"
              alt="user 5"
              className="border-2 border-white hover:z-10 focus:z-10"
              src={createprofile}
            />
          </button>
        </div>
        <GiveMoneyButton />
        <ButtonContainer>
          <SideButtonContainer>
            <GivMissionButton />
            <MissionButton />
          </SideButtonContainer>
          <SideButtonContainer>
            <TradeListButton />
            <PatternButton />
          </SideButtonContainer>
        </ButtonContainer>
      </ButtonColum>
      <BottomNav />
    </ParentMainPageContent>
  );
};

export default ParentMainPage;
