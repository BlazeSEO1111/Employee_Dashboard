import { BaseResponse } from "./BaseResponse";

export interface LoginParamsType {
  email: string;
  password: string;
}

export interface LoginResponseType extends BaseResponse {
  accessToken: string;
  userId: string;
}

export interface AccountDetailResponse {
  id: string;
  username: string;
  full_name: string;
  phone_number: string;
  role_key: number;
  avatar: string;
  createdAt: string;
  email: string;
  login_type: string;
  status: number;
  total_amount: number;
  amount: number;
  payment_content: string;
  userId:string;
}

export interface RegisterParamsType {
  username: string;
  password: string;
  email: string;
  password_again: string;
  phone_number: string;
}

export enum UserPayType {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
}
