// /src/zustand/store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// store 업데이트 했으면 쿠키 날려야함.
interface SignUpStore {
  isSendEmail: boolean;
  setIsSendEmail: (isSendEmail: boolean) => void;
  realAuthCode: any;
  setRealAuthCode: (realAuthCode: any) => void;
  isAuthEmail: boolean;
  setIsAuthEmail: (isAuthEmail: boolean) => void;
  signUpEmail: string;
  setSignUpEmail: (signUpEmail: string) => void;
}

export const useSignUpStore = create<SignUpStore>()(
  devtools(
    (set) => ({
      isSendEmail: false,
      setIsSendEmail: (payload) => set({ isSendEmail: payload }),
      realAuthCode: "",
      setRealAuthCode: (payload) => set({ realAuthCode: payload }),
      isAuthEmail: false,
      setIsAuthEmail: (payload) => set({ isAuthEmail: payload }),
      signUpEmail: "",
      setSignUpEmail: (payload) => set({ signUpEmail: payload }),
    }),
    {
      name: "singUp-storage", // persist key
    }
  )
);
