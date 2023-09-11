import styled from "styled-components";
import trade from "../../asset/trade.png"

export const TradeContainer = styled.div`
    height: 20vh;
    width: 38vw;
    background-color: #E86A52;
    border-radius: 30px;
    font-family: 'HSYuji-Regular';
    display:flex;
`
export const TradeImg = styled.div`
    background-image: url(${trade});
    background-size: 100% 100%;
    height: 20vh;
    width: 20vh;
`