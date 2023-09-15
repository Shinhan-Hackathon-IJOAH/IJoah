import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useCountries } from "use-react-countries";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from '@material-tailwind/react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { BanknotesIcon, CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { useSignUpStore } from '../../store/SignUpStore';
import Swal from 'sweetalert2';
import { IconButton }   from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default function SignUp() {
  const navigate = useNavigate();
  const { signUpEmail, setSignUpEmail } = useSignUpStore();
  console.log(signUpEmail);
  const [memberRole, setMemberRole] = useState('PARENT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
      .replace(/(\-{1,2})$/, "")
    );
  };
  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handleBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };
  const handleGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };
  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  // axios

  function SignUp() {
    // 패스워드랑 패스워드 체크랑 같은지 확인해서 일치하지 않으면 return
    if (password !== passwordCheck) {
      Swal.fire({
        icon: 'error',
        title: '비밀번호가 일치하지 않습니다.',
        text: '다시 확인해주세요.',
      });
      return;
    }
    // 패스워드랑 패스워드 확인이랑 일치하면 회원가입 진행
    axios
      .post('https://j9c210.p.ssafy.io/api1/members/join', {
        name: name,
        email: signUpEmail,
        password: password,
        phoneNumber: phoneNumber,
        birthDate: birthDate,
        gender: gender,
        // address: "얘 날릴 거임.",
        memberRole: memberRole,
      })
      .then((response: any) => {
        console.log('성공');
        console.log(response.data);
        console.log(response);
        navigate('/parent');
        Swal.fire({
          icon: 'success',
          title: '회원가입에 성공했습니다',
          text: '모아일기에 오신 것을 진심으로 환영합니다!',
        });
      })
      .catch((error: any) => {
        console.log('되겠냐');
        console.log(error);
        console.log('name', name);
        console.log('email', signUpEmail);
        console.log('password', password);
        console.log('phoneNumber', phoneNumber);
        console.log('birthDate', birthDate);
        console.log('memberRole', memberRole);
        console.log('address', address);
        console.log('gender', gender);
        Swal.fire({
          icon: 'error',
          title: '회원가입에 실패했습니다.',
          text: '다시 시도해주세요.',
        });
      });
  }

  // 탭을 옮겼을 때 모두 비우는 함수-> useEffect 써야하나

  const clearAll = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPasswordCheck('');
    setPhoneNumber('');
    setAddress('');
    setBirthDate('');
    setGender('');
  };
  return (
    <div className="flex justify-center ">
      <Card className="w-full max-w-[32rem] ">
        <CardHeader
          color="orange"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center rounded-none md:rounded-xl  py-8 px-4 text-center"
        >
          <div style={{  position: 'absolute', top: '15px', left: '15px' }}>
          <IconButton 
              onClick={()=>navigate(-1)}
              className="rounded-full bg-[#ea4335]  hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10">
            <FontAwesomeIcon icon={faArrowLeft} />
          </IconButton>
          </div>
          <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
            <BanknotesIcon className="h-10 w-10" />
          </div>
          <Typography variant="h4" color="white" className="font-['HSYuji-Regular']">
            모아일기 회원가입
          </Typography>
        </CardHeader>
        <CardBody>
          <Tabs value={memberRole} className="overflow-visible">
            <TabsHeader className="relative z-0 ">
              <Tab
                value="PARENT"
                onClick={() => {
                  setMemberRole('PARENT');
                  clearAll();
                }}
                className="font-['HSYuji-Regular']"
              >
                부모
              </Tab>
              <Tab
                value="CHILD"
                onClick={() => {
                  setMemberRole('CHILD');
                  clearAll();
                }}
                className="font-['HSYuji-Regular']"
              >
                아이
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden !overflow-y-hidden"
              animate={{
                initial: {
                  x: memberRole === 'PARENT' ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: memberRole === 'PARENT' ? 400 : -400,
                },
              }}
            >
              <TabPanel value="PARENT" className="p-0">
                <form className="mt-6 flex flex-col gap-4">
                  {/* 인풋창 하나 */}
                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      이메일을 입력해주세요.
                    </Typography>
                    <Input disabled crossOrigin={undefined} color="orange" label={signUpEmail} />
                  </div>

                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      비밀번호를 입력해주세요.
                    </Typography>
                    <Input
                      onChange={handlePassword}
                      crossOrigin={undefined}
                      type="password"
                      color="orange"
                      label="Password"
                    />
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      비밀번호를 다시 입력해주세요.
                    </Typography>
                    <Input
                      onChange={handlePasswordCheck}
                      crossOrigin={undefined}
                      type="password"
                      color="orange"
                      label="Password"
                    />
                  </div>

                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      이름을 입력해주세요.
                    </Typography>
                    <Input onChange={handleName} crossOrigin={undefined} type="text" color="orange" label="Name" />
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      성별을 클릭해주세요.
                    </Typography>
                    <Tabs>
                      <TabsHeader className="relative z-0 ">
                        <Tab
                          value="MALE"
                          onClick={() => {
                            setGender('MALE');
                          }}
                          className="font-['HSYuji-Regular']"
                        >
                          남자
                        </Tab>
                        <Tab
                          value="FEMALE"
                          onClick={() => {
                            setGender('FEMALE');
                          }}
                          className="font-['HSYuji-Regular']"
                        >
                          여자
                        </Tab>
                      </TabsHeader>
                    </Tabs>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      생년월일을 입력해주세요.
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='생년월일'
                      onChange={(newDate: dayjs.Dayjs | null) => {
                        if (newDate) {
                          setBirthDate(newDate.format('YYYY-MM-DD'));
                        }
                      }}
                      format='YYYY-MM-DD'
                      sx={{ width: '100%' }}
                    />
                    </LocalizationProvider>
                  </div>

                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      핸드폰 번호를 입력해주세요.
                    </Typography>
                    <Input
                      onChange={handlePhoneNumber}
                      crossOrigin={undefined}
                      type="text"
                      color="orange"
                      label="PhoneNumber"
                      value={phoneNumber}
                    />
                  </div>

                  {/*  */}

                  <Button
                    onClick={() => {
                      SignUp();
                    }}
                    size="lg"
                    color="orange"
                    className="font-['HSYuji-Regular']"
                  >
                    회원가입하기
                  </Button>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> 입력하신 정보는 모두 암호화되어 저장됩니다.
                  </Typography>
                </form>
              </TabPanel>
              <TabPanel value="CHILD" className="p-0">
                <form className="mt-6 flex flex-col gap-4">
                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      이메일을 입력해주세요.
                    </Typography>
                    <Input color="orange" disabled crossOrigin={undefined} type="text" label={signUpEmail} />
                  </div>

                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      비밀번호를 입력해주세요.
                    </Typography>
                    <Input
                      color="orange"
                      onChange={handlePassword}
                      crossOrigin={undefined}
                      type="password"
                      label="Password"
                    />
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      비밀번호를 다시 입력해주세요.
                    </Typography>
                    <Input
                      onChange={handlePasswordCheck}
                      crossOrigin={undefined}
                      type="password"
                      color="orange"
                      label="Password"
                    />
                  </div>

                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      이름을 입력해주세요.
                    </Typography>
                    <Input color="orange" onChange={handleName} crossOrigin={undefined} type="text" label="Name" />
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      성별을 클릭해주세요.
                    </Typography>
                    <Tabs>
                      <TabsHeader className="relative z-0 ">
                        <Tab
                          value="MALE"
                          onClick={() => {
                            setGender('MALE');
                          }}
                          className="font-['HSYuji-Regular']"
                        >
                          남자
                        </Tab>
                        <Tab
                          value="FEMALE"
                          onClick={() => {
                            setGender('FEMALE');
                          }}
                          className="font-['HSYuji-Regular']"
                        >
                          여자
                        </Tab>
                      </TabsHeader>
                    </Tabs>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      생년월일을 입력해주세요.
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='생년월일'
                      onChange={(newDate: dayjs.Dayjs | null) => {
                        if (newDate) {
                          setBirthDate(newDate.format('YYYY-MM-DD'));
                        }
                      }}
                      format='YYYY-MM-DD'
                      sx={{ width: '100%' }}
                    />
                    </LocalizationProvider>
                  </div>

                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-4 font-medium font-['HSYuji-Regular']">
                      핸드폰 번호를 입력해주세요.
                    </Typography>
                    <Input
                      color="orange"
                      onChange={handlePhoneNumber}
                      crossOrigin={undefined}
                      type="text"
                      label="PhoneNumber"
                      value={phoneNumber}
                    />
                  </div>

                  <Button
                    onClick={() => {
                      SignUp();
                    }}
                    size="lg"
                    color="orange"
                    className="relative h-12 font-['HSYuji-Regular']"
                  >
                    회원가입하기
                  </Button>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> 입력하신 정보는 모두 암호화되어 저장됩니다.
                  </Typography>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
