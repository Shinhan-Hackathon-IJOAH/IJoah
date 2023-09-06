import styled from "styled-components";
import alram from "../../asset/alarm.png"
import home from "../../asset/home.png"
import menu from "../../asset/menu.png"

export const BottomNavContent = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color : #FFECC8;
    height: 8vh;
    width: 100%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 1);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    
`

export const HomeImg = styled.div`
    background-image: url(${home});
    background-size: 100% 100%;
    height: 10vh;
    width: 10vh;
    margin-bottom: 3vh;
`

export const AlarmImg = styled.div`
    background-image: url(${alram});
    background-size: 100% 100%;
    height: 8vh;
    width: 8vh;
`

export const MenuImg = styled.div`
    background-image: url(${menu});
    background-size: 100% 100%;
    height: 8vh;
    width: 8vh;
`