import ApiClientBase from "../ApiClientBase";

interface BaseResponse {
    message: string;
    status: string;
}

class ApiServiceManage extends ApiClientBase {
    constructor() {
        super();
    }

    // http://localhost:8192/api/v1/userConfig/get-pagination?website=66a3cc2930f4ae7612b0bb72&type=traffic&status=order
    public async getDataServiceManage(accessToken: string, query?: any): Promise<BaseResponse | any> {
        try {
            const url = query ? `/api/v1/userConfig/get-pagination?userConfig=true&${query}` : '/api/v1/userConfig/get-pagination?userConfig=true';
            const res = await this.instance.get(url, {
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

    public async getAllDataPage(accessToken: string): Promise<BaseResponse | any> {
        try {
            const res = await this.instance.get(`/api/v1/userConfig/get-all`, {
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

export default ApiServiceManage;
