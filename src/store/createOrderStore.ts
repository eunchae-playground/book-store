import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Book } from "../models/book.model";
import { Cart } from "../models/cart.model";
import { DeliveryInfo } from "../models/order.model";
import isEmptyObject from "../utils/isEmptyObject";

interface State {
  checkedBookCarts: Record<Book["id"], Cart>;
  deliveryInfo: DeliveryInfo;
}

interface Action {
  isEmptyCheckedBookCarts: () => boolean;
  toggleCheckedBookCart: (cart: Cart) => void;
  deleteCheckedBookCart: (bookId: number) => void;
  resetCheckedBookCarts: () => void;
  updateDeliveryInfoField: (key: keyof DeliveryInfo, value: string) => void;
}

export const useCreateOrderStore = create<State & Action>()(
  immer(
    devtools((set, get) => ({
      checkedBookCarts: {},
      deliveryInfo: {
        address: "",
        detailAddress: "",
        receiver: "",
        contact: "",
      },

      isEmptyCheckedBookCarts: () => isEmptyObject(get().checkedBookCarts),

      toggleCheckedBookCart: (cart) => {
        set(({ checkedBookCarts }) => {
          cart.bookId in checkedBookCarts
            ? delete checkedBookCarts[cart.bookId]
            : (checkedBookCarts[cart.bookId] = cart);
        });
      },

      deleteCheckedBookCart: (bookId) => {
        set(({ checkedBookCarts }) => {
          delete checkedBookCarts[bookId];
        });
      },

      resetCheckedBookCarts: () => {
        set({ checkedBookCarts: {} });
      },

      updateDeliveryInfoField: (key, value) => {
        set(({ deliveryInfo }) => {
          deliveryInfo[key] = value;
        });
      },
    }))
  )
);
