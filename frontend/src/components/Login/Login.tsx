import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button,Input } from '@material-tailwind/react';
import { Logo,LoginContent,InputTag,SignupContainer,SignupAnchor,LoginButton } from './LoginStyles';

const Login = () => {
    const navigate = useNavigate();

    return (
        <LoginContent>
            <Logo/>
            <InputTag>
            <div className="flex w-64 flex-col gap-6">
                <Input color="orange" label="아이디" crossOrigin={undefined} style={{ backgroundColor: '#ffffff' }} />
                <Input color="orange" label="비밀번호" crossOrigin={undefined} style={{ backgroundColor: '#ffffff' }} />
            </div>
            <LoginButton>
            <Button onClick={()=>{
                navigate('/parent');
            }
            }> 아이 화면으로</Button>
            <Button onClick={()=>{
                navigate('/child');
            }
            }>부모 화면으로</Button>
            </LoginButton>
            <SignupContainer>
                <SignupAnchor 
                onClick={()=>{
                    navigate('/signUp');}
                }>아직 회원이 아니신가요?</SignupAnchor>
            </SignupContainer>
            </InputTag>
        </LoginContent>
    );
};

export default Login;