import styled from "styled-components";
import givemoney from '../../asset/givemoney.png'

export const GiveMoneyContainer = styled.div`
    height: 13vh;
    width: 100%;
    background-color: #B3CF96;
    border-radius: 30px;
    display:flex;
    align-items: center;
    justify-content: space-between;
`;

export const GiveMoneyImg = styled.div`
    background-image: url(${givemoney});
    background-size: 100% 100%;
    height: 70%;
    width: 25%;
    margin-bottom:4px;
`
export const FontTag = styled.div`
    font-family: 'HSYuji-Regular';
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    margin-right:28px;
`