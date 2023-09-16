import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Input } from '@material-tailwind/react';
import axios from 'axios';
import { useUserStore } from '../../store/UserStore';
import { Icon } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BottomNav from '../../components/Common/BottomNav';

const MyPage = () => {
  const { accessToken, email, phoneNumber, name, id, profileImage, memberRole } = useUserStore();
  const navigate = useNavigate();

  // input창 입력값에 따라 state 변경하는 함수들
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePassWord(e.target.value);
  };
  const handleChangePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePasswordCheck(e.target.value);
  };

  // 내 정보 변경을 위한 state들
  const [changePassWord, setChangePassWord] = useState<string>('');
  const [changeProfileImage, setChangeProfileImage] = useState<File | null>(null);

  const [changePasswordCheck, setChangePasswordCheck] = useState<string>('');

  // 변경 요청 axios 함수들 (비밀번호, 이메일, 휴대폰 번호, 프로필 사진)

  const changeMyInfo = () => {
    if (changePassWord === '') {
      Swal.fire({
        icon: 'warning',
        title: '변경할 비밀번호를 입력해주세요.',
      });
      return;
    } else if (changePassWord !== changePasswordCheck) {
      Swal.fire({
        icon: 'warning',
        title: '비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    const formData = new FormData();
    const info = {
      id: id,
      password: changePassWord,
    };
    formData.append('request', new Blob([JSON.stringify(info)], { type: 'application/json' }));
    if (changeProfileImage) {
      formData.append('file', changeProfileImage);
    }
    // 아무것도 안 보내면 사진이 안 바뀜.
    // else {
    //   formData.append('file', '');
    // }

    axios
      .put('https://j9c210.p.ssafy.io/api1/members/modify', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: '내 정보 변경 완료!',
        });

        // memberRole에 따라 페이지 이동
        if (memberRole === 'PARENT') {
          navigate('/parent');
        }
        if (memberRole === 'CHILD') {
          navigate('/child');
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: '내 정보 변경 실패',
        });
      });
  };
  return (
    <div className="flex flex-col items-center w-[100vw] h-[100vh] mt-10">
      <div style={{ position: 'absolute', top: '15px', left: '15px' }}>
        <IconButton
          onClick={() => navigate(-1)}
          className="rounded-full bg-[#ea4335]  hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </IconButton>
      </div>
      <Typography variant="h2" color="blue-gray" className="font-['HSYuji-Regular'] text-center">
        모아일기 <br></br>프로필 변경 페이지
      </Typography>

      <div>
        <Card className="mt-10 w-full flex justify-center">
          <CardHeader color="white">
            <div className="flex justify-center h-64">
              {changeProfileImage ? (
                <img src={URL.createObjectURL(changeProfileImage)} alt="profile-image" />
              ) : (
                <img
                  className=""
                  src={profileImage ? `https://j9c210.p.ssafy.io/api1/diaries/image/${profileImage}` : 'MoaLogo.png'}
                  alt="profile-image"
                />
              )}
            </div>
          </CardHeader>
          <CardFooter className="mt-5 pt-0 flex justify-center flex-col items-center">
            <div>
              <div className="font-['HSYuji-Regular'] text-center text-2xl font-semibold">
                <label htmlFor="file-input">
                  {/* 희창이가 이상하다 함. */}
                  <div className="font-['HSYuji-Regular']">
                    프로필 사진 변경&nbsp;
                    <Icon name="picture" size="large" className="ml-2" />
                  </div>
                  <Input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    // hidden
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const selectedImage = e.target.files[0] as File;
                        setChangeProfileImage(selectedImage);
                        console.log(selectedImage);
                      }
                    }}
                    crossOrigin={false}
                  />
                </label>
              </div>
            </div>
          </CardFooter>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2 font-['HSYuji-Regular']">
              변경할 정보를 입력하세요.
            </Typography>
            <Typography className="font-['HSYuji-Regular']">
              이메일ID
              <Input label={email} disabled crossOrigin={false} />
            </Typography>
            <Typography className="font-['HSYuji-Regular']">
              비밀번호
              <div></div>
              <Input
                onChange={handleChangePassword}
                placeholder="변경할 비밀번호를 입력해주세요."
                type="password"
                crossOrigin={false}
              />
            </Typography>
            <Typography className="font-['HSYuji-Regular']">
              비밀번호 확인
              <Input
                type="password"
                onChange={handleChangePasswordCheck}
                placeholder="비밀번호를 다시 입력해주세요."
                crossOrigin={false}
              />
            </Typography>
            <Typography className="font-['HSYuji-Regular']">
              이름
              <Input label={name} disabled crossOrigin={false} />
            </Typography>
            <Typography className="font-['HSYuji-Regular']">
              휴대폰 번호
              <Input label={phoneNumber} disabled crossOrigin={false} />
            </Typography>
          </CardBody>
          <div className="p-6">
            <Button
              color="orange"
              onClick={changeMyInfo}
              className="mb-5 w-full text-2xl font-['HSYuji-Regular'] font-medium"
            >
              내 정보 변경하기
            </Button>
          </div>
        </Card>
        <div style={{ height: '70px' }} />
      </div>

      <BottomNav />
    </div>
  );
};

export default MyPage;
