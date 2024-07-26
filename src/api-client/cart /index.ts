import ApiClientBase from "../ApiClientBase";

interface BaseResponse {
    message: string;
    status: string;
}

class ApiCart extends ApiClientBase {
    constructor() {
        super();
    }


    public async getAllProductFromCart(accessToken: string): Promise<BaseResponse | any> {
        const res = await this.instance.get(`/api/v1/userConfig/cart`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        });
        return res.data;
    }

    public async approveProduct(accessToken: string, productId?: string): Promise<BaseResponse | any> {
        const res = await this.instance.post(`/api/v1/userConfig/received-service/${productId}`, {}, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        });
        return res.data;
    }

}

export default ApiCart;
