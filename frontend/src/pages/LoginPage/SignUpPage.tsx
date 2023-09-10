import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { useSignUpStore } from "../../store/SignUpStore";




export default function SignUp() {
  const navigate = useNavigate();
  const { signUpEmail,setSignUpEmail } = useSignUpStore();
  console.log(signUpEmail)
  const [memberRole, setMemberRole] = useState("PARENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender,setGender] = useState("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
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

  // axios

  function SignUp()
  {
    axios.post("https://ijoah01.duckdns.org/api/members/join", {
      "name": name,
      "email": signUpEmail ,
      "password": password,
      "phoneNumber": phoneNumber,
      "address": address,
      "birthDate": birthDate,
      "gender":"MALE",
      "memberRole": memberRole
  })
  .then((response: any) => {
    console.log("성공");
    console.log(response.data);
    navigate("/parent");
    alert("회원가입이 완료되었습니다.")
  })
  .catch((error: any) => {
    console.log("되겠냐");
    console.log(error);
    console.log("name",name);
    console.log("email",signUpEmail);
    console.log("password",password);
    console.log("phoneNumber",typeof phoneNumber);
    console.log("address",address);
    console.log("birthDate",typeof birthDate);
    console.log("memberRole",memberRole)
    alert("회원가입에 실패했습니다.")
  });
  
  }


  // 탭을 옮겼을 때 모두 비우는 함수-> useEffect 써야하나

const clearAll = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setAddress("");
    setBirthDate("");
    setGender("");
}
  return (
    <div className="flex justify-center ">
      <Card className="w-full max-w-[24rem] ">
        <CardHeader
          color="orange"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center rounded-none md:rounded-xl  py-8 px-4 text-center"
        >
          <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
            <BanknotesIcon className="h-10 w-10" />
          </div>
          <Typography variant="h4" color="white">
            모아일기 회원가입
          </Typography>
        </CardHeader>
        <CardBody>
          <Tabs value={memberRole} className="overflow-visible">
            <TabsHeader className="relative z-0 ">
              <Tab
                value="PARENT"
                onClick={() => {
                  setMemberRole("PARENT");
                  clearAll();
                }}
              >
                부모
              </Tab>
              <Tab
                value="CHILD"
                onClick={() => {
                  setMemberRole("CHILD");
                  clearAll();
                }}
              >
                아이
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden !overflow-y-hidden"
              animate={{
                initial: {
                  x: memberRole === "PARENT" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: memberRole === "PARENT" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="PARENT" className="p-0">
                <form className="mt-6 flex flex-col gap-4">
                  {/* 인풋창 하나 */}
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      이메일을 입력해주세요.
                    </Typography>
                    <Input
            disabled
                      crossOrigin={undefined}
                      
                      color="orange"
                      label={signUpEmail}
                    />
                  </div>

                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      비밀번호를 입력해주세요.
                    </Typography>
                    <Input
                      onChange={handlePassword}
                      crossOrigin={undefined}
                      type="text"
                      color="orange"
                      label="Password"
                    />
                  </div>

                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      이름을 입력해주세요.
                    </Typography>
                    <Input
                      onChange={handleName}
                      crossOrigin={undefined}
                      type="text"
                      color="orange"
                      label="Name"
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      생년월일을 입력해주세요.
                    </Typography>
                    <Input
                      onChange={handleBirthDate}
                      crossOrigin={undefined}
                      type="text"
                      color="orange"
                      label="BirthDate"
                    />
                  </div>
           
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      핸드폰 번호를 입력해주세요.
                    </Typography>
                    <Input
                      onChange={handlePhoneNumber}
                      crossOrigin={undefined}
                      type="text"
                      color="orange"
                      label="PhoneNumber"
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      주소를 입력해주세요.
                    </Typography>
                    <Input
                      onChange={handleAddress}
                      crossOrigin={undefined}
                      type="text"
                      color="orange"
                      label="Address"
                    />
                  </div>

                  {/*  */}

                  <Button
                    onClick={() => {
                      SignUp(
                      );
                    }}
                    size="lg"
                    color="orange"
                  >
                    회원가입하기
                  </Button>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> 입력하신
                    정보는 모두 암호화되어 저장됩니다.
                  </Typography>
                </form>
              </TabPanel>
              <TabPanel value="CHILD" className="p-0">
                <form className="mt-6 flex flex-col gap-4">
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      이메일을 입력해주세요.
                    </Typography>
                    <Input
                      color="orange"
                      disabled
                      crossOrigin={undefined}
                      type="text"
                      label={signUpEmail}
                    />
                  </div>

                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      비밀번호를 입력해주세요.
                    </Typography>
                    <Input
                      color="orange"
                      onChange={handlePassword}
                      crossOrigin={undefined}
                      type="text"
                      label="Password"
                    />
                  </div>

                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      이름을 입력해주세요.
                    </Typography>
                    <Input
                      color="orange"
                      onChange={handleName}
                      crossOrigin={undefined}
                      type="text"
                      label="Name"
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      생년월일을 입력해주세요.
                    </Typography>
                    <Input
                      onChange={handleBirthDate}
                      crossOrigin={undefined}
                      color="orange"
                      type="text"
                      label="BirthDate"
                    />
                  </div>
          
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      핸드폰 번호를 입력해주세요.
                    </Typography>
                    <Input
                      color="orange"
                      onChange={handlePhoneNumber}
                      crossOrigin={undefined}
                      type="text"
                      label="PhoneNumber"
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      주소를 입력해주세요.
                    </Typography>
                    <Input
                      onChange={handleAddress}
                      crossOrigin={undefined}
                      type="text"
                      color="orange"
                      label="Address"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      SignUp(
                      );
                    }}
                    size="lg"
                    color="orange"
                    className="relative h-12"
                  >
                    회원가입하기
                  </Button>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> 입력하신
                    정보는 모두 암호화되어 저장됩니다.
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
