import React,{useState} from 'react';
import { Input } from "@material-tailwind/react";
import {InputTag,InputPadding,NameTag} from "./ParentGiveMoneyStyles"


const ParentGiveMoney = () => {
    const [givmoney, setGivemoney] = useState('');

    return (
        <div>
            <NameTag className="text-2xl text-center font-['HSYuji-Regular']">신한이 용돈 보내주기</NameTag>
            <br />
            <InputTag>
                <InputPadding>
                    <Input 
                    variant="static" label="전송할 용돈" placeholder="금액"  crossOrigin={undefined}
                    type="number" pattern="\d*"
                    value={givmoney}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setGivemoney(event.target.value)
                    }/>
                </InputPadding>
            </InputTag>
            <button>용돈 보내기</button>
        </div>
    );
};

export default ParentGiveMoney;