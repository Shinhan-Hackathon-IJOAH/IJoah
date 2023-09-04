import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
const Login = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>우리 프로젝트 명</h1>
            <label>아이디</label>
            <input type="text"></input>
            <label>비밀번호</label>
            <input type="text"></input>
            <Button onClick={()=>{
                navigate('/parent');
            }
            }> 아이 화면으로</Button>
            <Button onClick={()=>{
                navigate('/child');
            }
            }>부모 화면으로</Button>
            <Button color="blue" onClick={()=>{
                navigate('/signUp');}
            }>회원가입</Button>
        </div>
    );
};

export default Login;