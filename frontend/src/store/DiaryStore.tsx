// /src/zustand/store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// store 업데이트 했으면 쿠키 날려야함.
interface DiaryStore {
  title: any;
  setTitle: (title: any) => void;
  content: any;
  setContent: (content: any) => void;
  date: any;
  setDate: (date: any) => void;
  picture: string[]; // picture를 문자열 배열로 정의
  setPicture: (picture: string[]) => void; // setPicture 함수도 문자열 배열을 받도록 정의
  voice: any;
  setVoice: (voice: any) => void;
  weatherMood: any;
  setWeatherMood: (weatherMood: any) => void;
}

export const useDiaryStore = create<DiaryStore>()(
  devtools(
    persist(
      (set) => ({
        title: "",
        content: "",
        date: "",
        picture: [],
        voice: "",
        weatherMood: "",
        setWeatherMood: (payload) => set({ weatherMood: payload }),
        // setPicture: (payload) => set({ picture: payload }),
        // 배열을 받기 위한 store
        setPicture: (payload) => set({ picture: [...payload] }),
        setVoice: (payload) => set({ voice: payload }),
        setContent: (payload) => set({ content: payload }),
        setTitle: (payload) => set({ title: payload }),
        setDate: (payload) => set({ date: payload }),
      }),
      {
        name: "Diary-storage", // persist key
      }
    )
  )
);
