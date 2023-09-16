import styled from "styled-components";
import trade from "../../asset/parentTrade.png"

export const TradeListContainer = styled.div`
    height: 17vh;
    width: 100%;
    background-color: #E86A52;
    border-radius: 30px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
`;

export const TradeImg = styled.div`
    background-image: url(${trade});
    background-size: 100% 100%;
    height: 60%;
    width: 55%;
`
export const FontTag = styled.div`
    font-family: 'HSYuji-Regular';
    height: 23%;
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    
`