import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Cart, CheckedCarts } from "../models/cart.model";

interface StoreState {
  checkedCarts: CheckedCarts;
  addCheckedCart: (cart: Cart) => void;
  deleteCheckedCart: (cart: Cart) => void;
}

export const useOrderStore = create(
  devtools<StoreState>((set) => ({
    checkedCarts: {},
    addCheckedCart: (cart) => {
      set(({ checkedCarts }) => {
        const newCheckedCarts = { ...checkedCarts };
        newCheckedCarts[cart.id] = cart;
        return {
          checkedCarts: newCheckedCarts,
        };
      });
    },
    deleteCheckedCart: (cart) => {
      set(({ checkedCarts }) => {
        const newCheckedCarts = { ...checkedCarts };
        delete newCheckedCarts[cart.id];
        return {
          checkedCarts: newCheckedCarts,
        };
      });
    },
  }))
);
