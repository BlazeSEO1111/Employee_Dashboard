import ApiClientBase from "../ApiClientBase";

interface BaseResponse {
    message: string;
    status: string;
}

class ApiServiceManage extends ApiClientBase {
    constructor() {
        super();
    }


    public async getDataServiceManage(accessToken: string): Promise<BaseResponse | any> {
        try {
            const res = await this.instance.get(`/api/v1/userConfig/get-all`, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
            console.log("res", res);
            return res.data;
        } catch (error) {
            console.error("Error fetching user information:", error);
            throw error;
        }
    }


}

export default ApiServiceManage;
