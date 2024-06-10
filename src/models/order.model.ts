export interface DeliveryInfo {
  address: string;
  detailAddress: string;
  receiver: string;
  contact: string;
}

export interface CreateOrderRequest {
  deliveryInfo: DeliveryInfo;
  orderBooks: {
    bookId: number;
    bookAmount: number;
  }[];
}

export interface Order {
  id: number;
  orderedAt: string;
  address: string;
  receiver: string;
  orderBooks: {
    title: string;
    price: number;
    amount: number;
  }[];
}

export type OrdersResponse = Order[];
