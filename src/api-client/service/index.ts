import { toast } from "react-toastify";
import ApiClientBase from "../ApiClientBase";

interface BaseResponse {
  message: string;
  status: string;
}

class ApiService extends ApiClientBase {
  constructor() {
    super();
  }

  public async getInformWebsite(accessToken: string): Promise<BaseResponse | any> {
    try {
      const res = await this.instance.get(`/api/v1/websiteInfor`, {
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

  public async getInformService(accessToken: string,userId:string): Promise<BaseResponse | any> {
    try {
      const res = await this.instance.get(`/api/v1/userConfig/${userId}`, {
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
export default ApiService;
