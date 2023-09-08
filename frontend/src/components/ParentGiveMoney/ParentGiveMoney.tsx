import React,{useState} from 'react';
import { Input } from "@material-tailwind/react";
import {InputTag,InputPadding,NameTag} from "./ParentGiveMoneyStyles"
import axios from 'axios';
import {useSelectChildStore} from '../../store/SelectChildStore'

const ParentGiveMoney = () => {
    const [givemoney, setGivemoney] = useState('');
    const {childid,childname,childaccount}=useSelectChildStore();

    const giveMoney = () =>{
        axios
            .post(".....",{
                givemoney: givemoney,
                id:1
            })
            .then((response)=>{
                console.log(response)
            })
            .catch((error)=>
            console.log(error))
    }
    return (
        <div>
            <NameTag className="text-2xl text-center font-['HSYuji-Regular']">{childname}에게 용돈 보내주기</NameTag>
            <br />
            <InputTag>
                <InputPadding>
                    <Input 
                    variant="static" label="전송할 용돈" placeholder="금액"  crossOrigin={undefined}
                    type="number" pattern="\d*"
                    value={givemoney}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setGivemoney(event.target.value)
                    }/>
                </InputPadding>
            </InputTag>
            <button onClick={giveMoney}>용돈 보내기</button>
        </div>
    );
};

export default ParentGiveMoney;