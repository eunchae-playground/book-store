export interface Cart {
  id: number;
  amount: number;
  title: string;
  image: string;
  detail: string;
  price: number;
}

export type CheckedCarts = Record<number, Cart>;

export type CartsResponse = Cart[];

export interface AddCartRequest {
  bookId: number;
  amount: number;
}

export interface DeleteCartRequest {
  id: number;
}
