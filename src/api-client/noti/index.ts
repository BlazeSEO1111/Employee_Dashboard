import { toast } from "react-toastify";
import ApiClientBase from "../ApiClientBase";

interface BaseResponse {
  message: string;
  status: string;
}

class ApiNotification extends ApiClientBase {
  constructor() {
    super();
  }

  public async getNotification(accessToken: string): Promise<BaseResponse | any> {
    try {
      const res = await this.instance.get(`/api/v1/notification`, {
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
export default ApiNotification;
