export interface DeliveryInfo {
  address: string;
  detailAddress: string;
  receiver: string;
  contact: string;
}

export interface OrderBook {
  bookId: number;
  bookAmount: number;
}

export interface CreateOrderRequest {
  deliveryInfo: DeliveryInfo;
  orderBooks: OrderBook[];
}

export interface Order {
  id: number;
  address: string;
  receiver: string;
  bookTitle: string;
  bookPrice: number;
  bookAmount: number;
  orderedAt: string;
}

export type OrdersResponse = Order[];
