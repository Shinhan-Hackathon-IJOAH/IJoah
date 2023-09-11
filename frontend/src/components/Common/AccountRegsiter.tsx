import React,{useState} from 'react';
import axios from 'axios';
import { Input } from '@material-tailwind/react';
import { RegisterButton,RegisterContainer } from './AccountRegisterStyles'

const AccountRegister = () => {
    const [account,SetAccount] = useState<string>('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmTag,setConfifmTag] = useState<string>('')

    const AccountSend = () => {
        axios
            .post('https://ijoah01.duckdns.org/api/bank/startoneauth',
            {
                accountNumber:account
            },
            {
                headers: {
                    Authorization: `Bearer`,
                    },
            })
            .then((response)=>{
                console.log(response)
                setShowConfirm(true);
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const AccountCofirm = () => {
        axios
            .post('https://ijoah01.duckdns.org/api/bank/checkoneauth',
            {
                accountNumber : account,
                message : confirmTag
            },{
                headers: {
                    Authorization: `Bearer`,
                    },
                    
            },)
            .then((response)=>{
                console.log(response)
                setShowConfirm(true);
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    return (
        <RegisterContainer>
            <div>계좌 등록하기</div>
            <Input
                style={{ backgroundColor: "#ffffff" }}
                color="orange"
                type="number" pattern="\d*"
                label="계좌 입력"
                value={account}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    SetAccount(event.target.value)
                    }
                crossOrigin={undefined}
                />
            <RegisterButton onClick={AccountSend}>내 계좌에 1원 전송</RegisterButton>
            

            {showConfirm && (
                <div>
                <div>자신의 계좌에 적힌 messege를 입력해 주세요</div>
                    <Input
                    style={{ backgroundColor: "#ffffff" }}
                    color="orange"
                    type="string"
                    label="계좌 확인"
                    value={confirmTag}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setConfifmTag(event.target.value)
                        }
                    crossOrigin={undefined}
                    />
                <RegisterButton onClick={AccountCofirm}>확인하기</RegisterButton>
            </div>
            )}
            
        </RegisterContainer>
    );
};

export default AccountRegister;