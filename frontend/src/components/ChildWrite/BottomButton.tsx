import React from 'react';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useDiaryStore } from '../../store/DiaryStore';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { useUserStore } from '../../store/UserStore';
const BottomButton = () => {
  const { accessToken, id } = useUserStore();
  const {
    title,
    content,
    date,
    weatherMood,
    picture,
    voice,
    file,
    setTitle,
    setContent,
    setWeatherMood,
    setDate,
    setPicture,
  } = useDiaryStore();
  const navigate = useNavigate();

  const writeDiary = () => {
    const formData = new FormData();
    const info = {
      memberId: id,
      title: title,
      emotion: weatherMood,
      content: content,
      date: date,
    };
    formData.append('info', new Blob([JSON.stringify(info)], { type: 'application/json' }));

    // 사진이 1개 이상인 경우에만 for문 돌려서 사진 formData에 담기
    if (file !== null) {
      for (let i = 0; i < file.length; i++) {
        const pic = file[i];
        console.log(pic);
        formData.append('images', pic);
      }
    }

    const voiceBlob = new Blob([voice]);
    formData.append('record', voiceBlob);

    axios
      .post('https://j9c210.p.ssafy.io/api1/diaries/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response: any) => {
        Swal.fire({
          icon: 'success',
          title: '일기 작성 완료!',
        });
        setTitle('');
        setContent('');
        setWeatherMood('');
        setDate('');
        setPicture([]);
        navigate('/child');
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-3 flex justify-center gap-4">
      <Button
        onClick={() => {
          writeDiary();
        }}
        className="bg-[#FF8A3D]"
      >
        일기 쓰기
      </Button>
      <Button
        className="bg-[#F8A70C]"
        onClick={() => {
          navigate(-1);
          setTitle('');
          setContent('');
          setWeatherMood('');
          setDate('');
          setPicture([]);
        }}
      >
        뒤로 가기
      </Button>
    </div>
  );
};

export default BottomButton;
