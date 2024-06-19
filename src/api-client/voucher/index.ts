import { toast } from "react-toastify";
import ApiClientBase from "../ApiClientBase";

interface BaseResponse {
  message: string;
  status: string;
}

class ApiVoucher extends ApiClientBase {
  constructor() {
    super();
  }

  /**
   * getLinkPayment
   */

  public async getAllVoucher(accessToken: string): Promise<BaseResponse | any> {
    try {
      const res = await this.instance.get(`api/v1/promotion`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching user information:", error);
      throw error;
    }
  }

}
export default ApiVoucher;
