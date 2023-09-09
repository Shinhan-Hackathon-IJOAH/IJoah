import styled from "styled-components";
import givemoney from "../../asset/givemoney.png"

export const InputTag = styled.div`
    margin-top: 8%;
    padding-left: 5%;
    padding-right: 5%;
    height: 20vh;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFECC8;
    font-family: 'HSYuji-Regular';
    font-size: 25px;
`

export const GiveMoneyImg = styled.div`
    background-image: url(${givemoney});
    background-size: 100% 100%;
    aspect-ratio: 1/1; 
    height : 70%;
`



export const NameTag = styled.div`
    align-items: center;
`

export const GiveMoneyContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const ButtonContainer = styled.div`
    padding-top: 8%;
    display: flex;
    justify-content: space-between;
    width: 350px;

`

export const GiveInfoContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 15%;
    background-color: #FFECC8;
    border-radius: 25px;
    height: 15vh;
    width: 100%
`

export const SendButoon = styled.div`
    margin-top: 30%; 
    display: flex;
    justify-content: center;
    align-items: center;
    width:40%;
    height: 20%;
    background-color: #00C68E;
    font-family: 'HSYuji-Regular';
    font-size: 25px;
    border-radius: 25px;
    color: white;
`