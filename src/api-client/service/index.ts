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

  public async getInformService(accessToken: string, userId: string): Promise<BaseResponse | any> {
    try {
      const res = await this.instance.get(`/api/v1/userConfig/get-service-by-website/${userId}`, {
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
  public async addProductToCart(accessToken: string, userId: string, productId?: string): Promise<BaseResponse | any> {
    try {
      const res = await this.instance.post(`/api/v1/userConfig/add-to-cart/${userId}`, {
        productId: productId
      }, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw error;
    }
  }

  public async approveService(accessToken: string, userId: string): Promise<BaseResponse | any> {
    try {
      const res = await this.instance.post(`/api/v1/userConfig/${userId}`, {
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
