import { toast } from "react-toastify";
import ApiClientBase from "../ApiClientBase";

interface BaseResponse {
  message: string;
  status: string;
}

class ApiPayment extends ApiClientBase {
  constructor() {
    super();
  }

  /**
   * getLinkPayment
   */
  public async checkPayment(access_token: string): Promise<BaseResponse | any> {
    const res = await this.instance.post(
      `/api/payments/check-payment`,
      {},
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res;
  }

  public async paymentHistory(accessToken: string): Promise<BaseResponse | any> {
    const res = await this.instance.get(`/api/v1/users/`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return res.data;
  }
}

export default ApiPayment;
