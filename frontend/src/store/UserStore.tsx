// /src/zustand/store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// 일단 User에 대한 정보 담을 Store 생성해놓음. -> 에러떠서 내일 찾아봐야함.
interface UserStore {
  id: any;
  setId: (id: any) => void;
  name: any;
  setName: (name: any) => void;
  birthDate: any;
  setBirthDate: (birthDate: any) => void;
  email: any;
  setEmail: (email: any) => void;
  phoneNumber: any;
  setPhoneNumber: (phoneNumber: any) => void;
  address: any;
  setAddress: (address: any) => void;
  memberRole: any;
  setMemberRole: (memberRole: any) => void;
  profileImage: any;
  setProfileImage: (profileImage: any) => void;
  accessToken: any;
  setAccessToken: (accessToken: any) => void;
  refreshToken: any;
  setRefreshToken: (refreshToken: any) => void;
  account: any;
  setAccount: (account: any) => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        id: "",
        name: "",
        birthDate: "",
        email: "",
        phoneNumber: "",
        address: "",
        memberRole: "",
        profileImage: "",
        account: "",
        accessToken: "",
        refreshToken: "",
        setId: (payload) => set({ id: payload }),
        setName: (payload) => set({ name: payload }),
        setBirthDate: (payload) => set({ birthDate: payload }),
        setEmail: (payload) => set({ email: payload }),
        setPhoneNumber: (payload) => set({ phoneNumber: payload }),
        setAddress: (payload) => set({ address: payload }),
        setMemberRole: (payload) => set({ memberRole: payload }),
        setProfileImage: (payload) => set({ profileImage: payload }),
        setAccessToken: (payload) => set({ accessToken: payload }),
        setRefreshToken: (payload) => set({ refreshToken: payload }),
        setAccount: (payload) => set({ account: payload }),
      }),
      {
        name: "User-storage", // persist key
      }
    )
  )
);
