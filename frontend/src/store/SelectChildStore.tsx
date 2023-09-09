// /src/zustand/store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// 일단 User에 대한 정보 담을 Store 생성해놓음. -> 에러떠서 내일 찾아봐야함.
interface SelectChildStore {
  childid: any;
  setChildId: (childid: any) => void;
  childname:string;
  setChildName: (childname: string)=> void;
  childaccount: any;
  setChildAccount: (childaccount: any) => void;
  childimg: any;
  setChildImg: (childimg: any) => void;
}

export const useSelectChildStore = create<SelectChildStore>()(
  devtools(
    persist(
      (set) => ({
        childid: "",
        childname:"아이",
        childaccount:"",
        childimg:"",
        setChildId: (payload) => set({ childid: payload }),
        setChildName: (payload) => set({ childname: payload}),
        setChildAccount: (payload) => set({ childaccount: payload }),
        setChildImg:(payload) => set({ childimg: payload })
      }),
      {
        name: "SelectChild-storage", // persist key
      }
    )
  )
);
