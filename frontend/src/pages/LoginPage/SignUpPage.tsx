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

// 아이 회원가입 Axios함수
function childSignUp(
  childId: string,
  childPw: string,
  childName: string,
  childEmail: string,
  childPhone: string,
  childAddress: string,
  childBirthDate: string,
  navigate: any
) {
  axios
    .post("https://jsonplaceholder.typicode.com/posts", {
      id: childId,
      pw: childPw,
      email: childEmail,
      phonenumber: childPhone,
      address: childAddress,
      MemberRole: "child",
      NickName: childName,
      birth_date: childBirthDate,
    })
    .then((response: any) => {
      console.log("성공");

      console.log(response.data);
      navigate("/child");
    })
    .catch((error: any) => {
      console.log("되겠냐");
      console.log(error);
    });
}

// 부모 회원가입 Axios함수
function parentSignUp(
  parentId: string,
  parentPw: string,
  parentName: string,
  parentEmail: string,
  parentPhone: string,
  parentAddress: string,
  parentBirthDate: string,
  navigate: any
) {
  axios
    .post("https://jsonplaceholder.typicode.com/posts", {
      id: parentId,
      pw: parentPw,
      email: parentEmail,
      phonenumber: parentPhone,
      address: parentAddress,
      MemberRole: "parent",
      NickName: parentName,
      birth_date: parentBirthDate,
    })
    .then((response: any) => {
      console.log("성공");
      console.log(response.data);
      navigate("/parent");
    })
    .catch((error: any) => {
      console.log("되겠냐");
      console.log(error);
    });
}

export default function SingUp() {
  const navigate = useNavigate();

  const [memberRole, setMemberRole] = useState("parent");
  // 부모 회원가입
  const [parentId, setParentId] = useState("");
  const [parentPw, setParentPw] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentAddress, setParentAddress] = useState("1");
  const [parentBirthDate, setParentBirthDate] = useState("1");

  // 부모 onChange 함수
  const handleParentId = (event: any) => {
    setParentId(event.target.value);
  };

  const handleParentPw = (event: any) => {
    setParentPw(event.target.value);
  };

  const handleParentName = (event: any) => {
    setParentName(event.target.value);
  };
  const handleParentEmail = (event: any) => {
    setParentEmail(event.target.value);
  };
  const handleParentPhone = (event: any) => {
    setParentPhone(event.target.value);
  };
  const handleParentAddress = (event: any) => {
    setParentAddress(event.target.value);
  };
  const handleParentBirthDate = (event: any) => {
    setParentBirthDate(event.target.value);
  };

  // 아이 회원가입
  const [childId, setChildId] = useState("");
  const [childPw, setChildPw] = useState("");
  const [childName, setChildName] = useState("");
  const [childEmail, setChildEmail] = useState("");
  const [childPhone, setChildPhone] = useState("");
  const [childAddress, setChildAddress] = useState("1");
  const [childBirthDate, setChildBirthDate] = useState("1");

  // 아이 onChange 함수
  const handleChildId = (event: any) => {
    setChildId(event.target.value);
  };
  const handleChildPw = (event: any) => {
    setChildPw(event.target.value);
  };
  const handleChildName = (event: any) => {
    setChildName(event.target.value);
  };
  const handleChildEmail = (event: any) => {
    setChildEmail(event.target.value);
  };
  const handleChildPhone = (event: any) => {
    setChildPhone(event.target.value);
  };
  const handleChildAddress = (event: any) => {
    setChildAddress(event.target.value);
  };
  const handleChildBirthDate = (event: any) => {
    setChildBirthDate(event.target.value);
  };

  // 탭을 옮겼을 때 모두 비우는 함수-> useEffect 써야하나
  const clearChild = () => {
    setChildId("");
    setChildPw("");
    setChildName("");
    setChildEmail("");
    setChildPhone("");
    setChildAddress("");
    setChildBirthDate("");
  };

  const clearParent = () => {
    setParentId("");
    setParentPw("");
    setParentName("");
    setParentEmail("");
    setParentPhone("");
    setParentAddress("");
    setParentBirthDate("");
  };

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
                value="parent"
                onClick={() => {
                  setMemberRole("parent");
                  clearParent();
                }}
              >
                부모
              </Tab>
              <Tab
                value="child"
                onClick={() => {
                  setMemberRole("child");
                  clearChild();
                }}
              >
                아이
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden !overflow-y-hidden"
              animate={{
                initial: {
                  x: memberRole === "parent" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: memberRole === "par" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="parent" className="p-0">
                <form className="mt-6 flex flex-col gap-4">
                  {/* 인풋창 하나 */}
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      아이디를 입력해주세요.
                    </Typography>
                    <Input
                      onChange={handleParentId}
                      crossOrigin={undefined}
                      type="text"
                      color="orange"
                      label="ID"
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
                      onChange={handleParentPw}
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
                      onChange={handleParentName}
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
                      onChange={handleParentBirthDate}
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
                      이메일을 입력해주세요.
                    </Typography>
                    <Input
                      onChange={handleParentEmail}
                      crossOrigin={undefined}
                      type="text"
                      color="orange"
                      label="E-mail"
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
                      onChange={handleParentPhone}
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
                      onChange={handleParentAddress}
                      crossOrigin={undefined}
                      type="text"
                      color="orange"
                      label="Address"
                    />
                  </div>

                  {/*  */}

                  <Button
                    onClick={() => {
                      parentSignUp(
                        childId,
                        childPw,
                        childName,
                        childEmail,
                        childPhone,
                        childAddress,
                        childBirthDate,
                        navigate
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
              <TabPanel value="child" className="p-0">
                <form className="mt-6 flex flex-col gap-4">
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 font-medium"
                    >
                      아이디를 입력해주세요.
                    </Typography>
                    <Input
                      color="orange"
                      onChange={handleChildId}
                      crossOrigin={undefined}
                      type="text"
                      label="ID"
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
                      onChange={handleChildPw}
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
                      onChange={handleChildName}
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
                      onChange={handleChildBirthDate}
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
                      이메일을 입력해주세요.
                    </Typography>
                    <Input
                      color="orange"
                      onChange={handleChildEmail}
                      crossOrigin={undefined}
                      type="text"
                      label="E-mail"
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
                      onChange={handleChildPhone}
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
                      onChange={handleChildAddress}
                      crossOrigin={undefined}
                      type="text"
                      color="orange"
                      label="Address"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      childSignUp(
                        parentId,
                        parentPw,
                        parentName,
                        parentEmail,
                        parentPhone,
                        parentAddress,
                        parentBirthDate,
                        navigate
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
