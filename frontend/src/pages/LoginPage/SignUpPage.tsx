import React,{useState} from 'react';
import { Button } from '@material-tailwind/react'
import ChildSignUp from '../../components/SignUp.tsx/ChildSignUp';
import ParentSignUp from '../../components/SignUp.tsx/ParentSignUp';
import {SignUpPageContent,ParentContent,ParentImg,ChildContent,ChildImg} from './SignUpPageStyles'

const SignUpPage = () => {
    const [memberRole,setMemberRole] = useState('');
    return (
        <SignUpPageContent>
            {/* memberRole이 빈값일 때, (=아직 선택하지 않았을 때)는 부모,아이 선택할 수 있는 버튼 렌더링 */}
            {memberRole === '' && (
        <>
        <ParentContent>
          <ParentImg/>
          <Button
            onClick={() => {
              setMemberRole('parent');
            }}
          >
            부모
          </Button>
        </ParentContent>
        <ChildContent>
          <Button
            onClick={() => {
              setMemberRole('child');
            }}
          >
            아이
          </Button>
          <ChildImg/>
        </ChildContent>
        </>
      )}
      {/* 버튼을 누르면 memberRole이 부모,아이로 바뀜 */}
    {/* memberRole이 부모일 때, 부모 회원가입 컴포넌트 렌더링 */}
    {/* memberRole이 아이일 때, 아이 회원가입 컴포넌트 렌더링 */}
      {memberRole === 'child' && <ChildSignUp />}
      {memberRole === 'parent' && <ParentSignUp />}
        </SignUpPageContent>
    );
};

export default SignUpPage;