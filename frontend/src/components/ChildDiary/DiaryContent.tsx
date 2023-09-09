import React,{useEffect,useState} from 'react';
// import {Diary} from './DiaryContentStyles'
import axios from 'axios';
interface DiaryContentProps {
    selectdate: string;
    diaryId: string;
  }




const DiaryContent: React.FC<DiaryContentProps> = ({selectdate,diaryId}) => {
    const [diary, setDiary] = useState<any>([]);

  // diaryId 값이 바뀔 때마다 axios get 요청하는 함수
  useEffect(() => {
    axios
      .get(`https://ijoah01.duckdns.org/api/diaries/${diaryId}`)
      .then((res) => {
        console.log("일기 내용 불러오는 거 성공함");
        console.log(res.data);
        setDiary(res.data);
      })
      .catch((err) => {
        console.log("에러..");
        console.log(err);
      });
  }, [diaryId]);

    return (
        <div>
            
                <div>제목: 하이</div>
                <div>날짜:{selectdate}</div>
                {/* {diaryId, title, content, emotion, diary_date, images, record} */}
                <div>아이디 :{diary.diaryId}</div>
                <div>제목 :{diary.title}</div>
                <div>내용 :{diary.content}</div>
                <div>기분 :{diary.emotion}</div>
                <div>날짜 :{diary.diary_date}</div>
                <div>사진 :{diary.images}</div>
                <div>음성 :{diary.record}</div>

                
            
        </div>
    );
};

export default DiaryContent;