import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface StoreState {
  isLogin: boolean;
  storeLogin: () => void;
  storeLogout: () => void;
}

export const useAuthStore = create(
  devtools<StoreState>((set) => ({
    isLogin: false,
    storeLogin: () => {
      set({ isLogin: true });
    },
    storeLogout: () => {
      set({ isLogin: false });
    },
  }))
);
