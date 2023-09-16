import styled from "styled-components";
import parent from "../../asset/parent.png"
import child from "../../asset/child.png"

export const SignUpPageContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #FFECC8;
    height: 100vh;
    width: 100%;
    `

export const ParentContent = styled.div`
    display: flex;
`
export const ParentImg = styled.div`
    background-image: url(${parent});
    background-size: 100% 100%;
    height: 30vh;
    width: 30vh;
`

export const ChildContent = styled.div`
    display: flex;
`
export const ChildImg = styled.div`
    background-image: url(${child});
    background-size: 100% 100%;
    height: 30vh;
    width: 30vh;
`