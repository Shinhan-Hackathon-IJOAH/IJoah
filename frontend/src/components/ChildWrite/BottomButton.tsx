import React from "react";
import { Button} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const BottomButton = () => {
    const navigate = useNavigate();

  return <div>

    <Button>일기 등록하기</Button>
    <Button onClick={()=>{
        navigate(-1);
    }}>뒤로 가기</Button>

  </div>;
};

export default BottomButton;
