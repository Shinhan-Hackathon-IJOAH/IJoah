import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Button
} from "@material-tailwind/react";
import axios from 'axios';
import { useUserStore } from '../../store/UserStore';
const AlarmPage = () => {
  const dummyData = [
    {
      "id": 1,
      "notificationType": "WITHDRAWL",
      "confirmStatus": "UNCONFIRMED",
      "senderName": "김신한",
      "content": "김신한님이 100원을 이체했습니다. ",
      "missionId": null,
      "time": "2023-09-11T23:56:28.616523"
    },
    {
      "id": 2,
      "notificationType": "WITHDRAWL",
      "confirmStatus": "UNCONFIRMED",
      "senderName": "김신한",
      "content": "김신한님이 100원을 이체했습니다. ",
      "missionId": null,
      "time": "2023-09-11T23:56:28.616523"
    }
    , {
      "id": 3,
      "notificationType": "WITHDRAWL",
      "confirmStatus": "UNCONFIRMED",
      "senderName": "김신한",
      "content": "김신한님이 100원을 이체했습니다. ",
      "missionId": null,
      "time": "2023-09-11T23:56:28.616523"
    },
    {
      "id": 1212,
      "notificationType": "WITHDRAWL",
      "confirmStatus": "UNCONFIRMED",
      "senderName": "김신한",
      "content": "김신한님이 100원을 이체했습니다. ",
      "missionId": null,
      "time": "2023-09-11T23:56:28.616523"
    }
  ]

  // 타입 정의
  enum AlarmType {
    CHILD_MISSION = 'CHILD_MISSION',
    PARENT_MISSION = 'PARENT_MISSION',
    WITHDRAWAL = 'WITHDRAWAL',
    CHILD_ENROLL = 'CHILD_ENROLL',
  }

  // 각 타입에 따른 이미지 URL 맵핑
  const imageUrls: Record<AlarmType, string> = {
    CHILD_MISSION: 'url_1',
    PARENT_MISSION: 'url_2',
    WITHDRAWAL: 'url_3',
    CHILD_ENROLL: 'url_4',
  };

  // Axios 쏘고 담을 알람 데이터
  const [alarmData, setAlarmData] = useState<any[]>([]);
  
  // 알람 삭제하는 것을 카운트 하는 state를 만들고, 이 변수값이 올라갈 때마다 다시 알람 페이지 렌더링하기.
  const [deleteAlarmCount, setDeleteAlarmCount] = useState(0);
  // 알람 확인하기 Axios (페이지 렌더링 되자마자 쏴야함.)
  const { accessToken, email } = useUserStore(); // 알람확인 GET 요청을 위한 accessToken, email 가져오기
  useEffect(() => {
    axios
      .get(`https://ijoah01.duckdns.org/api/diaries/${email}`, {
        headers: {
          // Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log('알람 내용 불러오는 거 성공함');
        console.log(res.data);
        setAlarmData(res.data);
      })
      .catch((err) => {
        console.log('에러..');
        console.log(err);
      });
  }, [deleteAlarmCount]);

  // 알람 지우기 Axios (읽기 버튼 누를 때마다 Axios 전송)

  const deleteAlarm = (alarmId: number) => {
    axios.post(`https://ijoah01.duckdns.org/api/alarm/${alarmId}`, {
      headers: {
        // Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        console.log('알람 삭제하는 거 성공함');
        console.log(res.data);
      })
      .catch((err) => {
        console.log('에러..');
        console.log(err);
      }
      );
    }
    // {data.time} 변환하는 함수
    function formatDateTime(dateTimeString: string): string {
      const date = new Date(dateTimeString);
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
      const day = date.getDate().toString().padStart(2, '0'); // 일을 2자리로 포맷팅
      const hour = date.getHours().toString().padStart(2, '0'); // 시간을 2자리로 포맷팅
      const minute = date.getMinutes().toString().padStart(2, '0'); // 분을 2자리로 포맷팅

      return `${month}월 ${day}일 ${hour}:${minute}`;
    }
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="mt-10">
          <Typography variant="h2">알람 페이지</Typography>
        </div>
        <div className="mt-10">
          <List className="w-100 lg:w-[40vw]">
            {dummyData.map((data: any, index: any) => {
              const imageUrl = imageUrls[data.notificationType as AlarmType];
              const formattedTime = formatDateTime(data.time);

              return (
                <ListItem key={index}>
                  <div className="flex justify-between w-full">
                    <div className="flex justify-start">
                      <div>
                        <ListItemPrefix>
                          <Avatar variant="circular" alt="candice" src={imageUrl} />
                        </ListItemPrefix>
                      </div>
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          {data.content}
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                          {formattedTime}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button onClick={() => { deleteAlarm(data.id); 
                        setDeleteAlarmCount(deleteAlarmCount + 1);
                      }}>읽음</Button>
                    </div>
                  </div>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    );
  }
;

export default AlarmPage;