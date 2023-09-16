import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemPrefix, Avatar, Card, Typography, Button } from '@material-tailwind/react';
import axios from 'axios';
import { useUserStore } from '../../store/UserStore';
import BottomNav from '../../components/Common/BottomNav';
import BackPageButton from '../../components/Common/BackPageButton';
const AlarmPage = () => {
  const { alarmData, setAlarmData } = useUserStore();

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
  // const [alarmData, setAlarmData] = useState<any[]>([]);

  // 알람 삭제하는 것을 카운트 하는 state를 만들고, 이 변수값이 올라갈 때마다 다시 알람 페이지 렌더링하기.
  const [deleteAlarmCount, setDeleteAlarmCount] = useState(0);
  // 알람 확인하기 Axios (페이지 렌더링 되자마자 쏴야함.)
  const { accessToken, email, id } = useUserStore(); // 알람확인 GET 요청을 위한 accessToken, email 가져오기
  const strid = String(id);
  useEffect(() => {
    axios
      .get(`https://j9c210.p.ssafy.io/api1/alarm/${email}`, {
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

  // 아이 등록 승인하기
  const approveAlarm = (alarmId: number, parentId: number) => {
    axios
      .post(
        'https://j9c210.p.ssafy.io/api1/families/permitchild',
        {
          childId: strid, // 이 부분은 필요에 따라 채워 넣으세요.
          parentId: parentId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        console.log('부모 등록하는 거 성공함');
        console.log(res.data);
      })
      .catch((err) => {
        console.log(typeof strid);
        console.log('부모 등록 실패');
        console.log(err);
      });
  };
  // 알람 지우기 Axios (읽기 버튼 누를 때마다 Axios 전송)

  const deleteAlarm = (alarmId: number) => {
    axios
      .post(`https://j9c210.p.ssafy.io/api1/alarm/${alarmId}`, {
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
      });
  };
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
    <div className="flex flex-col justify-center items-center ">
      <BackPageButton />
      <div className="mt-10 ">
        <Typography className="font-['HSYuji-Regular']" variant="h2">
          알람 페이지
        </Typography>
      </div>
      <div className="text-gray-500 font-['HSYuji-Regular'] mt-5">'읽음' 버튼을 누르면 알람이 페이지에서 사라져요.</div>
      <div className="mt-10">
        <List className="w-screen lg:w-[40vw]">
          {alarmData.map((data: any, index: any) => {
            // const imageUrl = imageUrls[data.notificationType as AlarmType];
            const formattedTime = formatDateTime(data.time);

            return (
              <ListItem key={index}>
                <div className="flex justify-between w-full mx-1">
                  <div className="flex justify-end">
                    <div>
                      <ListItemPrefix>
                        <Avatar
                          className="p-1"
                          variant="circular"
                          alt="candice"
                          src={`/alarm/${data.notificationType}.png`}
                        />
                      </ListItemPrefix>
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray" className="font-['HSYuji-Regular']">
                        {data.content}
                      </Typography>
                      <Typography variant="small" color="gray" className="font-['HSYuji-Regular']">
                        {formattedTime}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {data.notificationType === 'CHILD_ENROLL' ? (
                      <div className="flex flex-row gap-1">
                        <div>
                          <Button
                            className="font-['HSYuji-Regular']"
                            color="green"
                            onClick={() => {
                              approveAlarm(data.id, data.parentInfo);
                              setDeleteAlarmCount(deleteAlarmCount + 1);
                            }}
                          >
                            ✔
                          </Button>
                        </div>
                        <div>
                          <Button
                            className="font-['HSYuji-Regular']"
                            color="red"
                            onClick={() => {
                              deleteAlarm(data.id);
                              setDeleteAlarmCount(deleteAlarmCount + 1);
                            }}
                          >
                            ✖
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        className="font-['HSYuji-Regular']"
                        color="orange"
                        onClick={() => {
                          deleteAlarm(data.id);
                          setDeleteAlarmCount(deleteAlarmCount + 1);
                        }}
                      >
                        읽음
                      </Button>
                    )}
                  </div>
                </div>
              </ListItem>
            );
          })}
        </List>
      </div>
      <BottomNav />
    </div>
  );
};
export default AlarmPage;
