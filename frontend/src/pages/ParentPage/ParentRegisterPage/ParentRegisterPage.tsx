import React,{useState} from 'react';
import axios from 'axios';


const ParentRegisterPage = () => {
    const [childaccount, setChildAccount] = useState('');
    const [childid, setChildId] = useState('');

    const registerChild=()=>{
        axios
            .post('',{childaccount,childid},{
                headers: {
                    Authorization: `Bearer`,
                    },
            })
            .then((response) =>{
                console.log(response)
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    return (
        <div>
            아이계좌 정보 입력
            <input type="number" value="계좌를 입력해주세요" onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setChildAccount(event.target.value)} />
            아이 아이디 입력
            <input type="text" value="아이 아이디를 입력해주세요" onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setChildId(event.target.value)} />

            <button onClick={()=>{registerChild()}}>입력완료</button>
        </div>
    );
};

export default ParentRegisterPage;