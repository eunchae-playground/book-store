import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Cart, CheckedCarts } from "../models/cart.model";
import { DeliveryInfo } from "../models/order.model";
import isEmptyObject from "../utils/isEmptyObject";

interface StoreState {
  checkedCarts: CheckedCarts;
  deliveryInfo: DeliveryInfo;
  isEmptyCheckedCarts: () => boolean;
  addCheckedCart: (cart: Cart) => void;
  deleteCheckedCart: (cart: Cart) => void;
  initializeCheckedCarts: () => void;
  setDeliveryInfo: (key: keyof DeliveryInfo, value: string) => void;
}

export const useOrderStore = create(
  devtools<StoreState>((set, get) => ({
    checkedCarts: {},
    deliveryInfo: { address: "", detailAddress: "", receiver: "", contact: "" },
    isEmptyCheckedCarts: () => isEmptyObject(get().checkedCarts),
    addCheckedCart: (cart) => {
      set(({ checkedCarts }) => {
        const newCheckedCarts = { ...checkedCarts };
        newCheckedCarts[cart.bookId] = cart;
        return {
          checkedCarts: newCheckedCarts,
        };
      });
    },
    deleteCheckedCart: (cart) => {
      set(({ checkedCarts }) => {
        const newCheckedCarts = { ...checkedCarts };
        delete newCheckedCarts[cart.bookId];
        return {
          checkedCarts: newCheckedCarts,
        };
      });
    },
    initializeCheckedCarts: () => {
      set({ checkedCarts: {} });
    },
    setDeliveryInfo: (key, value) => {
      set(({ deliveryInfo }) => ({
        deliveryInfo: { ...deliveryInfo, [key]: value },
      }));
    },
  }))
);
