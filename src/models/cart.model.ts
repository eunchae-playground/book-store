export interface Cart {
  id: number;
  bookId: number;
  amount: number;
  title: string;
  image: string;
  detail: string;
  price: number;
}

export type CartsResponse = Cart[];

export interface AddCartRequest {
  bookId: number;
  amount: number;
}

export interface DeleteCartRequest {
  id: number;
}
