import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface StoreState {
  isLoggedIn: boolean;
  storeLogin: () => void;
  storeLogout: () => void;
}

export const useAuthStore = create(
  devtools<StoreState>((set) => ({
    isLoggedIn: false,
    storeLogin: () => {
      set({ isLoggedIn: true });
    },
    storeLogout: () => {
      set({ isLoggedIn: false });
    },
  }))
);
