// types/myshareType.ts

export interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phoneNumber: string;
}

export interface Stock {
  _id: string;
  name: string;
  image: string;
  price: number;
}

export interface Order {
  _id: string;
  orderId: string;
  userId: string;
  stockId: string;
  quantity: number;
  stockPrice: number;
  totalPrice: number;
  priceCurrency: string;
  message: string;
  paymentStatus: number; // 1, 2, 3
  orderStatus: number; // 1, 2, 3
  createdAt: string;
  updatedAt: string;
  orderType: number; // 1 = buy, 2 = sell
  user: User;
  stock: Stock;
}

export interface OrderListResponse {
  data: Order[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

export interface GetMyshareParams {
  orderType: number;
  keyword?: string;
  orderStatus?: number;
  paymentStatus?: number;
  page?: number;
  limit?: number;
}

export enum OrderType {
  BUY = 1,
  SELL = 2,
}

export type CreateOrderPayload = {
  stockId: string;
  quantity: number;
  orderType: OrderType; // BUY: 1, SELL: 2
  message?: string;
};

export type OrderResponse = {
  statusCode: number;
  message: string;
  data: Order;
};

// types/holdingsType.ts

export type Holding = {
  _id: string;
  stockId: string;
  userId: string;
  avgPrice: number;
  createdAt: string; // ISO Date string
  quantity: number;
  totalInvestment: number;
  currentValue: number;
  pnl: number;
  name: string;
  slug: string;
};

export type GetUserHoldingsResponse = {
  statusCode: number;
  message: string;
  data: Holding[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
};

export type GetUserHoldingsParams = {
  keyword?: string;
  page?: number;
  limit?: number;
};
