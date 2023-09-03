import React from 'react';
import {Diary} from './DiaryContentStyles'

interface DiaryContentProps {
    selectdate: string;
  }

const DiaryContent: React.FC<DiaryContentProps> = ({selectdate}) => {
    return (
        <div>
            <Diary>
                <div>제목: 하이</div>
                <div>날짜:{selectdate}</div>
                <div>내 기분</div>
                <div></div>
            </Diary>
        </div>
    );
};

export default DiaryContent;