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
import { set } from 'date-fns';

interface Profile {
    name: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    account: number;
    profileImage: string;
    children:
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

const ParentMainPage = () => {
    const {setChildName,setChildAccount,setChildImg}=useSelectChildStore();
    const {accessToken,account,setBalance,setName,setBirthDate,setEmail,setPhoneNumber,setProfileImage,setAccount} =useUserStore()
    const navigate = useNavigate();
    const [parentprofile, setParentProfile] = useState<Profile>();
    const [parentbalance, setParentBalance] = useState<Balance>();

    const getParentInfo = () =>{
        axios
        .get(`https://ijoah01.duckdns.org/api/members/login`, {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            setParentProfile(response.data.data); 
            console.log(response.data.data);
            setName(parentprofile?.name)
            setBirthDate(parentprofile?.birthDate)
            setAccount(parentprofile?.account)
            setEmail(parentprofile?.email)
            setPhoneNumber(parentprofile?.phoneNumber)
            setProfileImage(parentprofile?.profileImage)
            getParentAccount();
        })
        .catch((error) => {
            console.error('데이터 가져오기 오류:', error);
        });
    }
    const getParentAccount = () =>{
        axios
        .post('https://ijoah01.duckdns.org/api/bank/balance',
        {accountNumber:account},
            {headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            setParentBalance(response.data.data); 
            console.log(response.data.data);
            setBalance(parentbalance?.balance)
        })
        .catch((error) => {
            console.error('데이터 가져오기 오류:', error);
        });
    }

    useEffect(() => {
        getParentInfo();
      }, []);

    return (
        <ParentMainPageContent>
            <Logo/>
            <ParentInfo/>
            <ButtonColum>
            <div className="flex items-center -space-x-4">
                {parentprofile?.children.map((child) => (
                    <button 
                        onClick={() => {
                        setChildAccount(child.account);
                        setChildName(child.name);
                        setChildImg(child.profileImage);
                    }}>
                    <Avatar
                    variant="circular"
                    className="border-2 border-white hover:z-10 focus:z-10"
                    src={child.profileImage}
                    />
                    </button>
                ))}
                <Avatar
                    variant="circular"
                    alt="user 1"
                    className="border-2 border-white hover:z-10 focus:z-10"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
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