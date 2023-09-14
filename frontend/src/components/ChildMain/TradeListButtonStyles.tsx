import styled from "styled-components";
import trade from "../../asset/trade.png"

export const TradeContainer = styled.div`
    height: 17vh;
    width: 100%;    
    background-color: #E86A52;
    border-radius: 30px;
    font-family: 'HSYuji-Regular';
    display:flex;
    flex-direction: column;
`
export const TradeImg = styled.div`
    background-image: url(${trade});
    background-size: 100% 100%;
    height: 70%;
    width: 75%;
    margin-left: 28px;
    margin-top: 10px;
`

export const FontTag = styled.div`
    font-family: 'HSYuji-Regular';
    height: 28%;
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    margin-left: 20px;
`