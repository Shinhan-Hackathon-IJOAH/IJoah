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
import { register } from './../../../serviceWorkerRegistration';
import {useSelectChildStore} from "../../../store/SelectChildStore"

interface Profile {
    id: number;
    name: string;
    account: number;
    imgPath: string;
    childlist:
        {
        id: '';
        nickname:'';
        account: '';
        imgPath : '';
        }[];
  }
  

const ParentMainPage = () => {
    const {childid,childname,childaccount,childimg,setChildId,setChildName,setChildAccount,setChildImg}=useSelectChildStore();
    const navigate = useNavigate();
    const [parentprofile, setParentProfile] = useState<Profile>();

    const getParentInfo = () =>{
        axios
        .get(`....`, {
            headers: {
            Authorization: `Bearer`,
            },
        })
        .then((response) => {
            setParentProfile(response.data.result); 
            console.log(response.data.result);
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
                {parentprofile?.childlist.map((child) => (
                    <button 
                        onClick={() => {
                        setChildId(child.id);
                        setChildAccount(child.account);
                        setChildName(child.nickname);
                        setChildImg(child.imgPath);
                    }}>
                    <Avatar
                    variant="circular"
                    className="border-2 border-white hover:z-10 focus:z-10"
                    src={child.imgPath}
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