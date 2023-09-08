import styled from "styled-components";
import givemoney from "../../asset/givemoney.png"

export const InputTag = styled.div`
    height: 20vh;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFECC8;
    font-family: 'HSYuji-Regular';
`

export const GiveMoneyImg = styled.div`
    background-image: url(${givemoney});
    background-size: 100% 100%;
    aspect-ratio: 1/1; 
    height : 70%;
`

export const InputPadding = styled.div`
    padding-left: 2%;
    padding-right: 2%;
`

export const NameTag = styled.div`
    padding-top: 8%;
`