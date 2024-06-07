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

export interface OrderRequest {
  deliveryInfo: DeliveryInfo;
  orderBooks: OrderBook[];
}
