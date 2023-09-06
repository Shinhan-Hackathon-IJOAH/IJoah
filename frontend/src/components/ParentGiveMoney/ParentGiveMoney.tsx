import React,{useState} from 'react';
import { Input } from "@material-tailwind/react";
import {InputTag} from "./ParentGiveMoneyStyles"


const ParentGiveMoney = () => {
    const [givmoney, setGivemoney] = useState('');

    return (
        <div>
            <h1>신한이 용돈 보내주기</h1>
            <br />
            <InputTag>
                <Input 
                variant="static" label="전송할 용돈" placeholder="금액"  crossOrigin={undefined}
                type="number" pattern="\d*"
                value={givmoney}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setGivemoney(event.target.value)
                }/>
            </InputTag>
            <button>용돈 보내기</button>
        </div>
    );
};

export default ParentGiveMoney;