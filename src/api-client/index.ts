import ApiAuth from "./auth";
import ApiNotification from "./noti";
import ApiPayment from "./payment";
import ApiProduct from "./product";
import ApiProfile from "./profile-employee";
import ApiService from "./service";
import ApiVoucher from "./voucher";

export const authApi = new ApiAuth();
export const paymentApi = new ApiPayment();
export const productApi = new ApiProduct();
export const informationApi = new ApiProfile();
export const notificationApi = new ApiNotification();
export const serviceApi = new ApiService();
export const voucherApi = new ApiVoucher();
