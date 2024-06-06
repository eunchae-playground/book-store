import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StoreState {
  isLogin: boolean;
  isAuthFinished: boolean; // 로그인 유무를 떠나서 인증 절차가(API 통신) 끝났는지를 나타내는 상태
  storeLogin: () => void;
  storeLogout: () => void;
  setAuthFinished: () => void;
}

export const useAuthStore = create(
  devtools<StoreState>((set) => ({
    isLogin: false,
    isAuthFinished: false,
    storeLogin: () => {
      set({ isLogin: true });
    },
    storeLogout: () => {
      set({ isLogin: false });
    },
    setAuthFinished: () => {
      set({ isAuthFinished: true });
    },
  }))
);
