import React from 'react';
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

const ParentMainPage = () => {
    const navigate = useNavigate();

    return (
        <ParentMainPageContent>
            <Logo/>
            <ParentInfo/>
            <ButtonColum>
            <div className="flex items-center -space-x-4">
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